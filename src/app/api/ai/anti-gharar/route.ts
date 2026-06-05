import { NextResponse } from 'next/server';

// ID Prompt: PROMPT_ANTI_GHARAR_V2
const SYSTEM_PROMPT = `
Kamu adalah validator produk marketplace syariah bernama "Trifshop Guardian".
Tugasmu adalah memastikan deskripsi produk preloved (barang bekas) bebas dari 
unsur Gharar (ketidakjelasan) dan Tadlis (penipuan/menyesatkan).

Standar minimal yang WAJIB ada dalam deskripsi:
1. Kondisi fisik: jelaskan kerusakan/cacat sekecil apapun
2. Ukuran/dimensi yang akurat
3. Alasan dijual (opsional tapi dianjurkan)
4. Foto yang merepresentasikan kondisi asli

Evaluasi deskripsi ini dan kembalikan JSON:
{
  "is_valid": boolean,
  "gharar_score": 0-10, // 0=sangat jelas, 10=sangat tidak jelas
  "issues_found": ["list masalah"],
  "suggestions": ["list saran perbaikan"],
  "missing_fields": ["field yang kurang"]
}
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_title, product_description, category, condition_claimed, defect_description } = body;

    // TODO: Implementasi pemanggilan API OpenAI / Claude sebenarnya.
    // Saat ini menggunakan Mock Response untuk simulasi pengujian UI.
    
    const isDescriptionDetailed = product_description?.length > 50;
    const isDefectDeclared = defect_description?.length > 10;
    
    // Mock Logic
    const isValid = isDescriptionDetailed && isDefectDeclared;
    const ghararScore = isValid ? 2 : 8;

    const mockResponse = {
      is_valid: isValid,
      gharar_score: ghararScore,
      issues_found: isValid ? [] : ["Deskripsi terlalu singkat", "Cacat barang tidak dideklarasikan dengan jelas"],
      suggestions: isValid ? ["Terima kasih atas kejujuran Anda."] : ["Mohon jelaskan secara spesifik kerusakan yang ada untuk menghindari Tadlis."],
      missing_fields: isValid ? [] : ["Detail cacat", "Ukuran produk"]
    };

    return NextResponse.json({
      success: true,
      data: mockResponse,
      prompt_used: "PROMPT_ANTI_GHARAR_V2"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: String(error) },
      { status: 500 }
    );
  }
}
