import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';

export default async function KategoriPage() {
  // Ambil data kategori dari Supabase
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl flex-1">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Kategori Produk</h1>
        <p className="text-muted-foreground text-lg">
          Jelajahi berbagai barang preloved berkualitas yang telah diverifikasi oleh AI Anti-Gharar kami untuk memastikan kejujuran deskripsi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link href={`/kategori/${category.id}`} key={category.id}>
            <Card className="h-full hover:border-primary transition-all cursor-pointer group overflow-hidden">
              <div className="relative h-40 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-background/90 p-2 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">{category.icon}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="group-hover:text-primary transition-colors">{category.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">Eksplor</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
