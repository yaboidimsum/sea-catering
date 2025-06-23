"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { CalendarIcon, Users, DollarSign, TrendingUp, RotateCcw } from "lucide-react"
import { format, startOfMonth, endOfMonth } from "date-fns"

interface AdminMetrics {
  newSubscriptions: number
  monthlyRecurringRevenue: number
  reactivations: number
  subscriptionGrowth: number
  totalUsers: number
  activeSubscriptions: number
}

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [metrics, setMetrics] = useState<AdminMetrics>({
    newSubscriptions: 0,
    monthlyRecurringRevenue: 0,
    reactivations: 0,
    subscriptionGrowth: 0,
    totalUsers: 0,
    activeSubscriptions: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      router.push("/dashboard")
      return
    }

    // Mock admin metrics data
    setMetrics({
      newSubscriptions: 156,
      monthlyRecurringRevenue: 45600000, // IDR
      reactivations: 23,
      subscriptionGrowth: 1247,
      totalUsers: 2834,
      activeSubscriptions: 1891,
    })
  }, [user, router, dateRange])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1)
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Monitor and manage SEA Catering operations</p>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-gray-600 text-gray-300">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="end">
              <div className="p-4">
                <p className="text-white font-semibold mb-2">Select date range</p>
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to })
                    }
                  }}
                  className="rounded-md border-gray-700"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Subscriptions</p>
                  <p className="text-2xl font-bold text-white">{metrics.newSubscriptions}</p>
                  <p className="text-green-400 text-xs">
                    +{formatPercentage(metrics.newSubscriptions, metrics.totalUsers)}% of total users
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Recurring Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(metrics.monthlyRecurringRevenue)}</p>
                  <p className="text-green-400 text-xs">+12.5% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Reactivations</p>
                  <p className="text-2xl font-bold text-white">{metrics.reactivations}</p>
                  <p className="text-blue-400 text-xs">
                    {formatPercentage(metrics.reactivations, metrics.activeSubscriptions)}% of active subs
                  </p>
                </div>
                <RotateCcw className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Subscription Growth</p>
                  <p className="text-2xl font-bold text-white">{metrics.subscriptionGrowth}</p>
                  <p className="text-green-400 text-xs">Total active subscriptions</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subscription Analytics */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Subscription Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="adminGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#adminGrid)" />

                    {/* Chart lines */}
                    <path
                      d="M 20 180 Q 80 160 120 140 T 200 120 T 280 100 T 360 80"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                    />
                    <path
                      d="M 20 160 Q 80 140 120 130 T 200 110 T 280 90 T 360 70"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <path
                      d="M 20 170 Q 80 150 120 135 T 200 115 T 280 95 T 360 75"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />

                    {/* Y-axis labels */}
                    <text x="10" y="180" fill="#9ca3af" fontSize="12">
                      0
                    </text>
                    <text x="10" y="140" fill="#9ca3af" fontSize="12">
                      500
                    </text>
                    <text x="10" y="100" fill="#9ca3af" fontSize="12">
                      1000
                    </text>
                    <text x="10" y="60" fill="#9ca3af" fontSize="12">
                      1500
                    </text>
                  </svg>
                </div>

                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">New Subscriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Active Subscriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Reactivations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Performance */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Plan Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Protein Plan</p>
                    <p className="text-gray-400 text-sm">₹40,000 per meal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">847 subscribers</p>
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      +15.2%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Diet Plan</p>
                    <p className="text-gray-400 text-sm">₹30,000 per meal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">623 subscribers</p>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      +8.7%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Royal Plan</p>
                    <p className="text-gray-400 text-sm">₹60,000 per meal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">421 subscribers</p>
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      +22.1%
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Revenue</span>
                    <span className="text-white font-bold text-lg">{formatPrice(metrics.monthlyRecurringRevenue)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New subscription", user: "john.doe@email.com", plan: "Protein Plan", time: "2 minutes ago" },
                {
                  action: "Subscription paused",
                  user: "jane.smith@email.com",
                  plan: "Diet Plan",
                  time: "15 minutes ago",
                },
                { action: "Plan upgraded", user: "mike.wilson@email.com", plan: "Royal Plan", time: "1 hour ago" },
                { action: "New subscription", user: "sarah.johnson@email.com", plan: "Diet Plan", time: "2 hours ago" },
                {
                  action: "Subscription cancelled",
                  user: "david.brown@email.com",
                  plan: "Protein Plan",
                  time: "3 hours ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {activity.plan}
                    </Badge>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
