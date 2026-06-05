'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-muted/30 py-12">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Daftar Akun Baru</CardTitle>
          <CardDescription>
            Bergabung dengan marketplace preloved syariah yang aman dan terpercaya.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap (Sesuai Identitas)</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@contoh.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor WhatsApp Aktif</Label>
            <Input id="phone" type="tel" placeholder="08123456789" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="text-xs text-muted-foreground mt-4">
            Dengan mendaftar, Anda menyetujui prinsip transaksi anti-Riba, anti-Gharar, dan anti-Tadlis (jujur) sesuai syariat Islam.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-medium" size="lg">Daftar & Verifikasi Email</Button>
          <div className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Masuk di sini
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
