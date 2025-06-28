"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Calendar,
  FileText,
  PieChart,
} from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Comprehensive business insights and creative performance metrics.</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="this_month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹4,52,318</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="flex items-center space-x-1 text-xs text-blue-600">
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">New Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="flex items-center space-x-1 text-xs text-purple-600">
              <TrendingUp className="h-3 w-3" />
              <span>+15.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Avg Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹3,667</div>
            <div className="flex items-center space-x-1 text-xs text-red-600">
              <TrendingDown className="h-3 w-3" />
              <span>-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Product Performance
            </CardTitle>
            <CardDescription>Top selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Logo Design", value: 35, color: "bg-blue-500" },
                { name: "Brand Identity", value: 25, color: "bg-green-500" },
                { name: "Web Design", value: 20, color: "bg-purple-500" },
                { name: "Print Design", value: 20, color: "bg-orange-500" },
              ].map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center space-x-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color.replace("bg-", "").replace("-500", "") }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md cursor-pointer group">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-fit group-hover:scale-110 transition-transform duration-200">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              Sales Report
            </CardTitle>
            <CardDescription>Detailed sales analysis and trends</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              variant="outline"
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200 bg-transparent"
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md cursor-pointer group">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit group-hover:scale-110 transition-transform duration-200">
              <Users className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200">
              Customer Report
            </CardTitle>
            <CardDescription>Customer behavior and demographics</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              variant="outline"
              className="w-full group-hover:bg-green-50 group-hover:border-green-200 transition-all duration-200 bg-transparent"
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md cursor-pointer group">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit group-hover:scale-110 transition-transform duration-200">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
              Financial Report
            </CardTitle>
            <CardDescription>Profit, loss and financial insights</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              variant="outline"
              className="w-full group-hover:bg-purple-50 group-hover:border-purple-200 transition-all duration-200 bg-transparent"
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
