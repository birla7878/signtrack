"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, LogOut, Settings, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const router = useRouter()
  const { toast } = useToast()
  const userName = "Demo User"
  const userEmail = "demo@signtrack.com"

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    })
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-4 md:px-6 py-4 sticky top-0 z-20 w-full">
      <div className="flex items-center justify-between max-w-full">
        <div className="flex items-center space-x-4 md:space-x-6 flex-1 min-w-0">
          <div className="hidden md:block min-w-0 flex-1">
            <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-sm text-gray-500 truncate">Let's manage your signage business today</p>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 min-w-[250px] max-w-[350px] hover:bg-gray-100 transition-colors duration-200">
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input
              placeholder="Search orders, customers..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Notifications */}
          <Button
            variant="outline"
            size="sm"
            className="relative hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all duration-200 group bg-transparent"
            onClick={() => toast({ title: "Notifications", description: "No new notifications" })}
          >
            <Bell className="h-4 w-4 group-hover:text-blue-600 transition-colors duration-200" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-200"
              >
                <Avatar className="h-10 w-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white/95 backdrop-blur-md border-gray-200/50"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-blue-50 transition-colors duration-200"
                onClick={() => toast({ title: "Profile", description: "Profile page coming soon!" })}
              >
                <User className="mr-2 h-4 w-4 text-blue-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-purple-50 transition-colors duration-200"
                onClick={() => router.push("/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4 text-purple-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="hover:bg-red-50 text-red-600 transition-colors duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
