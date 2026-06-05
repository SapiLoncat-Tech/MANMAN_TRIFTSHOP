'use client';

import { ShieldAlert, Sparkles, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UploadProductPage() {
  return (
    <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Jual Barang Preloved</h1>
        <p className="text-muted-foreground mt-2">
          Tambahkan produk dengan prinsip kejujuran. AI kami akan memverifikasi deskripsi Anda untuk menghindari Tadlis (penipuan) dan Gharar (ketidakjelasan).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detail Produk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nama Produk</Label>
                <Input id="title" placeholder="Contoh: Kemeja Flannel Pria Size L" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pakaian_pria">Pakaian Pria</SelectItem>
                      <SelectItem value="pakaian_wanita">Pakaian Wanita</SelectItem>
                      <SelectItem value="elektronik">Elektronik</SelectItem>
                      <SelectItem value="buku">Buku Kuliah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Harga Penawaran (Rp)</Label>
                  <Input id="price" type="number" placeholder="100000" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Deskripsi Lengkap</Label>
                  <Button variant="ghost" size="sm" className="h-8 text-primary gap-1">
                    <Sparkles className="w-4 h-4" /> Bantuan AI
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  placeholder="Jelaskan spesifikasi, merek, lama pemakaian, dan alasan dijual..." 
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 mb-2 font-medium">
                  <ShieldAlert className="w-5 h-5" />
                  Wajib: Deklarasi Cacat/Kekurangan (Anti-Tadlis)
                </div>
                <Label htmlFor="defects" className="text-muted-foreground text-xs block mb-2">
                  Berdasarkan syariat, penjual wajib menjelaskan semua cacat/kerusakan sekecil apapun secara jujur. Jika barang tanpa cacat, tulis "Tidak ada cacat".
                </Label>
                <Textarea 
                  id="defects" 
                  placeholder="Contoh: Ada noda kecil di bagian kerah, kancing kedua lepas satu..." 
                  className="border-amber-200 focus-visible:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Foto Produk</CardTitle>
              <CardDescription>Unggah minimal 3 foto dari sudut berbeda. Buktikan kejujuran visual.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Klik untuk Unggah Foto</h3>
                <p className="text-sm text-muted-foreground mt-1">Format JPG, PNG (Max 5MB)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">AI Guardian Check</CardTitle>
              <CardDescription>Sistem AI akan memverifikasi sebelum listing ditayangkan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background border flex items-center justify-center mt-0.5">1</div>
                <div>
                  <div className="font-medium">Validasi Gambar</div>
                  <div className="text-muted-foreground">Kesesuaian foto dengan aslinya.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background border flex items-center justify-center mt-0.5">2</div>
                <div>
                  <div className="font-medium">Deteksi Gharar</div>
                  <div className="text-muted-foreground">Analisis kejelasan deskripsi.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background border flex items-center justify-center mt-0.5">3</div>
                <div>
                  <div className="font-medium">Evaluasi Harga</div>
                  <div className="text-muted-foreground">Mengecek kewajaran harga pasar.</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" size="lg">
                Submit & Verifikasi AI
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
