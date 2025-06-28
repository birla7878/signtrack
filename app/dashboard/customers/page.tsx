"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Phone, Mail, Users, Eye } from "lucide-react"
import { CustomerDialog } from "@/components/customer-dialog"
import { useToast } from "@/hooks/use-toast"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  status: "active" | "inactive"
  created_at: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const { toast } = useToast()

  // Load customers from localStorage
  useEffect(() => {
    const savedCustomers = localStorage.getItem("signtrack-customers")
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers))
    }
  }, [])

  // Save customers to localStorage
  useEffect(() => {
    localStorage.setItem("signtrack-customers", JSON.stringify(customers))
  }, [customers])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setIsDialogOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id))
    toast({
      title: "Customer Deleted",
      description: "Customer has been removed successfully.",
    })
  }

  const handleViewCustomer = (customer: Customer) => {
    toast({
      title: "Customer Details",
      description: `Viewing profile for ${customer.name} - ${customer.company}`,
    })
  }

  const handleSaveCustomer = (customer: Customer) => {
    if (selectedCustomer) {
      setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)))
      toast({
        title: "Customer Updated",
        description: "Customer information has been updated successfully.",
      })
    } else {
      const newCustomer = {
        ...customer,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      }
      setCustomers([...customers, newCustomer])
      toast({
        title: "Customer Added",
        description: "New customer has been added successfully.",
      })
    }
    setIsDialogOpen(false)
  }

  const importedCount = customers.filter((c) => c.source === "imported").length
  const manualCount = customers.filter((c) => c.source === "manual").length

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Customers
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your client database and contact information.</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleAddCustomer}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold text-gray-800">Customer List</CardTitle>
          <CardDescription className="text-gray-600">
            A list of all your clients including their contact details and status.
          </CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
              <p className="text-gray-500 mb-4">
                Get started by adding customers manually or importing local businesses.
              </p>
              <div className="flex justify-center space-x-2">
                <Button
                  onClick={handleAddCustomer}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-700">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Company</TableHead>
                  <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-green-50/50 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell className="font-medium group-hover:text-blue-600 transition-colors duration-200">
                      <div className="flex flex-col">
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.company}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {customer.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 text-blue-500" />
                            <span className="text-sm text-gray-600">{customer.email}</span>
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-green-500" />
                            <span className="text-sm text-gray-600">{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={customer.status === "active" ? "default" : "secondary"}
                        className={
                          customer.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCustomer(customer)}
                          className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 bg-transparent"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCustomer(customer)}
                          className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
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

      <CustomerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />
    </div>
  )
}
