import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE() {
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

    // Delete user data in the correct order (due to foreign key constraints)

    // 1. Delete payments first
    const { error: paymentsError } = await supabase
      .from("payments")
      .delete()
      .in(
        "order_id",
        supabase
          .from("orders")
          .select("id")
          .eq("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
      )

    if (paymentsError) {
      console.error("Error deleting payments:", paymentsError)
    }

    // 2. Delete job cards
    const { error: jobCardsError } = await supabase
      .from("job_cards")
      .delete()
      .in(
        "order_id",
        supabase
          .from("orders")
          .select("id")
          .eq("customer_id", supabase.from("customers").select("id").eq("user_id", userId)),
      )

    if (jobCardsError) {
      console.error("Error deleting job cards:", jobCardsError)
    }

    // 3. Delete orders
    const { error: ordersError } = await supabase
      .from("orders")
      .delete()
      .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId))

    if (ordersError) {
      console.error("Error deleting orders:", ordersError)
    }

    // 4. Delete quotations
    const { error: quotationsError } = await supabase
      .from("quotations")
      .delete()
      .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId))

    if (quotationsError) {
      console.error("Error deleting quotations:", quotationsError)
    }

    // 5. Delete leads
    const { error: leadsError } = await supabase
      .from("leads")
      .delete()
      .in("customer_id", supabase.from("customers").select("id").eq("user_id", userId))

    if (leadsError) {
      console.error("Error deleting leads:", leadsError)
    }

    // 6. Delete customers
    const { error: customersError } = await supabase.from("customers").delete().eq("user_id", userId)

    if (customersError) {
      console.error("Error deleting customers:", customersError)
    }

    // 7. Finally, delete the user account from Supabase Auth
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(userId)

    if (deleteUserError) {
      console.error("Error deleting user account:", deleteUserError)
      return NextResponse.json({ error: "Failed to delete user account" }, { status: 500 })
    }

    // Sign out the user
    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message: "Account and all associated data have been permanently deleted",
    })
  } catch (error) {
    console.error("Error in delete account:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
