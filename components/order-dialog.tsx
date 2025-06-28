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

interface Order {
  id?: string
  customer_name: string
  product_type: string
  quantity: number
  size: string
  material: string
  status: "pending" | "in_production" | "completed" | "delivered"
  total_amount: number
  advance_paid: number
  created_at?: string
  delivery_date: string
}

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onSave: (order: Order) => void
}

export function OrderDialog({ open, onOpenChange, order, onSave }: OrderDialogProps) {
  const [formData, setFormData] = useState<Order>({
    customer_name: "",
    product_type: "",
    quantity: 1,
    size: "",
    material: "",
    status: "pending",
    total_amount: 0,
    advance_paid: 0,
    delivery_date: "",
  })

  useEffect(() => {
    if (order) {
      setFormData(order)
    } else {
      setFormData({
        customer_name: "",
        product_type: "",
        quantity: 1,
        size: "",
        material: "",
        status: "pending",
        total_amount: 0,
        advance_paid: 0,
        delivery_date: "",
      })
    }
  }, [order])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      created_at: order?.created_at || new Date().toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Order" : "Create New Order"}</DialogTitle>
          <DialogDescription>
            {order ? "Update order information." : "Create a new order for your customer."}
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
                <Label htmlFor="product_type">Product Type</Label>
                <Select
                  value={formData.product_type}
                  onValueChange={(value) => setFormData({ ...formData, product_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 4x8 ft"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Select
                  value={formData.material}
                  onValueChange={(value) => setFormData({ ...formData, material: value })}
                >
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total_amount">Total Amount (₹)</Label>
                <Input
                  id="total_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance_paid">Advance Paid (₹)</Label>
                <Input
                  id="advance_paid"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.advance_paid}
                  onChange={(e) => setFormData({ ...formData, advance_paid: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "pending" | "in_production" | "completed" | "delivered") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_production">In Production</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery_date">Delivery Date</Label>
                <Input
                  id="delivery_date"
                  type="date"
                  value={formData.delivery_date}
                  onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
