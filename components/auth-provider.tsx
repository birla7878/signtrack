"use client"

import type React from "react"
import { createContext, useContext } from "react"

type AuthContextType = {
  user: any | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: {
    id: "demo-user",
    email: "demo@signtrack.com",
    user_metadata: { full_name: "Demo User" },
  },
  loading: false,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const mockUser = {
    id: "demo-user",
    email: "demo@signtrack.com",
    user_metadata: { full_name: "Demo User" },
  }

  return <AuthContext.Provider value={{ user: mockUser, loading: false }}>{children}</AuthContext.Provider>
}
