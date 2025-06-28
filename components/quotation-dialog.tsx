"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Trash2 } from "lucide-react"

interface QuotationItem {
  product_type: string
  quantity: number
  size: string
  material: string
  unit_price: number
}

interface Quotation {
  id?: string
  customer_name: string
  customer_email: string
  items: QuotationItem[]
  total_amount: number
  status: "draft" | "sent" | "accepted" | "rejected"
  valid_until: string
  created_at?: string
}

interface QuotationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quotation: Quotation | null
  onSave: (quotation: Quotation) => void
}

export function QuotationDialog({ open, onOpenChange, quotation, onSave }: QuotationDialogProps) {
  const [formData, setFormData] = useState<Quotation>({
    customer_name: "",
    customer_email: "",
    items: [
      {
        product_type: "",
        quantity: 1,
        size: "",
        material: "",
        unit_price: 0,
      },
    ],
    total_amount: 0,
    status: "draft",
    valid_until: "",
  })

  useEffect(() => {
    if (quotation) {
      setFormData(quotation)
    } else {
      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      setFormData({
        customer_name: "",
        customer_email: "",
        items: [
          {
            product_type: "",
            quantity: 1,
            size: "",
            material: "",
            unit_price: 0,
          },
        ],
        total_amount: 0,
        status: "draft",
        valid_until: nextMonth.toISOString().split("T")[0],
      })
    }
  }, [quotation])

  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
    setFormData((prev) => ({ ...prev, total_amount: total }))
  }, [formData.items])

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          product_type: "",
          quantity: 1,
          size: "",
          material: "",
          unit_price: 0,
        },
      ],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, field: keyof QuotationItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      created_at: quotation?.created_at || new Date().toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{quotation ? "Edit Quotation" : "Create New Quotation"}</DialogTitle>
          <DialogDescription>
            {quotation ? "Update quotation details." : "Create a new quotation for your customer."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_email">Customer Email</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Quotation Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Item {index + 1}</span>
                    {formData.items.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Type</Label>
                      <Select
                        value={item.product_type}
                        onValueChange={(value) => updateItem(index, "product_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Flex Printing">Flex Printing</SelectItem>
                          <SelectItem value="Flex Board">Flex Board</SelectItem>
                          <SelectItem value="Glowsign">Glowsign</SelectItem>
                          <SelectItem value="ACP Board">ACP Board</SelectItem>
                          <SelectItem value="Acrylic Letters">Acrylic Letters</SelectItem>
                          <SelectItem value="Steel Letters">Steel Letters</SelectItem>
                          <SelectItem value="Neon Signs">Neon Signs</SelectItem>
                          <SelectItem value="House Name Plate">House Name Plate</SelectItem>
                          <SelectItem value="Banner">Banner</SelectItem>
                          <SelectItem value="Business Cards">Business Cards</SelectItem>
                          <SelectItem value="Brochure">Brochure</SelectItem>
                          <SelectItem value="Poster">Poster</SelectItem>
                          <SelectItem value="Signage">Signage</SelectItem>
                          <SelectItem value="Sticker">Sticker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Material</Label>
                      <Select value={item.material} onValueChange={(value) => updateItem(index, "material", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vinyl">Vinyl</SelectItem>
                          <SelectItem value="Nonlit Flex">Nonlit Flex</SelectItem>
                          <SelectItem value="Backlit Flex">Backlit Flex</SelectItem>
                          <SelectItem value="ACP Sheet">ACP Sheet</SelectItem>
                          <SelectItem value="Acrylic Sheet">Acrylic Sheet</SelectItem>
                          <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                          <SelectItem value="Canvas">Canvas</SelectItem>
                          <SelectItem value="Paper">Paper</SelectItem>
                          <SelectItem value="Premium Paper">Premium Paper</SelectItem>
                          <SelectItem value="Plastic">Plastic</SelectItem>
                          <SelectItem value="Metal">Metal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <Input
                        value={item.size}
                        onChange={(e) => updateItem(index, "size", e.target.value)}
                        placeholder="e.g., 4x8 ft"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Price (₹)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, "unit_price", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total</Label>
                      <Input value={`₹${(item.quantity * item.unit_price).toFixed(2)}`} disabled />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "sent" | "accepted" | "rejected") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valid_until">Valid Until</Label>
                <Input
                  id="valid_until"
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Total Amount</Label>
                <Input value={`₹${formData.total_amount.toFixed(2)}`} disabled className="font-bold" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Quotation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
