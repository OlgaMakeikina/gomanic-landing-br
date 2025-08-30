import { bookingStorage } from './storage';
import { paymentLogger } from './paymentLogger';

export interface PaymentCheckResult {
  orderId: string;
  localStatus: string;
  mercadoPagoStatus?: string;
  needsUpdate: boolean;
  error?: string;
}

export async function checkPendingPayments(): Promise<PaymentCheckResult[]> {
  const results: PaymentCheckResult[] = [];
  
  try {
    // Получить все bookings со статусом pending или in_process старше 1 часа
    const pendingBookings = await bookingStorage.getPendingBookings(60); // 60 минут
    
    for (const booking of pendingBookings) {
      if (!booking.mercadoPagoData?.paymentId) {
        continue;
      }
      
      try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${booking.mercadoPagoData.paymentId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          results.push({
            orderId: booking.orderId,
            localStatus: booking.paymentStatus || 'unknown',
            needsUpdate: false,
            error: `API Error: ${response.status}`
          });
          continue;
        }
        
        const paymentData = await response.json();
        const mercadoPagoStatus = paymentData.status;
        const localStatus = booking.paymentStatus || 'pending';
        
        results.push({
          orderId: booking.orderId,
          localStatus,
          mercadoPagoStatus,
          needsUpdate: localStatus !== mercadoPagoStatus
        });
        
        // Если статусы не совпадают - обновляем локально
        if (localStatus !== mercadoPagoStatus) {
          await bookingStorage.updateBooking(booking.orderId, {
            paymentStatus: mercadoPagoStatus,
            mercadoPagoData: {
              ...booking.mercadoPagoData,
              lastChecked: new Date().toISOString(),
              statusMismatchDetected: true
            }
          });
          
          paymentLogger.logPaymentError(booking.orderId, new Error('Status mismatch detected'), {
            localStatus,
            mercadoPagoStatus,
            paymentId: booking.mercadoPagoData.paymentId
          });
        }
        
      } catch (error) {
        results.push({
          orderId: booking.orderId,
          localStatus: booking.paymentStatus || 'unknown',
          needsUpdate: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        paymentLogger.logPaymentError(booking.orderId, error as Error, 'payment_status_check');
      }
    }
    
  } catch (error) {
    paymentLogger.logPaymentError('system', error as Error, 'pending_payments_check');
  }
  
  return results;
}

// Функция для ручной синхронизации конкретного платежа
export async function syncPaymentStatus(orderId: string): Promise<PaymentCheckResult> {
  try {
    const booking = await bookingStorage.getBooking(orderId);
    
    if (!booking) {
      return {
        orderId,
        localStatus: 'not_found',
        needsUpdate: false,
        error: 'Booking not found'
      };
    }
    
    if (!booking.mercadoPagoData?.paymentId) {
      return {
        orderId,
        localStatus: booking.paymentStatus || 'unknown',
        needsUpdate: false,
        error: 'No payment ID found'
      };
    }
    
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${booking.mercadoPagoData.paymentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      return {
        orderId,
        localStatus: booking.paymentStatus || 'unknown',
        needsUpdate: false,
        error: `MercadoPago API Error: ${response.status}`
      };
    }
    
    const paymentData = await response.json();
    const mercadoPagoStatus = paymentData.status;
    const localStatus = booking.paymentStatus || 'pending';
    
    // Обновляем статус если нужно
    if (localStatus !== mercadoPagoStatus) {
      await bookingStorage.updateBooking(orderId, {
        paymentStatus: mercadoPagoStatus,
        mercadoPagoData: {
          ...booking.mercadoPagoData,
          lastManualSync: new Date().toISOString(),
          syncedStatus: mercadoPagoStatus
        }
      });
      
      paymentLogger.logBusinessEvent({
        orderId,
        event: mercadoPagoStatus === 'approved' ? 'payment_approved' : 'payment_failed',
        customerEmail: booking.email,
        timestamp: new Date(),
        details: { 
          paymentId: booking.mercadoPagoData.paymentId,
          syncType: 'manual',
          oldStatus: localStatus,
          newStatus: mercadoPagoStatus
        }
      });
    }
    
    return {
      orderId,
      localStatus,
      mercadoPagoStatus,
      needsUpdate: localStatus !== mercadoPagoStatus
    };
    
  } catch (error) {
    paymentLogger.logPaymentError(orderId, error as Error, 'manual_payment_sync');
    
    return {
      orderId,
      localStatus: 'unknown',
      needsUpdate: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
