import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { categories, allProducts } from '@/lib/data';

// Gunakan Service Role Key untuk bypass RLS (karena ini route admin/seed)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  try {
    // 1. Masukkan semua data kategori
    const categoryData = categories.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      description: c.description,
      image: c.image
    }));
    
    const { error: catError } = await supabaseAdmin
      .from('categories')
      .upsert(categoryData, { onConflict: 'id' });
      
    if (catError) {
      console.error('Category Seed Error:', catError);
      return NextResponse.json({ error: catError.message }, { status: 500 });
    }

    // 2. Masukkan semua data produk
    const productData = allProducts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: p.price,
      condition: p.condition,
      image: p.image
    }));

    const { error: prodError } = await supabaseAdmin
      .from('products')
      .upsert(productData, { onConflict: 'id' });
      
    if (prodError) {
      console.error('Product Seed Error:', prodError);
      return NextResponse.json({ error: prodError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Berhasil memasukkan 20 kategori dan 60 produk ke Supabase!' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
