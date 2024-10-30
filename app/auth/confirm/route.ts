import { type EmailOtpType } from "@supabase/supabase-js";

import { NextRequest, NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  // Get the base URL from the request
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  // Create the full redirect URL
  const redirectTo = new URL(next, baseURL);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // For error page, also use the full URL
  const errorRedirectTo = new URL("/auth/auth-code-error", baseURL);
  return NextResponse.redirect(errorRedirectTo);
}
