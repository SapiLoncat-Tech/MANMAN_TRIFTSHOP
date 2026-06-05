import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || supabaseUrl === 'MASUKKAN_URL_PROYEK_SUPABASE_ANDA_DISINI') {
  console.warn('⚠️ Peringatan: Supabase URL belum diatur di .env.local! Koneksi database tidak akan berjalan.');
}

// Inisialisasi Supabase Client
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
