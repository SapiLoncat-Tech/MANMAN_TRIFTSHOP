import { NextResponse } from 'next/server';
import { EscrowService } from '@/lib/services/escrow';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyer_id, seller_id, product_id, amount, payment_method } = body;

    // Validasi data input minimal
    if (!buyer_id || !seller_id || !product_id || !amount) {
      return NextResponse.json(
        { success: false, error: 'Data pembayaran tidak lengkap.' },
        { status: 400 }
      );
    }

    if (payment_method === 'escrow_transfer') {
      // Panggil sistem bisnis logika Al-Baqarah 282
      const transaction = await EscrowService.holdFunds(
        buyer_id,
        seller_id,
        product_id,
        amount
      );

      return NextResponse.json({
        success: true,
        message: 'Pembayaran berhasil ditahan di Escrow. Menunggu barang dikirim.',
        data: transaction
      });
    } else if (payment_method === 'cod') {
      // Implementasi khusus COD (hanya mencatat status pending pertemuan)
      return NextResponse.json({
        success: true,
        message: 'Transaksi COD dicatat. Dapatkan OTP Anda untuk pertemuan.'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Metode pembayaran tidak valid.' },
      { status: 400 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Gagal memproses pembayaran.', detail: error.message },
      { status: 500 }
    );
  }
}
