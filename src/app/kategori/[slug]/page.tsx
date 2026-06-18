'use client';

import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { ShieldCheck, ShoppingCart, Filter, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

export default function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Gunakan React.use() untuk melakukan unwrap pada params Promise
  const unwrappedParams = use(params);
  const currentSlug = unwrappedParams.slug;
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('slug', currentSlug)
      .then(({ data }) => {
        setFilteredProducts(data || []);
        setLoading(false);
      });
  }, [currentSlug]);

  // Ubah format slug (misal: pakaian-wanita) menjadi judul (Pakaian Wanita)
  const categoryName = currentSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/kategori" className="hover:text-primary transition-colors">Kategori</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{categoryName}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Kategori: {categoryName}</h1>
          <p className="text-muted-foreground mt-2">Daftar produk halal dan telah diverifikasi AI untuk kategori ini.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter & Urutkan
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-muted-foreground animate-pulse">Memuat produk...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all border-muted/60">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-sm">
                    Kondisi: {product.condition}/10
                  </Badge>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="text-xs text-muted-foreground mb-1">{categoryName}</div>
                <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="font-bold text-lg text-primary">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verifikasi Anti-Gharar Lulus
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2" variant="secondary" asChild>
                  <Link href={`/produk/${product.id}`}>
                    <ShoppingCart className="w-4 h-4" /> Beli via Escrow
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
          <PackageOpen className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Belum ada barang</h2>
          <p className="text-muted-foreground max-w-md">
            Saat ini belum ada produk preloved yang terverifikasi untuk kategori <strong>{categoryName}</strong>. 
            Jadilah yang pertama menjual barang Anda di sini!
          </p>
          <Button className="mt-6 gap-2" asChild>
            <Link href="/upload">Jual Barang Sekarang</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
