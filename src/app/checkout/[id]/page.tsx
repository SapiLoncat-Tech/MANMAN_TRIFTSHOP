'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Truck, CreditCard, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { allProducts } from '@/lib/data';

const syariahBanks = [
  { id: 'bsi', name: 'Bank Syariah Indonesia (BSI)', logo: 'BSI' },
  { id: 'muamalat', name: 'Bank Muamalat', logo: 'B-MUA' },
  { id: 'bca-syariah', name: 'BCA Syariah', logo: 'BCA-S' },
  { id: 'btpn-syariah', name: 'BTPN Syariah', logo: 'BTPN-S' },
  { id: 'mega-syariah', name: 'Bank Mega Syariah', logo: 'MEGA-S' },
  { id: 'cimb-syariah', name: 'CIMB Niaga Syariah', logo: 'CIMB-S' },
  { id: 'jago-syariah', name: 'Bank Jago Syariah', logo: 'JAGO-S' },
];

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  const product = allProducts.find(p => p.id === productId);

  const [paymentMethod, setPaymentMethod] = useState('escrow');
  const [selectedBank, setSelectedBank] = useState('');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    postal: ''
  });

  const isAddressComplete = address.name.length > 0 && address.phone.length > 0 && address.street.length > 0 && address.city.length > 0 && address.postal.length > 0;

  if (!product) {
    return notFound();
  }

  const ujrahFee = 2500;
  const shippingFee = 15000;
  const totalPrice = product.price + ujrahFee + shippingFee;

  return (
    <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout Syariah</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alamat Pengiriman</CardTitle>
              <CardDescription>Ke mana barang ini harus dikirim?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Penerima</Label>
                  <Input id="name" placeholder="Budi Santoso" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input id="phone" type="tel" placeholder="08123456789" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Alamat Lengkap (Jalan, RT/RW, Patokan)</Label>
                <textarea 
                  id="street" 
                  rows={3}
                  placeholder="Jl. Sudirman No. 123, Dekat Masjid Raya..." 
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={address.street} 
                  onChange={e => setAddress({...address, street: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota/Kecamatan</Label>
                  <Input id="city" placeholder="Jakarta Selatan" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Kode Pos</Label>
                  <Input id="postal" placeholder="12345" value={address.postal} onChange={e => setAddress({...address, postal: e.target.value})} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={(product as any).images?.[0] || product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Kondisi: {product.condition}/10 (Berdasarkan deskripsi)</p>
                  <p className="font-bold text-lg mt-2 text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran (Sesuai Syariat)</CardTitle>
              <CardDescription>Pilih metode untuk menyalurkan dana amanah Anda ke rekening bersama (Escrow).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pilihan 1: Transfer Bank Syariah */}
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'escrow' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                onClick={() => setPaymentMethod('escrow')}
              >
                <div className="flex items-start gap-4">
                  <input 
                    type="radio" 
                    name="payment_method" 
                    checked={paymentMethod === 'escrow'} 
                    onChange={() => setPaymentMethod('escrow')}
                    className="mt-1 w-4 h-4 text-primary" 
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-emerald-600" /> Transfer Bank Syariah (Escrow)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Sistem 100% bebas Riba. Transfer ke rekening penampungan bank Syariah kami. Dana akan diteruskan ke penjual setelah barang diterima (Akad Wakalah bil Ujrah).
                    </p>
                    
                    {/* Dropdown Pemilihan Bank (Hanya muncul jika Escrow dipilih) */}
                    {paymentMethod === 'escrow' && (
                      <div className="mt-4 p-4 bg-white dark:bg-muted border rounded-md" onClick={(e) => e.stopPropagation()}>
                        <label className="block text-sm font-medium mb-2">Pilih Bank Tujuan Transfer:</label>
                        <Select value={selectedBank} onValueChange={(val) => setSelectedBank(val || '')}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Bank Syariah..." />
                          </SelectTrigger>
                          <SelectContent>
                            {syariahBanks.map((bank) => (
                              <SelectItem key={bank.id} value={bank.id}>
                                <span className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[10px] w-14 justify-center">{bank.logo}</Badge>
                                  {bank.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {selectedBank && (
                          <div className="mt-3 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>Rekening penampungan (Escrow) atas nama PT TrifShop Amanah menggunakan bank <strong>{syariahBanks.find(b => b.id === selectedBank)?.name}</strong> akan diberikan setelah Anda menekan tombol bayar.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pilihan 2: COD */}
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-start gap-4">
                  <input 
                    type="radio" 
                    name="payment_method" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 w-4 h-4 text-primary" 
                  />
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Truck className="w-5 h-5 text-blue-600" /> COD Terverifikasi (Bertemu Langsung)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Anda membayar uang tunai langsung kepada kurir/penjual saat bertemu. Anda wajib memberikan kode OTP kepada kurir sebagai bukti serah terima (Qabdh).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Rincian Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Harga Barang</span>
                <span className="font-medium">Rp {product.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">Biaya Platform <Badge variant="outline" className="text-[10px] ml-1">Ujrah</Badge></span>
                <span className="font-medium">Rp {ujrahFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span className="font-medium">Rp {shippingFee.toLocaleString('id-ID')}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </CardContent>
            
            <div className="px-6 py-4 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-400 flex items-start gap-2 border-y border-amber-100 dark:border-amber-900/50">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Dengan menekan tombol di bawah, Anda menyetujui <strong>Akad Jual Beli</strong>. Uang Escrow dapat di-refund 100% apabila barang terbukti cacat tersembunyi (Tadlis).</p>
            </div>
            
            <CardFooter className="pt-4 flex flex-col gap-3">
              {!isAddressComplete && (
                <div className="text-xs text-red-500 font-medium self-start w-full bg-red-50 p-2 rounded border border-red-100 dark:bg-red-950/20 dark:border-red-900">
                  ⚠️ Mohon lengkapi Alamat Pengiriman Anda terlebih dahulu.
                </div>
              )}
              <Button 
                className="w-full gap-2" 
                size="lg" 
                asChild={isAddressComplete && !!(paymentMethod === 'cod' || (paymentMethod === 'escrow' && selectedBank))}
                disabled={!isAddressComplete || (paymentMethod === 'escrow' && !selectedBank)}
              >
                {paymentMethod === 'escrow' && !selectedBank ? (
                  <span>Pilih Bank Terlebih Dahulu</span>
                ) : !isAddressComplete ? (
                  <span>Lengkapi Alamat</span>
                ) : (
                  <Link href="/dashboard">
                    <CreditCard className="w-5 h-5" />
                    {paymentMethod === 'escrow' ? `Bayar Rp ${totalPrice.toLocaleString('id-ID')}` : 'Konfirmasi COD'}
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
