import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const userId = user.id

    // Fetch all user data
    const [
      { data: customers },
      { data: orders },
      { data: quotations },
      { data: payments },
      { data: leads },
      { data: jobCards },
    ] = await Promise.all([
      supabase.from("customers").select("*").eq("user_id", userId),
      supabase
        .from("orders")
        .select("*")
        .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
      supabase
        .from("quotations")
        .select("*")
        .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
      supabase
        .from("payments")
        .select("*")
        .in(
          "order_id",
          supabase
            .from("orders")
            .select("id")
            .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
        ),
      supabase
        .from("leads")
        .select("*")
        .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
      supabase
        .from("job_cards")
        .select("*")
        .in(
          "order_id",
          supabase
            .from("orders")
            .select("id")
            .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
        ),
    ])

    // Prepare export data
    const exportData = {
      export_info: {
        exported_at: new Date().toISOString(),
        user_id: userId,
        user_email: user.email,
        total_records: {
          customers: customers?.length || 0,
          orders: orders?.length || 0,
          quotations: quotations?.length || 0,
          payments: payments?.length || 0,
          leads: leads?.length || 0,
          job_cards: jobCards?.length || 0,
        },
      },
      user_profile: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        user_metadata: user.user_metadata,
      },
      customers: customers || [],
      orders: orders || [],
      quotations: quotations || [],
      payments: payments || [],
      leads: leads || [],
      job_cards: jobCards || [],
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `printcrm-data-export-${timestamp}.json`

    // Return JSON file as download
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error exporting data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
