import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "LED Signboard",
    amount: "₹25,000",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Acrylic Letters",
    amount: "₹45,000",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Flex Banner",
    amount: "₹15,000",
    status: "Review",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "Steel Letters",
    amount: "₹35,000",
    status: "Delivered",
    statusColor: "bg-purple-100 text-purple-800",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-6">
      {recentOrders.map((order, index) => (
        <div
          key={order.id}
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-102 group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Avatar className="h-10 w-10 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200">
            <AvatarImage src={`/placeholder-user.jpg`} alt="Avatar" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold">
              {order.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none group-hover:text-blue-600 transition-colors duration-200">
              {order.customer}
            </p>
            <p className="text-sm text-muted-foreground">{order.product}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="font-bold text-green-600">{order.amount}</div>
            <Badge className={`${order.statusColor} text-xs`}>{order.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
