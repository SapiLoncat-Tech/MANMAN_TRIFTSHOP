import { Shirt, ShoppingBag, Smartphone, BookOpen, Package, Music, Watch, Laptop, Tent, Armchair, Gamepad2, Camera, Baby, Car, Ticket, Gem, Sparkles } from 'lucide-react';

export const allProducts = [
  // 1. Pakaian Pria
  { id: 1, slug: 'pakaian-pria', title: 'Jaket Denim Vintage', price: 150000, condition: 8, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400' },
  { id: 2, slug: 'pakaian-pria', title: 'Kemeja Flannel Kotak', price: 65000, condition: 9, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=400' },
  { id: 3, slug: 'pakaian-pria', title: 'Kaos Polos Oversize', price: 35000, condition: 9, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400' },

  // 2. Pakaian Wanita
  { id: 4, slug: 'pakaian-wanita', title: 'Dress Floral Summer', price: 120000, condition: 9, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400' },
  { id: 5, slug: 'pakaian-wanita', title: 'Blazer Kerja Wanita', price: 180000, condition: 8, image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&q=80&w=400' },
  { id: 6, slug: 'pakaian-wanita', title: 'Tunik Muslimah Syar\'i', price: 95000, condition: 10, image: 'https://images.unsplash.com/photo-1621075631248-8df0cb59f71b?auto=format&fit=crop&q=80&w=400' },

  // 3. Sepatu Pria
  { id: 7, slug: 'sepatu-pria', title: 'Sneakers Putih Original', price: 250000, condition: 7, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400' },
  { id: 8, slug: 'sepatu-pria', title: 'Sepatu Pantofel Hitam', price: 300000, condition: 8, image: 'https://images.unsplash.com/photo-1614252339460-e1763cb64740?auto=format&fit=crop&q=80&w=400' },
  { id: 9, slug: 'sepatu-pria', title: 'Sepatu Lari Olahraga', price: 180000, condition: 9, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400' },

  // 4. Sepatu Wanita
  { id: 10, slug: 'sepatu-wanita', title: 'Heels Hitam Elegan', price: 150000, condition: 8, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400' },
  { id: 11, slug: 'sepatu-wanita', title: 'Flat Shoes Nyaman', price: 80000, condition: 9, image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=400' },
  { id: 12, slug: 'sepatu-wanita', title: 'Wedges Kasual', price: 125000, condition: 8, image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=400' },

  // 5. Tas & Dompet
  { id: 13, slug: 'tas-dompet', title: 'Tas Selempang Kulit', price: 220000, condition: 8, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400' },
  { id: 14, slug: 'tas-dompet', title: 'Ransel Laptop Anti Air', price: 135000, condition: 7, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
  { id: 15, slug: 'tas-dompet', title: 'Dompet Panjang Kulit', price: 90000, condition: 9, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400' },

  // 6. Jam Tangan
  { id: 16, slug: 'jam-tangan', title: 'Jam Tangan Analog Klasik', price: 350000, condition: 9, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400' },
  { id: 17, slug: 'jam-tangan', title: 'Smartwatch Hitam Bekas', price: 500000, condition: 8, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400' },
  { id: 18, slug: 'jam-tangan', title: 'Jam Tangan Digital Sport', price: 150000, condition: 7, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400' },

  // 7. Elektronik
  { id: 19, slug: 'elektronik', title: 'Smartphone Android 4GB', price: 1500000, condition: 8, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400' },
  { id: 20, slug: 'elektronik', title: 'Headphone Wireless', price: 450000, condition: 9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: 21, slug: 'elektronik', title: 'Powerbank 10000mAh', price: 95000, condition: 8, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=400' },

  // 8. Komputer
  { id: 22, slug: 'komputer', title: 'Laptop Mahasiswa Core i5', price: 3500000, condition: 8, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400' },
  { id: 23, slug: 'komputer', title: 'Monitor LED 24 Inch', price: 800000, condition: 9, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400' },
  { id: 24, slug: 'komputer', title: 'Keyboard Mekanikal', price: 250000, condition: 7, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400' },

  // 9. Buku Kuliah
  { id: 25, slug: 'buku-kuliah', title: 'Buku Kalkulus Edisi 9', price: 85000, condition: 9, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' },
  { id: 26, slug: 'buku-kuliah', title: 'Prinsip Akuntansi Syariah', price: 60000, condition: 8, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400' },
  { id: 27, slug: 'buku-kuliah', title: 'Fisika Dasar Universitas', price: 95000, condition: 7, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400' },

  // 10. Novel & Sastra
  { id: 28, slug: 'novel', title: 'Buku Novel Tere Liye', price: 45000, condition: 9, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400' },
  { id: 29, slug: 'novel', title: 'Novel Harry Potter Preloved', price: 75000, condition: 8, image: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=400' },
  { id: 30, slug: 'novel', title: 'Komik Manga Set', price: 120000, condition: 9, image: 'https://images.unsplash.com/photo-1606168094036-7c98e27c157f?auto=format&fit=crop&q=80&w=400' },

  // 11. Alat Musik
  { id: 31, slug: 'alat-musik', title: 'Gitar Akustik Yamaha', price: 800000, condition: 7, image: 'https://images.unsplash.com/photo-1510915361894-faa8b2d84db8?auto=format&fit=crop&q=80&w=400' },
  { id: 32, slug: 'alat-musik', title: 'Keyboard Casio Bekas', price: 1200000, condition: 8, image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=400' },
  { id: 33, slug: 'alat-musik', title: 'Biola Ukuran 4/4', price: 650000, condition: 9, image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&q=80&w=400' },

  // 12. Olahraga & Outdoor
  { id: 34, slug: 'olahraga', title: 'Tenda Dome 2 Orang', price: 200000, condition: 8, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=400' },
  { id: 35, slug: 'olahraga', title: 'Raket Badminton Yonex', price: 150000, condition: 7, image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=400' },
  { id: 36, slug: 'olahraga', title: 'Sepeda Lipat Biru', price: 1500000, condition: 9, image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=400' },

  // 13. Perabotan Rumah
  { id: 37, slug: 'perabotan', title: 'Meja Lipat Minimalis', price: 85000, condition: 8, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400' },
  { id: 38, slug: 'perabotan', title: 'Kursi Kerja Hidrolik', price: 250000, condition: 7, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400' },
  { id: 39, slug: 'perabotan', title: 'Rak Buku Kayu', price: 120000, condition: 9, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=400' },

  // 14. Mainan & Hobi
  { id: 40, slug: 'mainan', title: 'Konsol Game Lawas', price: 450000, condition: 7, image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bfc3d?auto=format&fit=crop&q=80&w=400' },
  { id: 41, slug: 'mainan', title: 'Action Figure Anime', price: 150000, condition: 9, image: 'https://images.unsplash.com/photo-1606660265514-358ebbadc80d?auto=format&fit=crop&q=80&w=400' },
  { id: 42, slug: 'mainan', title: 'Diecast Mobil Klasik', price: 95000, condition: 8, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400' },

  // 15. Kamera & Lensa
  { id: 43, slug: 'kamera', title: 'Kamera Analog 35mm', price: 350000, condition: 8, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400' },
  { id: 44, slug: 'kamera', title: 'Lensa Fix 50mm', price: 850000, condition: 9, image: 'https://images.unsplash.com/photo-1617005082833-18e907d08316?auto=format&fit=crop&q=80&w=400' },
  { id: 45, slug: 'kamera', title: 'Tripod Kamera Aluminium', price: 120000, condition: 7, image: 'https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?auto=format&fit=crop&q=80&w=400' },

  // 16. Kosmetik Preloved
  { id: 46, slug: 'kosmetik', title: 'Parfum Branded Sisa 80%', price: 450000, condition: 8, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400' },
  { id: 47, slug: 'kosmetik', title: 'Palette Eyeshadow Sisa 90%', price: 150000, condition: 9, image: 'https://images.unsplash.com/photo-1512496115841-cad284aca301?auto=format&fit=crop&q=80&w=400' },
  { id: 48, slug: 'kosmetik', title: 'Lipstik Swatch Sekali', price: 80000, condition: 9, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400' },

  // 17. Perlengkapan Bayi
  { id: 49, slug: 'bayi', title: 'Stroller Bayi Lipat', price: 650000, condition: 9, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400' },
  { id: 50, slug: 'bayi', title: 'Gendongan Bayi Ergonomis', price: 150000, condition: 8, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
  { id: 51, slug: 'bayi', title: 'Mainan Edukasi Kayu', price: 75000, condition: 7, image: 'https://images.unsplash.com/photo-1560064560-64cc15b0e501?auto=format&fit=crop&q=80&w=400' },

  // 18. Aksesoris Otomotif
  { id: 52, slug: 'otomotif', title: 'Helm Half Face Hitam', price: 150000, condition: 8, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400' },
  { id: 53, slug: 'otomotif', title: 'Jaket Motor Touring', price: 250000, condition: 7, image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=400' },
  { id: 54, slug: 'otomotif', title: 'Sarung Tangan Kulit', price: 85000, condition: 9, image: 'https://images.unsplash.com/photo-1513364434947-f283d0382377?auto=format&fit=crop&q=80&w=400' },

  // 19. Barang Antik
  { id: 55, slug: 'antik', title: 'Mesin Tik Klasik', price: 850000, condition: 8, image: 'https://images.unsplash.com/photo-1518085250965-01e400c28ea4?auto=format&fit=crop&q=80&w=400' },
  { id: 56, slug: 'antik', title: 'Pemutar Piringan Hitam', price: 1200000, condition: 7, image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80&w=400' },
  { id: 57, slug: 'antik', title: 'Kaset Pita Mix 90an', price: 45000, condition: 8, image: 'https://images.unsplash.com/photo-1515206085521-1ea40eb8ce6c?auto=format&fit=crop&q=80&w=400' },

  // 20. Merchandise
  { id: 58, slug: 'merchandise', title: 'Album K-Pop Preloved', price: 120000, condition: 9, image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=400' },
  { id: 59, slug: 'merchandise', title: 'Lightstick Konser Official', price: 450000, condition: 8, image: 'https://images.unsplash.com/photo-1542158308-3d84a4ec4101?auto=format&fit=crop&q=80&w=400' },
  { id: 60, slug: 'merchandise', title: 'Photocard Set Bias', price: 80000, condition: 10, image: 'https://images.unsplash.com/photo-1605335904576-ffbf1135767b?auto=format&fit=crop&q=80&w=400' },
];

const baseCategories = [
  { id: 'pakaian-pria', name: 'Pakaian Pria', icon: '👔', lucideIcon: Shirt, description: 'Kemeja, jaket, kaos preloved layak pakai.', image: '/images/cat_pakaian_pria.png' },
  { id: 'pakaian-wanita', name: 'Pakaian Wanita', icon: '👗', lucideIcon: ShoppingBag, description: 'Dress, blouse, tunik dengan kondisi terawat.', image: '/images/cat_pakaian_wanita.png' },
  { id: 'sepatu-pria', name: 'Sepatu Pria', icon: '👟', lucideIcon: Package, description: 'Sneakers dan sepatu formal original bekas.', image: '/images/cat_sepatu_pria.png' },
  { id: 'sepatu-wanita', name: 'Sepatu Wanita', icon: '👠', lucideIcon: Sparkles, description: 'Heels, flat shoes, dan boots wanita.', image: '/images/cat_sepatu_wanita.png' },
  { id: 'tas-dompet', name: 'Tas & Dompet', icon: '👜', lucideIcon: ShoppingBag, description: 'Tas punggung, selempang, dan dompet kulit.', image: '/images/cat_tas_dompet.png' },
  { id: 'jam-tangan', name: 'Jam Tangan', icon: '⌚', lucideIcon: Watch, description: 'Jam tangan analog dan smartwatch second.', image: '/images/cat_jam_tangan.png' },
  { id: 'elektronik', name: 'Elektronik & Gadget', icon: '📱', lucideIcon: Smartphone, description: 'Handphone, tablet, dan aksesoris original.', image: '/images/cat_elektronik.png' },
  { id: 'komputer', name: 'Komputer & Laptop', icon: '💻', lucideIcon: Laptop, description: 'Laptop mahasiswa, PC rakitan bekas.', image: '/images/cat_komputer.png' },
  { id: 'buku-kuliah', name: 'Buku Kuliah', icon: '📚', lucideIcon: BookOpen, description: 'Buku literatur, diktat, dan modul kampus.', image: '/images/cat_buku_kuliah.png' },
  { id: 'novel', name: 'Novel & Sastra', icon: '📖', lucideIcon: BookOpen, description: 'Buku fiksi, komik, dan karya sastra.', image: '/images/cat_novel.png' },
  { id: 'alat-musik', name: 'Alat Musik', icon: '🎸', lucideIcon: Music, description: 'Gitar, keyboard, dan alat musik akustik.', image: '/images/cat_alat_musik.png' },
  { id: 'olahraga', name: 'Olahraga & Outdoor', icon: '⛺', lucideIcon: Tent, description: 'Peralatan mendaki, raket, dan bola.', image: '/images/cat_olahraga.png' },
  { id: 'perabotan', name: 'Perabotan Rumah', icon: '🛋️', lucideIcon: Armchair, description: 'Meja lipat, kursi, dan dekorasi kosan.', image: '/images/cat_perabotan.png' },
  { id: 'mainan', name: 'Mainan & Hobi', icon: '🎮', lucideIcon: Gamepad2, description: 'Action figure, diecast, dan konsol game.', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80' },
  { id: 'kamera', name: 'Kamera & Lensa', icon: '📷', lucideIcon: Camera, description: 'Kamera mirrorless, DSLR, dan lensa manual.', image: '/images/cat_kamera.png' },
  { id: 'kosmetik', name: 'Kosmetik Preloved', icon: '💄', lucideIcon: Sparkles, description: 'Parfum dan alat makeup (dengan sisa pakai).', image: '/images/cat_kosmetik.png' },
  { id: 'bayi', name: 'Perlengkapan Bayi', icon: '🍼', lucideIcon: Baby, description: 'Stroller, baju bayi, dan mainan edukasi.', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80' },
  { id: 'otomotif', name: 'Aksesoris Otomotif', icon: '🚗', lucideIcon: Car, description: 'Helm, jaket motor, dan part modifikasi.', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80' },
  { id: 'antik', name: 'Barang Antik', icon: '🏺', lucideIcon: Gem, description: 'Koleksi jadul, kaset pita, dan hiasan lawas.', image: 'https://images.unsplash.com/photo-1518085250965-01e400c28ea4?w=800&q=80' },
  { id: 'merchandise', name: 'Merch K-Pop/Anime', icon: '🎫', lucideIcon: Ticket, description: 'Photocard, lightstick, dan album fisik.', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80' },
];

export const categories = baseCategories.map(cat => ({
  ...cat,
  count: allProducts.filter(p => p.slug === cat.id).length
}));
