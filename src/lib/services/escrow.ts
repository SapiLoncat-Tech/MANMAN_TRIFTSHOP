import { createClient } from '@supabase/supabase-js';

// Menginisialisasi Supabase Admin Client untuk bypass RLS pada operasi ledger
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

/**
 * Escrow Service
 * Implementasi bisnis logika QS. Al-Baqarah 282
 * (Pencatatan mutasi transaksi digital secara immutable)
 */

export class EscrowService {
  /**
   * Membuat transaksi Escrow baru (Dana masuk dan ditahan)
   */
  static async holdFunds(buyerId: string, sellerId: string, productId: string, amount: number) {
    // 1. Buat transaksi di tabel transactions
    const { data: tx, error: txError } = await supabaseAdmin
      .from('transactions')
      .insert({
        buyer_id: buyerId,
        seller_id: sellerId,
        product_id: productId,
        transaction_type: 'escrow_transfer',
        amount: amount,
        platform_fee: 2500, // Biaya layanan (Ujrah)
        status: 'escrow_held',
        escrow_balance: amount,
        syariah_note: 'Dana ditahan dalam sistem Escrow (Amanah)'
      })
      .select()
      .single();

    if (txError) throw new Error(`Gagal membuat transaksi: ${txError.message}`);

    // 2. Catat mutasi di ledger (Al-Baqarah 282)
    const { error: ledgerError } = await supabaseAdmin
      .from('escrow_ledger')
      .insert({
        transaction_id: tx.id,
        entry_type: 'credit',
        amount: amount,
        balance_after: amount, // Saldo escrow sistem bertambah
        description: `Dana diterima dari pembeli ${buyerId} untuk produk ${productId}. Status: DITAHAN.`
      });

    if (ledgerError) throw new Error(`Gagal mencatat mutasi ledger: ${ledgerError.message}`);

    // 3. Update status produk menjadi 'sold'
    await supabaseAdmin
      .from('products')
      .update({ status: 'sold' })
      .eq('id', productId);

    return tx;
  }

  /**
   * Melepaskan dana Escrow ke penjual (Pembeli konfirmasi)
   */
  static async releaseFunds(transactionId: string) {
    // 1. Dapatkan detail transaksi
    const { data: tx, error: fetchError } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .single();

    if (fetchError || !tx) throw new Error('Transaksi tidak ditemukan.');
    if (tx.status !== 'escrow_held') throw new Error('Status transaksi tidak valid untuk pelepasan dana.');

    // 2. Update status transaksi
    const { error: updateError } = await supabaseAdmin
      .from('transactions')
      .update({
        status: 'completed',
        escrow_balance: 0,
        completed_at: new Date().toISOString(),
        syariah_note: 'Akad selesai. Dana telah diteruskan ke penjual.'
      })
      .eq('id', transactionId);

    if (updateError) throw new Error(`Gagal menyelesaikan transaksi: ${updateError.message}`);

    // 3. Catat mutasi pelepasan di ledger
    await supabaseAdmin
      .from('escrow_ledger')
      .insert({
        transaction_id: tx.id,
        entry_type: 'debit',
        amount: tx.amount,
        balance_after: 0, // Saldo escrow untuk transaksi ini habis
        description: `Dana dilepaskan ke penjual ${tx.seller_id}. Akad jual beli dinyatakan selesai dan sah.`
      });

    // 4. (Opsional) Tambahkan reputasi kejujuran penjual
    // await updateUserReputation(tx.seller_id);

    return true;
  }
}
