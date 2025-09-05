import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export interface PaymentLogData {
  orderId: string;
  email: string;
  service: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'in_process' | 'authorized' | 'refunded' | 'charged_back';
  paymentId?: string;
  method?: string;
  customerName?: string;
}

export interface BusinessEvent {
  orderId: string;
  event: 'booking_created' | 'payment_pending' | 'payment_approved' | 'payment_failed' | 'email_sent' | 'webhook_received' | 'admin_notification_tentativa' | 'admin_notification_confirmado' | 'admin_notification_cancelado' | 'whatsapp_booking_created' | 'admin_notification_whatsapp';
  customerEmail: string;
  timestamp: Date;
  details?: any;
}

class Logger {
  private writeLog(filename: string, data: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${JSON.stringify(data, null, 2)}\n`;
    const logPath = path.join(LOG_DIR, filename);
    
    fs.appendFileSync(logPath, logEntry);
  }

  logPaymentDetails(data: PaymentLogData, rawPaymentData?: any) {
    this.writeLog('payment-details.log', {
      type: 'PAYMENT_DETAILS',
      ...data,
      rawData: rawPaymentData ? JSON.stringify(rawPaymentData) : undefined
    });
  }

  logBusinessEvent(event: BusinessEvent) {
    this.writeLog('business-events.log', {
      type: 'BUSINESS_EVENT',
      ...event,
      timestamp: event.timestamp.toISOString()
    });
    
    const eventMessages = {
      'booking_created': `BOOKING_CREATED: Order ${event.orderId} - ${event.details?.name || 'N/A'} - ${event.customerEmail} - ${event.details?.phone || 'N/A'} - ${event.details?.service || 'N/A'}`,
      'whatsapp_booking_created': `WHATSAPP_BOOKING_CREATED: Order ${event.orderId} - ${event.details?.name || 'N/A'} - ${event.customerEmail} - ${event.details?.phone || 'N/A'} - ${event.details?.service || 'N/A'}`,
      'payment_pending': `PAYMENT_PENDING: Order ${event.orderId} - ${event.customerEmail}`,
      'payment_approved': `PAYMENT_APPROVED: Order ${event.orderId} - ${event.customerEmail} - Amount: R$${event.details?.amount || 'N/A'}`,
      'payment_failed': `PAYMENT_FAILED: Order ${event.orderId} - ${event.customerEmail} - Reason: ${event.details?.reason || 'N/A'}`,
      'email_sent': `EMAIL_SENT: ${event.customerEmail} (Order: ${event.orderId})`,
      'webhook_received': `WEBHOOK_RECEIVED: ${event.details?.paymentId || 'N/A'} - Status: ${event.details?.status || 'N/A'}`,
      'admin_notification_tentativa': `ADMIN_NOTIFICATION_TENTATIVA: Order ${event.orderId} - ${event.customerEmail}`,
      'admin_notification_confirmado': `ADMIN_NOTIFICATION_CONFIRMADO: Order ${event.orderId} - ${event.customerEmail}`,
      'admin_notification_cancelado': `ADMIN_NOTIFICATION_CANCELADO: Order ${event.orderId} - ${event.customerEmail}`,
      'admin_notification_whatsapp': `ADMIN_NOTIFICATION_WHATSAPP: Order ${event.orderId} - ${event.customerEmail}`
    };
    
    console.log(eventMessages[event.event] || `${event.event.toUpperCase()}: Order ${event.orderId} - ${event.customerEmail}`);
  }

  logPaymentError(orderId: string, error: any, context?: any) {
    this.writeLog('payment-errors.log', {
      type: 'PAYMENT_ERROR',
      orderId,
      error: error.message || error,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
    
    console.error(`❌ PAYMENT_ERROR: Order ${orderId} - ${error.message}`);
  }

  logEmailEvent(orderId: string, email: string, status: 'sending' | 'success' | 'failed', details?: any) {
    this.writeLog('email-events.log', {
      type: 'EMAIL_EVENT',
      orderId,
      email,
      status,
      details,
      timestamp: new Date().toISOString()
    });

    const emoji = status === 'success' ? '✅' : status === 'failed' ? '❌' : '📧';
    console.log(`${emoji} EMAIL_${status.toUpperCase()}: ${email} (Order: ${orderId})`);
  }

  logWebhookReceived(paymentId: string, status: string, orderId?: string) {
    this.writeLog('webhook-events.log', {
      type: 'WEBHOOK_RECEIVED',
      paymentId,
      status,
      orderId,
      timestamp: new Date().toISOString()
    });

    console.log(`🔔 WEBHOOK_RECEIVED: Payment ${paymentId} status: ${status} ${orderId ? `(Order: ${orderId})` : ''}`);
  }

  generateDailySummary(date: string) {
    const summaryPath = path.join(LOG_DIR, `daily-summary-${date}.log`);
    
    try {
      const businessEvents = fs.readFileSync(path.join(LOG_DIR, 'business-events.log'), 'utf-8');
      const lines = businessEvents.split('\n').filter(line => line.trim());
      
      const todayEvents = lines.filter(line => line.includes(date));
      const events = todayEvents.map(line => {
        try {
          return JSON.parse(line.split(': ', 2)[1]);
        } catch {
          return null;
        }
      }).filter(Boolean);

      const summary = {
        date,
        totalBookings: events.filter(e => e.event === 'booking_created').length,
        approvedPayments: events.filter(e => e.event === 'payment_approved').length,
        failedPayments: events.filter(e => e.event === 'payment_failed').length,
        emailsSent: events.filter(e => e.event === 'email_sent').length,
        webhooksReceived: events.filter(e => e.event === 'webhook_received').length
      };

      this.writeLog(`daily-summary-${date}.log`, summary);
      return summary;
    } catch (error) {
      console.error('Error generating daily summary:', error);
      return null;
    }
  }
}

export const paymentLogger = new Logger();
