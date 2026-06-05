'use client';

import { ShieldCheck, Activity, Users, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-8">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 w-fit text-sm font-medium border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Akses Khusus Pemilik Sistem</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Panel Pengelola Platform</h1>
        <p className="text-muted-foreground">Monitoring arus kas Escrow, pendapatan Ujrah platform, dan deteksi kecurangan pengguna.</p>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/50 shadow-sm bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-primary">Saldo Total Escrow (Ditahan)</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-primary">Rp 45.850.000</div>
            <p className="text-xs text-muted-foreground mt-1">Uang amanah dari 124 transaksi aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan Platform (Ujrah)</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Rp 1.450.000</div>
            <p className="text-xs text-muted-foreground mt-1">Biaya admin flat (Bebas Riba)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,842</div>
            <p className="text-xs text-muted-foreground mt-1">Penjual & Pembeli Terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indikasi Fraud (AI)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3 Kasus</div>
            <p className="text-xs text-muted-foreground mt-1">Memerlukan peninjauan admin</p>
          </CardContent>
        </Card>
      </div>

      {/* Global Escrow Ledger */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Jurnal Escrow Al-Baqarah 282 (Sistem Global)
          </CardTitle>
          <CardDescription>
            Catatan mutasi digital seluruh pengguna (*Immutable Ledger*). Dana yang masuk ke Escrow akan ditahan sampai akad selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Tipe Mutasi</TableHead>
                <TableHead>Keterangan Akad</TableHead>
                <TableHead className="text-right">Nominal (Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-emerald-50/50">
                <TableCell>Baru saja</TableCell>
                <TableCell className="font-mono text-xs">TRX-982-A</TableCell>
                <TableCell><Badge variant="outline" className="border-emerald-500 text-emerald-700">KREDIT (Dana Masuk)</Badge></TableCell>
                <TableCell className="text-sm">Dana diterima dari pembeli Budi. Status: DITAHAN di Escrow.</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">+150.000</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-50/50">
                <TableCell>10 menit lalu</TableCell>
                <TableCell className="font-mono text-xs">TRX-982-B</TableCell>
                <TableCell><Badge variant="outline" className="border-emerald-500 text-emerald-700">KREDIT (Biaya Ujrah)</Badge></TableCell>
                <TableCell className="text-sm">Potongan biaya platform (Ujrah) untuk TRX-982-A.</TableCell>
                <TableCell className="text-right font-bold text-emerald-600">+2.500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1 jam lalu</TableCell>
                <TableCell className="font-mono text-xs">TRX-741-X</TableCell>
                <TableCell><Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">DEBIT (Pelepasan)</Badge></TableCell>
                <TableCell className="text-sm">Dana dilepaskan ke penjual Ahmad. Akad selesai.</TableCell>
                <TableCell className="text-right font-bold text-red-600">-250.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2 jam lalu</TableCell>
                <TableCell className="font-mono text-xs">TRX-311-C</TableCell>
                <TableCell><Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">DEBIT (Refund)</Badge></TableCell>
                <TableCell className="text-sm">Barang cacat tidak sesuai deksripsi (Tadlis). Refund ke pembeli.</TableCell>
                <TableCell className="text-right font-bold text-red-600">-85.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
