'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldCheck, User, Search, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/context/CartContext';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const { itemCount } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Cek status login awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Dengarkan perubahan status login (jika user masuk/keluar)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight text-primary">TrifShop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/kategori" className="transition-colors hover:text-primary">
              Kategori
            </Link>
            <Link href="/syariah" className="transition-colors hover:text-primary">
              Pusat Syariah
            </Link>
            <Link href="/tentang" className="transition-colors hover:text-primary">
              Tentang Kami
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <form action="/cari" className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              name="q"
              type="search" 
              placeholder="Cari barang preloved halal..." 
              className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1" 
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/keranjang">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50" asChild>
              <Link href="/admin/dashboard">Panel Pemilik</Link>
            </Button>
          </div>
          <div className="hidden sm:flex gap-2 items-center">
            {user ? (
              <>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 gap-2" asChild>
                  <Link href="/dashboard">
                    <User className="w-4 h-4" /> Akun Saya
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Keluar">
                  <LogOut className="w-4 h-4 text-red-500" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Daftar</Link>
                </Button>
              </>
            )}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
