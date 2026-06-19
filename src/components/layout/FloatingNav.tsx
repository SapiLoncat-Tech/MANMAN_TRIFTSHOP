'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, MoreVertical, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function FloatingNav() {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-md p-1.5 rounded-full border shadow-lg supports-[backdrop-filter]:bg-background/60">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-primary/10 hover:text-primary"
        onClick={() => router.back()}
        title="Kembali ke halaman sebelumnya"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-primary/10 hover:text-primary"
        onClick={() => router.push('/')}
        title="Kembali ke Beranda"
      >
        <Home className="w-5 h-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full hover:bg-primary/10 hover:text-primary outline-none transition-all cursor-pointer" title="Menu Lainnya">
          <MoreVertical className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Menu Aplikasi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
            <Settings className="w-4 h-4 mr-2" />
            <span>Setelan Akun</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/syariah')}>
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>Pusat Syariah</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/tentang')}>
            <HelpCircle className="w-4 h-4 mr-2" />
            <span>Bantuan & FAQ</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
