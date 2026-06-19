'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, MoreVertical, Settings, ShieldCheck, HelpCircle } from 'lucide-react';

export function FloatingNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-md p-1.5 rounded-full border shadow-lg supports-[backdrop-filter]:bg-background/60">
      <button 
        className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary outline-none transition-all cursor-pointer"
        onClick={() => router.back()}
        title="Kembali ke halaman sebelumnya"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button 
        className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary outline-none transition-all cursor-pointer"
        onClick={() => router.push('/')}
        title="Kembali ke Beranda"
      >
        <Home className="w-5 h-5" />
      </button>

      <div className="relative" ref={menuRef}>
        <button 
          className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary outline-none transition-all cursor-pointer"
          title="Menu Lainnya"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-56 bg-background border rounded-lg shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
            <div className="px-4 py-3 border-b bg-muted/20">
              <span className="text-sm font-semibold">Menu Aplikasi</span>
            </div>
            <div className="p-1 flex flex-col">
              <button onClick={() => { setIsOpen(false); router.push('/dashboard'); }} className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors">
                <Settings className="w-4 h-4 mr-3" /> Setelan Akun
              </button>
              <button onClick={() => { setIsOpen(false); router.push('/syariah'); }} className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors">
                <ShieldCheck className="w-4 h-4 mr-3" /> Pusat Syariah
              </button>
              <button onClick={() => { setIsOpen(false); router.push('/tentang'); }} className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors">
                <HelpCircle className="w-4 h-4 mr-3" /> Bantuan & FAQ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
