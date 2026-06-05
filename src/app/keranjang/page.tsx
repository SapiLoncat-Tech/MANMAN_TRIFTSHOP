'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/context/CartContext';

export default function KeranjangPage() {
  const { items, removeFromCart, totalPrice, itemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl flex-1">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Keranjang Belanja ({itemCount})</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Keranjang Anda Kosong</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Wah, keranjang belanjaan Anda masih kosong. Yuk temukan barang preloved halal dengan harga terbaik!
          </p>
          <Button size="lg" asChild>
            <Link href="/">Mulai Belanja</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 ml-4 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-primary font-bold mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Terverifikasi Anti-Gharar
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Ringkasan Belanja</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Harga ({itemCount} barang)</span>
                    <span className="font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biaya Platform (Ujrah)</span>
                    <span className="font-medium text-emerald-600">Dihitung saat checkout</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-bold text-lg mb-6">
                  <span>Total Belanja</span>
                  <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                
                {/* For simplicity in this demo, Checkout Keranjang just links to the first item's checkout, 
                    but conceptually it would be a multi-item checkout in a real system */}
                <Button className="w-full gap-2" size="lg" asChild>
                  <Link href={`/checkout/${items[0]?.productId || 1}`}>
                    Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
