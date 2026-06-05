import { NextResponse } from 'next/server';

// ID Prompt: PROMPT_PRICE_FAIR_V1
const SYSTEM_PROMPT = `
Kamu adalah analis harga pasar untuk barang preloved/bekas di Indonesia.
Tugas kamu: evaluasi apakah harga yang diajukan penjual wajar berdasarkan 
kondisi barang dan harga pasar terkini.

Kembalikan JSON:
{
  "is_fair": boolean,
  "market_range": { "min": number, "max": number, "currency": "IDR" },
  "seller_price": number,
  "assessment": "underpriced|fair|slightly_overpriced|overpriced",
  "deviation_percent": number,
  "recommendation": "string"
}
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_name, category, condition_score, price } = body;

    // TODO: Ganti dengan API call LLM Asli.
    
    // Simulasi harga pasar
    const mockMarketMin = 80000;
    const mockMarketMax = 150000;
    const isFair = price >= mockMarketMin && price <= mockMarketMax;
    
    let assessment = "fair";
    if (price < mockMarketMin) assessment = "underpriced";
    if (price > mockMarketMax && price <= mockMarketMax * 1.2) assessment = "slightly_overpriced";
    if (price > mockMarketMax * 1.2) assessment = "overpriced";

    const mockResponse = {
      is_fair: isFair || assessment === "slightly_overpriced",
      market_range: { min: mockMarketMin, max: mockMarketMax, currency: "IDR" },
      seller_price: price,
      assessment: assessment,
      deviation_percent: Math.abs(((price - ((mockMarketMin + mockMarketMax) / 2)) / ((mockMarketMin + mockMarketMax) / 2)) * 100),
      recommendation: isFair 
        ? "Harga wajar sesuai kondisi syariat." 
        : "Harga terlalu jauh dari nilai pasar, mohon disesuaikan agar terhindar dari indikasi eksploitasi."
    };

    return NextResponse.json({
      success: true,
      data: mockResponse,
      prompt_used: "PROMPT_PRICE_FAIR_V1"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
