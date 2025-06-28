"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Download, CreditCard, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Payment {
  id: string
  order_id: string
  customer_name: string
  amount: number
  payment_method: "cash" | "card" | "upi" | "bank_transfer" | "cheque"
  payment_date: string
  status: "completed" | "pending" | "failed"
  notes?: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const handleViewPayment = (payment: Payment) => {
    toast({
      title: "Payment Details",
      description: `Payment ${payment.id} - ₹${payment.amount.toLocaleString()} via ${payment.payment_method}`,
    })
  }

  const handleDownloadReceipt = (payment: Payment) => {
    // Simulate receipt download
    const element = document.createElement("a")
    const file = new Blob(
      [
        `PAYMENT RECEIPT\n` +
          `Payment ID: ${payment.id}\n` +
          `Order ID: ${payment.order_id}\n` +
          `Customer: ${payment.customer_name}\n` +
          `Amount: ₹${payment.amount}\n` +
          `Method: ${payment.payment_method}\n` +
          `Date: ${payment.payment_date}\n` +
          `Status: ${payment.status}`,
      ],
      { type: "text/plain" },
    )
    element.href = URL.createObjectURL(file)
    element.download = `receipt-${payment.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Receipt Downloaded",
      description: `Receipt for payment ${payment.id} downloaded successfully`,
    })
  }

  const handleSendReceipt = (payment: Payment) => {
    toast({
      title: "Receipt Sent",
      description: `Receipt sent to ${payment.customer_name} via email`,
    })
  }

  const handleRefundPayment = (payment: Payment) => {
    toast({
      title: "Refund Initiated",
      description: `Refund of ₹${payment.amount.toLocaleString()} initiated for ${payment.customer_name}`,
      variant: "destructive",
    })
  }

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: "PAY-001",
        order_id: "ORD-001",
        customer_name: "John Doe",
        amount: 1000,
        payment_method: "upi",
        payment_date: "2024-01-15",
        status: "completed",
        notes: "Advance payment for banner order",
      },
      {
        id: "PAY-002",
        order_id: "ORD-002",
        customer_name: "Jane Smith",
        amount: 1500,
        payment_method: "card",
        payment_date: "2024-01-20",
        status: "completed",
        notes: "Full payment for business cards",
      },
      {
        id: "PAY-003",
        order_id: "ORD-003",
        customer_name: "Mike Johnson",
        amount: 750,
        payment_method: "cash",
        payment_date: "2024-01-22",
        status: "pending",
        notes: "Partial payment for poster",
      },
    ]
    setPayments(mockPayments)
  }, [])

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.order_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "cash":
        return "bg-green-100 text-green-800"
      case "card":
        return "bg-blue-100 text-blue-800"
      case "upi":
        return "bg-purple-100 text-purple-800"
      case "bank_transfer":
        return "bg-indigo-100 text-indigo-800"
      case "cheque":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingPayments = filteredPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Payments
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Track and manage all payment transactions.</p>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Received</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{completedPayments.toLocaleString()}</div>
            <p className="text-xs text-green-600">Completed payments</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-yellow-600">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{filteredPayments.length}</div>
            <p className="text-xs text-blue-600">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold text-gray-800">Payment History</CardTitle>
          <CardDescription className="text-gray-600">Complete record of all payment transactions.</CardDescription>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-200 focus:border-pink-500 focus:ring-pink-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold text-gray-700">Payment ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Method</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment, index) => (
                <TableRow
                  key={payment.id}
                  className="hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-medium group-hover:text-pink-600 transition-colors duration-200">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">{payment.order_id}</TableCell>
                  <TableCell className="text-gray-600">{payment.customer_name}</TableCell>
                  <TableCell className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodColor(payment.payment_method)}>
                      {payment.payment_method.replace("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPayment(payment)}
                        className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment)}
                        className="hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all duration-200 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
