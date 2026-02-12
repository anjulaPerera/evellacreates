import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with Service Role Key (to bypass RLS for background updates)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract data sent by PayHere
    const merchant_id = formData.get("merchant_id");
    const order_id = formData.get("order_id") as string;
    const payhere_amount = formData.get("payhere_amount");
    const payhere_currency = formData.get("payhere_currency");
    const status_code = formData.get("status_code"); // 2 is success
    const md5sig = formData.get("md5sig"); // Used for security verification

    // 1. Basic Verification
    if (merchant_id !== "1233959") {
      return NextResponse.json(
        { error: "Invalid Merchant ID" },
        { status: 400 },
      );
    }

    // 2. If payment is successful (status_code 2)
    if (status_code === "2") {
      // Update the order in your Supabase database
      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order_id.replace("EV-", "")); // Remove the prefix if your DB ID is UUID

      if (error) {
        console.error("Supabase Update Error:", error);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 },
        );
      }

      console.log(`Order ${order_id} marked as PAID.`);
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Status not successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
