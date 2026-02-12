import { NextResponse } from "next/server";
import crypto from "crypto";

interface HashRequest {
  orderId: string;
  amount: string;
  currency: string;
}

export async function POST(request: Request) {
  try {
    const body: HashRequest = await request.json();
    const { orderId, amount, currency } = body;

    const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET?.trim();

    if (!merchantId || !merchantSecret) {
      console.error("DEBUG: Environment variables missing");
      return NextResponse.json({ error: "Config missing" }, { status: 500 });
    }

    // Step 1: Hash the secret first (Uppercase)
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    // Step 2: Ensure Amount has 2 decimal places (e.g., 30.00)
    const amountFormatted = parseFloat(amount).toFixed(2);

    // Step 3: Create Raw String
    const rawString =
      merchantId + orderId + amountFormatted + currency + hashedSecret;

    // VERIFY THIS IN YOUR VS CODE TERMINAL
    console.log("DEBUG: RAW HASHING STRING ->", rawString);

    const hash = crypto
      .createHash("md5")
      .update(rawString)
      .digest("hex")
      .toUpperCase();

    return NextResponse.json({ hash });
  } catch (err) {
    console.error("DEBUG: Hash generation failed", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
