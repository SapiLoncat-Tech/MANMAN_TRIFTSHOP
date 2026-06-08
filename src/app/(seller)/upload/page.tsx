'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Sparkles, UploadCloud, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { createProductAction } from '@/lib/actions/product';

export default function UploadProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: '8', // Default condition
    description: '',
    defect_description: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.price || !formData.description) {
      alert("Harap isi semua kolom wajib!");
      return;
    }
    if (images.length < 3) {
      alert("Sesuai prinsip transparansi, Anda wajib mengunggah minimal 3 foto produk.");
      return;
    }

    setIsSubmitting(true);
    setAiFeedback(null);

    try {
      // 1. Verifikasi AI Guardian (Anti-Gharar & Tadlis)
      const aiResponse = await fetch('/api/ai/anti-gharar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_title: formData.title,
          product_description: formData.description,
          category: formData.category,
          condition_claimed: formData.condition,
          defect_description: formData.defect_description
        })
      });
      const aiResult = await aiResponse.json();
      
      if (!aiResult.data.is_valid) {
        setAiFeedback(aiResult.data);
        setIsSubmitting(false);
        return; // Hentikan proses jika AI menolak
      }

      // 2. Upload Gambar ke Supabase Storage
      const uploadedImageUrls: string[] = [];
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, file);

        if (uploadError) throw new Error(`Gagal upload gambar: ${uploadError.message}`);
        
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(uploadData.path);
          
        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      // 3. Simpan data ke Database menggunakan Server Action
      const result = await createProductAction({
        slug: formData.category,
        title: formData.title,
        price: Number(formData.price),
        condition: Number(formData.condition),
        images: uploadedImageUrls,
        description: formData.description,
        defect_description: formData.defect_description || 'Tidak ada cacat'
      });

      if (!result.success) throw new Error(result.error);

      // Sukses!
      alert("Alhamdulillah, produk berhasil di-publish dan telah lolos verifikasi AI!");
      router.push('/dashboard'); // Arahkan ke dashboard penjual

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="Contoh: Kemeja Flannel Pria Size L" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pakaian-pria">Pakaian Pria</SelectItem>
                      <SelectItem value="pakaian-wanita">Pakaian Wanita</SelectItem>
                      <SelectItem value="elektronik">Elektronik</SelectItem>
                      <SelectItem value="buku">Buku Kuliah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Harga Penawaran (Rp)</Label>
                  <Input id="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="100000" />
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
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Jelaskan spesifikasi, merek, lama pemakaian, dan alasan dijual..." 
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 mb-2 font-medium">
                  <ShieldAlert className="w-5 h-5" />
                  Wajib: Deklarasi Cacat/Kekurangan (Anti-Tadlis)
                </div>
                <Label htmlFor="defect_description" className="text-muted-foreground text-xs block mb-2">
                  Berdasarkan syariat, penjual wajib menjelaskan semua cacat/kerusakan sekecil apapun secara jujur. Jika barang tanpa cacat, tulis "Tidak ada cacat".
                </Label>
                <Textarea 
                  id="defect_description" 
                  value={formData.defect_description}
                  onChange={handleInputChange}
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
              <label htmlFor="image-upload" className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer block">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Klik untuk Unggah Foto</h3>
                <p className="text-sm text-muted-foreground mt-1">Format JPG, PNG (Max 5MB)</p>
                <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>

              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-md border" />
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              {aiFeedback && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-600 dark:text-red-400 mb-4">
                  <p className="font-semibold mb-1 flex items-center gap-1"><XCircle className="w-4 h-4"/> AI Guardian Menolak:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {aiFeedback.issues_found?.map((issue: string, i: number) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-2">Saran Perbaikan:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {aiFeedback.suggestions?.map((sug: string, i: number) => (
                      <li key={i}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}

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
                  <div className="font-medium">Deteksi Tadlis</div>
                  <div className="text-muted-foreground">Pengecekan deklarasi cacat/minus.</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full gap-2" size="lg">
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sedang Memproses...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5" /> Submit & Verifikasi AI</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
