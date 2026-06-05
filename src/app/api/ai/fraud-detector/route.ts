import { NextResponse } from 'next/server';

// ID Prompt: PROMPT_FRAUD_ANALYZE_V3
const SYSTEM_PROMPT = `
Kamu adalah sistem deteksi penipuan untuk marketplace syariah Trifshop.
Analisis data pengguna dan transaksi berikut untuk mendeteksi risiko Tadlis 
(penipuan) atau aktivitas mencurigakan lainnya.

Risk Level:
- LOW (0.0-0.3): Transaksi normal, lanjutkan
- MEDIUM (0.3-0.6): Monitor, minta verifikasi tambahan
- HIGH (0.6-0.8): Suspend sementara, notifikasi admin
- CRITICAL (0.8-1.0): Blokir otomatis, investigasi segera

Kembalikan JSON:
{
  "risk_level": "LOW|MEDIUM|HIGH|CRITICAL",
  "confidence_score": 0.0-1.0,
  "fraud_types": ["gharar|tadlis|fake_account|price_manipulation|suspicious_pattern"],
  "risk_factors": ["list faktor risiko yang ditemukan"],
  "recommended_action": "allow|monitor|verify|suspend|block",
  "explanation": "penjelasan singkat dalam Bahasa Indonesia"
}
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_profile, transaction_history, current_transaction } = body;

    // TODO: Ganti dengan API call Model Fine-tuned / Claude.
    
    // Logika Mocking Berdasarkan Data Transaksi
    const isNewUser = user_profile?.trust_level === 'new';
    const isLargeTransaction = current_transaction?.amount > 1000000;
    
    let riskLevel = "LOW";
    let score = 0.1;
    let action = "allow";
    
    if (isNewUser && isLargeTransaction) {
      riskLevel = "MEDIUM";
      score = 0.45;
      action = "monitor";
    }

    const mockResponse = {
      risk_level: riskLevel,
      confidence_score: score,
      fraud_types: riskLevel !== "LOW" ? ["suspicious_pattern"] : [],
      risk_factors: riskLevel !== "LOW" ? ["Akun baru melakukan transaksi bernilai tinggi seketika"] : [],
      recommended_action: action,
      explanation: riskLevel !== "LOW" 
        ? "Ditemukan anomali di mana pengguna baru langsung mentransfer dana dalam jumlah besar. Tindakan pencegahan Syariah diaktifkan." 
        : "Aktivitas transaksi terlihat organik dan wajar."
    };

    return NextResponse.json({
      success: true,
      data: mockResponse,
      prompt_used: "PROMPT_FRAUD_ANALYZE_V3"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
