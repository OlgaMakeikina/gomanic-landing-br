import { NextRequest, NextResponse } from 'next/server';
import { checkPendingPayments, syncPaymentStatus } from '@/utils/paymentSync';
import { paymentLogger } from '@/utils/paymentLogger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const action = searchParams.get('action') || 'check';

    if (orderId) {
      const result = await syncPaymentStatus(orderId);
      return NextResponse.json({ result });
    }

    if (action === 'check') {
      const results = await checkPendingPayments();
      
      const summary = {
        total: results.length,
        needsUpdate: results.filter(r => r.needsUpdate).length,
        errors: results.filter(r => r.error).length,
        results
      };

      return NextResponse.json(summary);
    }

    return NextResponse.json({ 
      message: 'Payment sync endpoint',
      usage: {
        checkAll: '/api/payment-sync?action=check',
        syncOne: '/api/payment-sync?orderId=YOUR_ORDER_ID'
      }
    });

  } catch (error) {
    paymentLogger.logPaymentError('sync-api', error as Error, 'sync_endpoint');
    
    return NextResponse.json(
      { error: 'Payment sync failed' },
      { status: 500 }
    );
  }
}
