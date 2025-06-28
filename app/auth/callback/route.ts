import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient({
      cookies,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to dashboard after successful verification
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // If there's an error or no code, redirect to login with error
  return NextResponse.redirect(new URL("/login?error=verification_failed", request.url))
}
