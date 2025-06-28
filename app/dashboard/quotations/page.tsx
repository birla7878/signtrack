"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye, Edit, Download, Mail, FileText } from "lucide-react"
import { QuotationDialog } from "@/components/quotation-dialog"
import { useToast } from "@/hooks/use-toast"

interface Quotation {
  id: string
  customer_name: string
  customer_email: string
  items: Array<{
    product_type: string
    quantity: number
    size: string
    material: string
    unit_price: number
  }>
  total_amount: number
  status: "draft" | "sent" | "accepted" | "rejected"
  valid_until: string
  created_at: string
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const { toast } = useToast()

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockQuotations: Quotation[] = [
      {
        id: "QUO-001",
        customer_name: "John Doe",
        customer_email: "john@example.com",
        items: [
          {
            product_type: "Banner",
            quantity: 2,
            size: "4x8 ft",
            material: "Vinyl",
            unit_price: 1250,
          },
        ],
        total_amount: 2500,
        status: "sent",
        valid_until: "2024-02-15",
        created_at: "2024-01-15",
      },
      {
        id: "QUO-002",
        customer_name: "Jane Smith",
        customer_email: "jane@example.com",
        items: [
          {
            product_type: "Business Cards",
            quantity: 1000,
            size: "3.5x2 inch",
            material: "Premium Paper",
            unit_price: 1.5,
          },
        ],
        total_amount: 1500,
        status: "accepted",
        valid_until: "2024-02-20",
        created_at: "2024-01-20",
      },
    ]
    setQuotations(mockQuotations)
  }, [])

  const filteredQuotations = quotations.filter(
    (quotation) =>
      quotation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddQuotation = () => {
    setSelectedQuotation(null)
    setIsDialogOpen(true)
  }

  const handleEditQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation)
    setIsDialogOpen(true)
  }

  const handleViewQuotation = (quotation: Quotation) => {
    toast({
      title: "Quotation Details",
      description: `Viewing quotation ${quotation.id} for ${quotation.customer_name}`,
    })
  }

  const handleDownloadQuotation = (quotation: Quotation) => {
    // Simulate PDF download
    const element = document.createElement("a")
    const file = new Blob(
      [`Quotation ${quotation.id}\nCustomer: ${quotation.customer_name}\nAmount: ₹${quotation.total_amount}`],
      { type: "text/plain" },
    )
    element.href = URL.createObjectURL(file)
    element.download = `quotation-${quotation.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download Started",
      description: `Quotation ${quotation.id} downloaded successfully`,
    })
  }

  const handleSendQuotation = (quotation: Quotation) => {
    // Update status to sent
    setQuotations(quotations.map((q) => (q.id === quotation.id ? { ...q, status: "sent" as any } : q)))

    toast({
      title: "Quotation Sent",
      description: `Quotation ${quotation.id} sent to ${quotation.customer_email}`,
    })
  }

  const handleConvertToOrder = (quotation: Quotation) => {
    toast({
      title: "Converting to Order",
      description: `Quotation ${quotation.id} is being converted to an order`,
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Quotations
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Create and manage quotations for your customers.</p>
        </div>
        <Button
          onClick={handleAddQuotation}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Quotation
        </Button>
      </div>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold text-gray-800">Quotation Management</CardTitle>
          <CardDescription className="text-gray-600">
            Generate, send, and track quotations for potential orders.
          </CardDescription>
          <div className="relative flex-1 max-w-sm mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search quotations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold text-gray-700">Quote ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                <TableHead className="font-semibold text-gray-700">Items</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Valid Until</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation, index) => (
                <TableRow
                  key={quotation.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-medium group-hover:text-orange-600 transition-colors duration-200">
                    {quotation.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{quotation.customer_name}</span>
                      <span className="text-sm text-gray-500">{quotation.customer_email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {quotation.items.map((item, index) => (
                        <span key={index} className="text-sm text-gray-600">
                          {item.quantity}× {item.product_type} ({item.size})
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{quotation.total_amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quotation.status)}>{quotation.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(quotation.valid_until).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewQuotation(quotation)}
                        className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuotation(quotation)}
                        className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadQuotation(quotation)}
                        className="hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all duration-200 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendQuotation(quotation)}
                        className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200 bg-transparent"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <QuotationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        quotation={selectedQuotation}
        onSave={(quotation) => {
          if (selectedQuotation) {
            setQuotations(quotations.map((q) => (q.id === quotation.id ? quotation : q)))
          } else {
            setQuotations([...quotations, { ...quotation, id: `QUO-${Date.now()}` }])
          }
          setIsDialogOpen(false)
        }}
      />
    </div>
  )
}
