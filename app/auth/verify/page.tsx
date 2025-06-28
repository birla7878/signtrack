"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  })

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          setStatus("error")
          setMessage("Verification failed. Please try again.")
        } else if (user) {
          setStatus("success")
          setMessage("Your email has been verified successfully!")
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          setStatus("error")
          setMessage("No user found. Please sign up again.")
        }
      } catch (err) {
        setStatus("error")
        setMessage("An unexpected error occurred.")
      }
    }

    verifyUser()
  }, [supabase.auth, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === "loading" && <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />}
            {status === "success" && <CheckCircle className="h-12 w-12 text-green-600" />}
            {status === "error" && <XCircle className="h-12 w-12 text-red-600" />}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verifying..."}
            {status === "success" && "Verification Successful!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "success" && (
            <p className="text-sm text-muted-foreground mb-4">Redirecting to dashboard in 3 seconds...</p>
          )}
          {status === "error" && (
            <Button onClick={() => router.push("/login")} className="w-full">
              Back to Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
