import Link from 'next/link';
import { ShoppingCart, ShieldCheck, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { allProducts } from '@/lib/data';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  // Filter produk berdasarkan judul ATAU nama kategori (slug) yang mengandung kata kunci
  const searchResults = query
    ? allProducts.filter((product) => {
        const q = query.toLowerCase();
        return (
          product.title.toLowerCase().includes(q) ||
          product.slug.replace('-', ' ').includes(q)
        );
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hasil Pencarian</h1>
        <p className="text-muted-foreground mt-2">
          Menampilkan barang preloved yang sesuai dengan kata kunci: <strong className="text-foreground">"{query}"</strong>
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
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
                <div className="text-xs text-muted-foreground mb-1 capitalize">{product.slug.replace('-', ' ')}</div>
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
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed rounded-xl bg-muted/30">
          <SearchX className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Barang Tidak Ditemukan</h2>
          <p className="text-muted-foreground max-w-md">
            Maaf, kami tidak menemukan barang yang sesuai dengan kata kunci "{query}". 
            Coba gunakan kata kunci lain seperti "Sepatu", "Kemeja", atau "Tas".
          </p>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/kategori">Jelajahi Semua Kategori</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
