import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">TrifShop</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Marketplace barang preloved berbasis nilai islami, akuntansi syariah (QS. Al-Baqarah 282), dan diamankan dengan teknologi AI.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/kategori/pakaian-pria" className="hover:text-primary transition">Pakaian Pria</Link></li>
              <li><Link href="/kategori/pakaian-wanita" className="hover:text-primary transition">Pakaian Wanita</Link></li>
              <li><Link href="/kategori/elektronik" className="hover:text-primary transition">Elektronik</Link></li>
              <li><Link href="/kategori/buku" className="hover:text-primary transition">Buku Kuliah</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Pusat Bantuan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/escrow" className="hover:text-primary transition">Sistem Escrow Syariah</Link></li>
              <li><Link href="/cod" className="hover:text-primary transition">COD Terverifikasi</Link></li>
              <li><Link href="/adalah" className="hover:text-primary transition">Resolusi Sengketa (Adalah)</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kepatuhan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/syariah" className="hover:text-primary transition">Pusat Syariah & Fatwa</Link></li>
              <li><Link href="/security" className="hover:text-primary transition">AI Security Command</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Syarat & Ketentuan</Link></li>
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
    </footer>
  );
}
