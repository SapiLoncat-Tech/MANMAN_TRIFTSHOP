'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    question: "Apa itu sistem Escrow Syariah di TrifShop?",
    answer: "Sistem Escrow Syariah adalah rekening bersama yang menahan dana pembeli secara aman. Dana baru akan diteruskan kepada penjual setelah barang diterima oleh pembeli sesuai dengan deskripsi (akad salam/istishna). Ini mencegah penipuan."
  },
  {
    question: "Bagaimana cara kerja AI Anti-Gharar?",
    answer: "AI kami secara otomatis menganalisis foto barang preloved yang diunggah penjual. Jika ditemukan cacat atau kerusakan yang tidak disebutkan dalam deskripsi, AI akan memberi peringatan atau memblokir produk untuk menghindari gharar (ketidakjelasan/penipuan)."
  },
  {
    question: "Apakah bisa COD (Bayar di Tempat)?",
    answer: "Bisa! Kami menyediakan fitur COD Terverifikasi. Saat bertemu, pembeli dan penjual akan menggunakan kode OTP unik dari aplikasi untuk memastikan transaksi tercatat di sistem dan aman dari tindakan kriminal."
  },
  {
    question: "Bagaimana jika barang yang datang tidak sesuai?",
    answer: "Anda dapat mengajukan komplain dalam waktu 1x24 jam setelah barang tiba. Dana Anda di Escrow akan otomatis dibekukan. Jika terbukti tidak sesuai, dana akan dikembalikan 100%. Anda juga bisa menggunakan fitur Resolusi Sengketa (Adalah) jika ada perdebatan dengan penjual."
  },
  {
    question: "Apakah jualan di sini dikenakan biaya layanan?",
    answer: "Pendaftaran dan membuka toko di TrifShop 100% gratis. Kami hanya mengenakan biaya admin syariah (ujrah) yang sangat ringan dan transparan per transaksi sukses untuk pemeliharaan sistem keamanan."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Pusat Bantuan & FAQ</h1>
          <p className="text-muted-foreground text-lg">
            Temukan jawaban untuk pertanyaan seputar transaksi syariah, keamanan AI, dan cara penggunaan TrifShop.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'bg-card hover:border-primary/50'}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-lg focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-muted-foreground leading-relaxed border-t border-border/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3 relative z-10">Masih Punya Pertanyaan Lain?</h2>
          <p className="text-primary-foreground/80 mb-6 relative z-10">
            Tim resolusi sengketa dan layanan pelanggan kami siap membantu Anda 24/7.
          </p>
          <Button variant="secondary" size="lg" className="relative z-10 font-medium" asChild>
            <Link href="mailto:support@trifshop.com">
              Hubungi CS Kami <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
