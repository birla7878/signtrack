"use client"

import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"

const data = [
  { name: "Jan", total: 24000 },
  { name: "Feb", total: 13980 },
  { name: "Mar", total: 98000 },
  { name: "Apr", total: 39080 },
  { name: "May", total: 48000 },
  { name: "Jun", total: 38000 },
  { name: "Jul", total: 43000 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
          labelStyle={{ color: "#374151" }}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#3B82F6"
          strokeWidth={3}
          fill="url(#colorRevenue)"
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2, fill: "#ffffff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
