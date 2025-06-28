"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Package, FileText, CreditCard, BarChart3, Settings, Menu, X, Zap } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-blue-600", bgColor: "bg-blue-50" },
  { name: "Customers", href: "/dashboard/customers", icon: Users, color: "text-green-600", bgColor: "bg-green-50" },
  { name: "Orders", href: "/dashboard/orders", icon: Package, color: "text-purple-600", bgColor: "bg-purple-50" },
  {
    name: "Quotations",
    href: "/dashboard/quotations",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard, color: "text-pink-600", bgColor: "bg-pink-50" },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3, color: "text-indigo-600", bgColor: "bg-indigo-50" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, color: "text-gray-600", bgColor: "bg-gray-50" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:bg-white hover:scale-105 transition-all duration-200"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar - Fixed positioning */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out",
          // Mobile: slide in/out
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-slate-700/50 bg-gradient-to-r from-blue-600 to-purple-600 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SignTrack</span>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto sidebar-scroll">
          <nav className="mt-8 px-4 pb-4">
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105",
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                          : "text-slate-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg mr-3 transition-all duration-200",
                          isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="truncate">{item.name}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="sticky bottom-0 p-4 bg-gradient-to-t from-slate-900 to-transparent">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">SignTrack Pro</p>
                <p className="text-slate-400 text-xs">Business Edition</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
