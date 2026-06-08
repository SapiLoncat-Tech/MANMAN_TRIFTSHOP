import { createClient } from '@supabase/supabase-js';

// Klien admin ini menggunakan SERVICE_ROLE_KEY sehingga bisa bypass RLS
// HANYA BOLEH DIGUNAKAN DI SERVER SIDE (Server Actions / API Routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
