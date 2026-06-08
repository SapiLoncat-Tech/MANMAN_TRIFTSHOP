'use server';

import { supabaseAdmin } from '../supabase/admin';

export async function createProductAction(data: {
  slug: string;
  title: string;
  price: number;
  condition: number;
  images: string[];
  description: string;
  defect_description: string;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('products')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Error inserting product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: result };
  } catch (err: any) {
    console.error('Action error:', err);
    return { success: false, error: err.message || 'Internal error' };
  }
}
