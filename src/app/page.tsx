'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, ShoppingBag, HeartHandshake, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Products
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8)
      .then(({ data }) => setProducts(data || []));

    // Fetch Categories
    supabase
      .from('categories')
      .select('*')
      .limit(6)
      .then(({ data }) => setCategoriesData(data || []));
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit text-sm font-medium border border-primary/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified by AI Anti-Gharar</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Temukan Barang Preloved yang <span className="text-primary">Halal & Jujur</span>.
            </h1>
            <p className="text-lg text-muted-foreground md:max-w-[90%] leading-relaxed">
              TrifShop adalah marketplace syariah pertama yang menggunakan AI untuk mendeteksi kecurangan, memastikan deskripsi jujur, dan melindungi dana Anda dengan sistem Escrow otomatis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="gap-2 h-12 text-base shadow-lg shadow-primary/20">
                <ShoppingBag className="w-5 h-5" /> Mulai Belanja
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-12 text-base">
                <HeartHandshake className="w-5 h-5" /> Jual Barang
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tanpa Riba</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tanpa Gharar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Tanpa Tadlis</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl" />
            <div className="relative bg-card border shadow-xl rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  AI Shield Active
                </Badge>
              </div>
              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Escrow Syariah</h4>
                    <p className="text-xs text-muted-foreground">Dana aman 100% hingga barang diterima.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">AI Validator</h4>
                    <p className="text-xs text-muted-foreground">Deskripsi transparan tanpa cacat tersembunyi.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Kategori Populer</h2>
              <p className="text-muted-foreground">Temukan barang yang Anda butuhkan dengan mudah.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesData.map((category, idx) => (
              <Link href={`/kategori/${category.id}`} key={category.id}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer border rounded-xl overflow-hidden relative h-32 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:border-primary/50"
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
                  <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-20 text-white p-2">
                    <h3 className="font-bold text-base md:text-lg drop-shadow-md">{category.name}</h3>
                    <p className="text-xs text-white/90 mt-1 drop-shadow-md">Eksplor</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Baru Diverifikasi AI</h2>
              <p className="text-muted-foreground">Produk preloved yang baru lolos uji kewajaran harga dan deskripsi.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex gap-2">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all border-muted/60">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-sm">
                      Kondisi: {product.condition}/10
                    </Badge>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="text-xs text-muted-foreground mb-1 capitalize">{product.slug.replace('-', ' ')}</div>
                  <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="font-bold text-lg">
                    Rp {product.price.toLocaleString('id-ID')}
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
          
          <div className="mt-8 flex justify-center sm:hidden">
            <Button variant="outline" className="w-full gap-2">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Bertransaksi Sesuai Syariat</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Sistem kami dirancang untuk mengimplementasikan QS. Al-Baqarah ayat 282 tentang pencatatan utang-piutang digital yang transparan dan aman.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl">Sistem Escrow</h3>
              <p className="text-primary-foreground/70 text-sm">Dana Anda ditahan aman di rekening bersama hingga barang diterima.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl">AI Anti-Gharar</h3>
              <p className="text-primary-foreground/70 text-sm">Deskripsi wajib jujur, AI mendeteksi kecurangan kondisi barang dari foto.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl">COD Terverifikasi</h3>
              <p className="text-primary-foreground/70 text-sm">Otorisasi pertemuan langsung dengan sistem keamanan OTP satu kali pakai.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
