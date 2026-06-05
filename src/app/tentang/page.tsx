import { ShieldCheck, Target, Users } from 'lucide-react';

export default function TentangKamiPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
      <div className="text-center mb-16">
        <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Tentang TrifShop</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Membangun ekosistem ekonomi sirkular (thrifting) yang aman, transparan, dan diberkahi.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Berdiri pada tahun 2025, <strong>TrifShop</strong> lahir dari sebuah keresahan: tingginya tingkat penipuan dan ketidakjelasan kondisi barang (Gharar) di pasar barang bekas digital, yang seringkali merugikan pembeli dan melanggar prinsip-prinsip muamalah Islam.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
          <div className="bg-muted/50 p-8 rounded-2xl border">
            <Target className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Visi Kami</h3>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi marketplace barang preloved nomor satu di dunia yang menjadi standar baku penerapan fiqih muamalah kontemporer dipadukan dengan teknologi AI mutakhir.
            </p>
          </div>
          <div className="bg-muted/50 p-8 rounded-2xl border">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3">Misi Kami</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">✓ Mengeliminasi unsur Gharar dan Tadlis.</li>
              <li className="flex items-center gap-2">✓ Mengedukasi penjual untuk berdagang jujur.</li>
              <li className="flex items-center gap-2">✓ Melindungi dana umat melalui Escrow Syariah.</li>
            </ul>
          </div>
        </div>

        <h2>Kenapa Memilih Kami?</h2>
        <p>
          Berbeda dengan marketplace konvensional yang melepaskan tanggung jawab sengketa kepada pengguna, TrifShop bertindak sebagai wasit aktif menggunakan Kecerdasan Buatan (AI Validator) sejak barang pertama kali diunggah. Kami memastikan harga tidak menzalimi pembeli, dan dana dijaga ketat hingga barang terkonfirmasi sesuai akad.
        </p>
      </div>
    </div>
  );
}
