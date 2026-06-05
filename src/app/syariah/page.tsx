import { ShieldCheck, Search, BookOpen, HeartHandshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PusatSyariahPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Pusat Kepatuhan Syariah</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mempelajari bagaimana TrifShop mengimplementasikan nilai-nilai Islami dalam setiap transaksi digital, dari hulu ke hilir.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" /> Al-Baqarah 282: Pencatatan Transaksi
          </h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-lg leading-relaxed space-y-4">
              <p className="italic text-muted-foreground border-l-4 border-primary pl-4">
                "Hai orang-orang yang beriman, apabila kamu bermu'amalah tidak secara tunai untuk waktu yang ditentukan, hendaklah kamu menuliskannya..."
              </p>
              <p>
                Platform kami menggunakan sistem <strong>Immutable Ledger</strong> (Buku Jurnal Digital) untuk mencatat setiap mutasi dana Escrow. Dana yang ditransfer pembeli tidak langsung masuk ke rekening penjual, melainkan dicatat sebagai amanah pada sistem kami hingga barang diterima dengan selamat.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Search className="w-8 h-8 text-amber-500" /> Anti-Gharar & Anti-Tadlis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-amber-700">Mencegah Gharar (Ketidakjelasan)</h3>
                <p className="text-muted-foreground">
                  Gharar terjadi ketika spesifikasi barang tidak jelas. TrifShop menggunakan <strong>Kecerdasan Buatan (AI)</strong> untuk memvalidasi kelengkapan deskripsi, memastikan foto asli, dan memeriksa kejelasan harga pasar.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-amber-700">Mencegah Tadlis (Penyembunyian Cacat)</h3>
                <p className="text-muted-foreground">
                  Tadlis adalah haram dalam Islam. Sistem form *upload* kami mewajibkan penjual untuk secara eksplisit mendeklarasikan ada atau tidaknya cacat pada barang preloved yang dijual.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-blue-500" /> Bebas Riba
          </h2>
          <Card>
            <CardContent className="p-6 text-lg leading-relaxed">
              <p>
                Seluruh metode pembayaran dan sistem perbankan penampung (Escrow) yang digunakan TrifShop beroperasi melalui rekening bank Syariah. Kami tidak menerapkan biaya keterlambatan (denda riba), melainkan menggunakan akad <strong>Ujrah</strong> (biaya jasa/platform) dengan nominal tetap (flat) yang transparan di awal.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
