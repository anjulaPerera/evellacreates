import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { orderId, amount, currency } = await request.json();

    const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    if (!merchantSecret) {
      return NextResponse.json(
        { error: "Secret missing in environment" },
        { status: 500 },
      );
    }

    // Format: UpperCase(Md5(MerchantID + OrderID + Amount + Currency + UpperCase(Md5(MerchantSecret))))
    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();
    const amountFormatted = parseFloat(amount).toFixed(2);

    const rawString =
      merchantId + orderId + amountFormatted + currency + hashedSecret;
    const hash = crypto
      .createHash("md5")
      .update(rawString)
      .digest("hex")
      .toUpperCase();

    return NextResponse.json({ hash });
  } catch (err) {
    return NextResponse.json(
      { error: "Hash generation failed" },
      { status: 500 },
    );
  }
}
