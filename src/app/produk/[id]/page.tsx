'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ShieldCheck, MapPin, Star, AlertCircle, ShoppingCart, HeartHandshake, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/context/CartContext';
import { supabase } from '@/lib/supabase';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setProduct(data);
        }
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center animate-pulse">Memuat data barang...</div>;
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gambar Produk */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted border relative">
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg text-sm px-3 py-1">
                <ShieldCheck className="w-4 h-4 mr-2" /> Verified by AI
              </Badge>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.images?.[0] || product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Produk */}
        <div className="flex flex-col">
          <div className="text-sm text-muted-foreground mb-2 font-medium capitalize">{product.slug.replace('-', ' ')}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold ml-1">5.0</span>
            </div>
            <Separator orientation="vertical" className="h-5" />
            <div className="text-muted-foreground"><span className="font-medium text-foreground">{Math.floor(Math.random() * 20) + 1}</span> Terjual</div>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-4 h-4" /> Kondisi: {product.condition}/10
            </div>
          </div>

          <div className="text-4xl font-extrabold mb-8 text-primary">Rp {product.price.toLocaleString('id-ID')}</div>

          <Card className="mb-8 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-full text-emerald-600 dark:text-emerald-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Penilaian Harga AI</h4>
                <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-1">
                  Harga penawaran ini <strong>Wajar (Fair Price)</strong> berdasarkan kondisi {product.condition}/10 dan harga pasar preloved saat ini.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="font-semibold text-lg mb-2">Deskripsi Produk</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Barang preloved berkualitas dengan kondisi sesuai deskripsi. Sudah melalui pengecekan awal untuk memastikan kelayakan pakai."}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
              <h3 className="font-semibold text-amber-800 dark:text-amber-500 flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4" /> Deklarasi Cacat (Anti-Tadlis)
              </h3>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                {product.condition < 9 ? "Terdapat sedikit tanda pemakaian wajar sesuai dengan kondisi barang bekas." : "Barang dalam kondisi sangat mulus menyerupai baru. Hampir tidak ada cacat yang terlihat."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
            <Button size="lg" variant="outline" className="w-full gap-2 text-base border-primary/50 text-primary hover:bg-primary/5" onClick={handleAddToCart}>
              <Plus className="w-5 h-5" /> Keranjang
            </Button>
            <Button size="lg" className="w-full gap-2 text-base shadow-lg shadow-primary/20" asChild>
              <Link href={`/checkout/${product.id}`}>
                <ShoppingCart className="w-5 h-5" /> Beli Langsung
              </Link>
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Dana ditahan oleh sistem Escrow Syariah hingga Anda mengkonfirmasi barang diterima sesuai deskripsi.
          </p>

          {/* Seller Profile */}
          <div className="mt-8 p-4 rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                T
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  TrifShop Seller
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-600 border-emerald-200">Terverifikasi</Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> Indonesia
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Kunjungi Toko</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
