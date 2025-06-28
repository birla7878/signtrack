import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Package, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { RecentOrders } from "@/components/recent-orders"
import { RevenueChart } from "@/components/revenue-chart"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-blue-100 text-lg">Welcome back! Here's what's happening with your signage business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹4,52,318</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Active Customers</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">2,350</div>
            <div className="flex items-center space-x-1 text-xs text-blue-600">
              <TrendingUp className="h-3 w-3" />
              <span>+180.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Orders</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">12,234</div>
            <div className="flex items-center space-x-1 text-xs text-purple-600">
              <TrendingUp className="h-3 w-3" />
              <span>+19% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Pending Payments</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">₹85,730</div>
            <div className="flex items-center space-x-1 text-xs text-orange-600">
              <TrendingDown className="h-3 w-3" />
              <span>12 invoices pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revenue Overview
            </CardTitle>
            <CardDescription>Monthly revenue trends for your signage business</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Recent Orders
            </CardTitle>
            <CardDescription>You have 265 orders this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
