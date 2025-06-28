"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, FileText, Package } from "lucide-react"
import { OrderDialog } from "@/components/order-dialog"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  customer_name: string
  product_type: string
  quantity: number
  size: string
  material: string
  status: "pending" | "in_production" | "completed" | "delivered"
  total_amount: number
  advance_paid: number
  created_at: string
  delivery_date: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("signtrack-orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("signtrack-orders", JSON.stringify(orders))
  }, [orders])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_production":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddOrder = () => {
    setSelectedOrder(null)
    setIsDialogOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    toast({
      title: "Order Details",
      description: `Viewing details for ${order.id} - ${order.product_type}`,
    })
  }

  const handleGenerateJobCard = (order: Order) => {
    toast({
      title: "Job Card Generated",
      description: `Job card created for order ${order.id}`,
    })
  }

  const handleSaveOrder = (order: Order) => {
    if (selectedOrder) {
      setOrders(orders.map((o) => (o.id === order.id ? order : o)))
      toast({
        title: "Order Updated",
        description: "Order has been updated successfully.",
      })
    } else {
      const newOrder = { ...order, id: `ORD-${Date.now()}`, created_at: new Date().toISOString() }
      setOrders([...orders, newOrder])
      toast({
        title: "Order Created",
        description: "New order has been created successfully.",
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage all your design projects and creative work.</p>
        </div>
        <Button
          onClick={handleAddOrder}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold text-gray-800">Project Management</CardTitle>
          <CardDescription className="text-gray-600">
            Track and manage all your design projects from concept to delivery.
          </CardDescription>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_production">In Production</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">Start by creating your first order.</p>
              <Button
                onClick={handleAddOrder}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Order
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Product</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Balance</TableHead>
                  <TableHead className="font-semibold text-gray-700">Delivery</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium group-hover:text-purple-600 transition-colors duration-200">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-gray-600">{order.customer_name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{order.product_type}</span>
                        <span className="text-sm text-gray-500">
                          {order.quantity} × {order.size} ({order.material})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₹{order.total_amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          order.total_amount - order.advance_paid > 0
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        ₹{(order.total_amount - order.advance_paid).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(order.delivery_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 bg-transparent"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditOrder(order)}
                          className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateJobCard(order)}
                          className="hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all duration-200 bg-transparent"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <OrderDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} order={selectedOrder} onSave={handleSaveOrder} />
    </div>
  )
}
