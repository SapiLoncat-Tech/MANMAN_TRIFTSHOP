'use client';

import { useState } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';

const footerData = {
  marketplace: [
    { title: "Pakaian Pria", desc: "Menampilkan daftar produk fashion dan pakaian preloved khusus pria dengan jaminan kualitas." },
    { title: "Pakaian Wanita", desc: "Koleksi pakaian wanita preloved terlengkap, mulai dari busana muslimah hingga kasual." },
    { title: "Elektronik", desc: "Perangkat elektronik bekas berkualitas yang telah diinspeksi fungsinya oleh sistem kami." },
    { title: "Buku Kuliah", desc: "Tempat jual beli buku dan referensi akademik bekas pakai mahasiswa." }
  ],
  bantuan: [
    { title: "Sistem Escrow Syariah", desc: "Sistem rekening bersama di mana dana Anda ditahan dengan aman hingga barang sampai di tangan pembeli sesuai akad." },
    { title: "COD Terverifikasi", desc: "Layanan bayar di tempat (Cash on Delivery) yang diamankan menggunakan kode OTP satu kali pakai." },
    { title: "Resolusi Sengketa (Adalah)", desc: "Panel arbitrase syariah otomatis yang siap membantu menyelesaikan perselisihan antara pembeli dan penjual." },
    { title: "FAQ", desc: "Kumpulan jawaban atas pertanyaan-pertanyaan yang paling sering ditanyakan oleh pengguna." }
  ],
  kepatuhan: [
    { title: "Pusat Syariah & Fatwa", desc: "Dokumen rujukan operasional TrifShop berdasarkan panduan fatwa Dewan Syariah Nasional (DSN-MUI)." },
    { title: "AI Security Command", desc: "Pusat teknologi AI cerdas yang bekerja 24/7 mendeteksi penipuan, gharar, dan manipulasi gambar." },
    { title: "Kebijakan Privasi", desc: "Komitmen kami dalam menjaga kerahasiaan dan keamanan data pribadi seluruh pengguna." },
    { title: "Syarat & Ketentuan", desc: "Aturan main dan tata tertib mengikat bagi seluruh pihak yang bertransaksi di dalam platform." }
  ]
};

export function Footer() {
  const [selectedInfo, setSelectedInfo] = useState<{title: string, desc: string} | null>(null);

  return (
    <footer className="border-t bg-muted/20 relative">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">TrifShop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Marketplace barang preloved berbasis nilai islami, akuntansi syariah (QS. Al-Baqarah 282), dan diamankan dengan teknologi AI.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerData.marketplace.map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setSelectedInfo(item)} className="hover:text-primary transition text-left">
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Pusat Bantuan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerData.bantuan.map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setSelectedInfo(item)} className="hover:text-primary transition text-left">
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kepatuhan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerData.kepatuhan.map((item, idx) => (
                <li key={idx}>
                  <button onClick={() => setSelectedInfo(item)} className="hover:text-primary transition text-left">
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 TrifShop. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-primary" /> Transaksi Halal & Aman
            </span>
          </div>
        </div>
      </div>

      {/* Info Popup Modal */}
      {selectedInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedInfo(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{selectedInfo.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {selectedInfo.desc}
            </p>
            <button 
              onClick={() => setSelectedInfo(null)}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Tutup Penjelasan
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
