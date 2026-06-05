'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, DollarSign, Activity, Upload, TrendingUp, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function UserDashboard() {
  const [activeRole, setActiveRole] = useState<'pembeli' | 'penjual'>('pembeli');

  return (
    <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Akun Saya</h1>
          <p className="text-muted-foreground">Kelola aktivitas belanja dan penjualan Anda di satu tempat.</p>
        </div>
        
        {/* Role Toggle Switch */}
        <div className="flex items-center bg-muted p-1 rounded-lg border">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeRole === 'pembeli' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveRole('pembeli')}
          >
            Sebagai Pembeli
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeRole === 'penjual' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveRole('penjual')}
          >
            Sebagai Penjual
          </button>
        </div>
      </div>

      {activeRole === 'pembeli' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu Pembayaran</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1 Pesanan</div>
                <p className="text-xs text-muted-foreground mt-1">Selesaikan transfer Escrow</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sedang Dikirim</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">2 Barang</div>
                <p className="text-xs text-muted-foreground mt-1">Uang aman di Escrow sistem</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">5 Barang</div>
                <p className="text-xs text-muted-foreground mt-1">Barang sesuai deskripsi</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Belanja Saya</CardTitle>
              <CardDescription>
                Daftar barang yang Anda beli. Uang Anda tidak diteruskan ke penjual sebelum barang dikonfirmasi aman.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Produk</TableHead>
                    <TableHead>Toko</TableHead>
                    <TableHead>Status Pembelian</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Hari ini</TableCell>
                    <TableCell className="font-medium">Kemeja Flannel Kotak</TableCell>
                    <TableCell>Toko Fulan</TableCell>
                    <TableCell><Badge variant="outline" className="text-amber-600 border-amber-500">Menunggu Transfer BSI</Badge></TableCell>
                    <TableCell className="text-right">Rp 65.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Kemarin</TableCell>
                    <TableCell className="font-medium">Sneakers Putih Size 42</TableCell>
                    <TableCell>Ahmad Thrift</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-blue-100 text-blue-800">Sedang Dikirim (Escrow)</Badge></TableCell>
                    <TableCell className="text-right">Rp 250.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20 Ags 2025</TableCell>
                    <TableCell className="font-medium">Buku Kalkulus Edisi 9</TableCell>
                    <TableCell>Kampus Bekas</TableCell>
                    <TableCell><Badge className="bg-emerald-500 text-white">Selesai Diterima</Badge></TableCell>
                    <TableCell className="text-right">Rp 85.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {activeRole === 'penjual' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-end">
            <Button asChild className="gap-2 bg-primary">
              <Link href="/upload">
                <Upload className="w-4 h-4" />
                Jual Produk Baru
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendapatan Bersih</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 2.450.000</div>
                <p className="text-xs text-muted-foreground mt-1">Total pencairan berhasil</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu Pembeli</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">Rp 450.000</div>
                <p className="text-xs text-muted-foreground mt-1">Barang masih di jalan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 Item</div>
                <p className="text-xs text-muted-foreground mt-1">Lolos verifikasi AI</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skor Reputasi Toko</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">4.9 / 5.0</div>
                <p className="text-xs text-muted-foreground mt-1">Sangat Terpercaya</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Penjualan Toko Saya</CardTitle>
              <CardDescription>
                Detail barang Anda yang telah dibeli oleh pelanggan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Produk</TableHead>
                    <TableHead>Pembeli</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>12 Ags 2025</TableCell>
                    <TableCell className="font-medium">Jaket Denim Vintage</TableCell>
                    <TableCell>Fulan B.</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-amber-100 text-amber-800">Dikirim (Ditahan di Escrow)</Badge></TableCell>
                    <TableCell className="text-right">Rp 150.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>10 Ags 2025</TableCell>
                    <TableCell className="font-medium">Sneakers Putih Size 42</TableCell>
                    <TableCell>Ahmad S.</TableCell>
                    <TableCell><Badge className="bg-primary text-primary-foreground">Selesai (COD)</Badge></TableCell>
                    <TableCell className="text-right">Rp 250.000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05 Ags 2025</TableCell>
                    <TableCell className="font-medium">Buku Kalkulus Edisi 9</TableCell>
                    <TableCell>Zahra K.</TableCell>
                    <TableCell><Badge className="bg-emerald-500 text-white">Dana Dicairkan</Badge></TableCell>
                    <TableCell className="text-right">Rp 85.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
