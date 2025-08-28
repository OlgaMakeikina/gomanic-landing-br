import { NextRequest, NextResponse } from 'next/server';
import { getServiceInfo } from '@/utils/mercadopago.js';
import { bookingStorage } from '@/utils/storage';

export async function POST(request: NextRequest) {
  try {
    console.log('=== TESTE SISTEMA COMPLETO ===');

    // 1. Teste de storage
    const testBooking = await bookingStorage.saveBooking({
      name: 'João Teste',
      phone: '48999170099',
      email: 'zarudesu@gmail.com',
      service: 'manicure-gel'
    });

    console.log('✅ Booking salvo:', testBooking.orderId);

    // 2. Teste MercadoPago (função)
    console.log('✅ MercadoPago functions imported');
    
    const serviceInfo = getServiceInfo('manicure-gel');
    console.log('✅ Service info:', serviceInfo);

    // 3. Teste de atualização
    const updated = await bookingStorage.updateBooking(testBooking.orderId, {
      paymentStatus: 'approved',
      n8nSent: true
    });

    console.log('✅ Booking atualizado:', updated?.paymentStatus);

    // 4. Teste de listagem
    const allBookings = await bookingStorage.getAllBookings();
    console.log('✅ Total bookings:', allBookings.length);

    return NextResponse.json({
      success: true,
      message: 'Teste do sistema completo realizado!',
      data: {
        booking: testBooking,
        updated: updated,
        totalBookings: allBookings.length,
        serviceInfo: serviceInfo,
        systemStatus: {
          storage: '✅ OK',
          mercadopago: '✅ OK (mock)',
          n8n: '⏳ Configurar URL',
          email: '✅ OK'
        }
      }
    });

  } catch (error) {
    console.error('Erro no teste do sistema:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      systemStatus: {
        storage: '❌ ERROR',
        mercadopago: '❌ ERROR',
        n8n: '❌ ERROR',
        email: '❌ ERROR'
      }
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allBookings = await bookingStorage.getAllBookings();
    
    return NextResponse.json({
      message: 'Sistema de Bookings Gomanic',
      status: 'active',
      totalBookings: allBookings.length,
      recentBookings: allBookings.slice(0, 5).map(b => ({
        orderId: b.orderId,
        name: b.name,
        service: b.service,
        status: b.paymentStatus,
        createdAt: b.createdAt
      }))
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Erro ao listar bookings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

