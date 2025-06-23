"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/components/auth-provider"
import { CalendarIcon, Pause, X, Settings, TrendingUp } from "lucide-react"
import { format } from "date-fns"

interface Subscription {
  id: string
  plan: string
  price: number
  mealTypes: string[]
  deliveryDays: string[]
  status: "active" | "paused" | "cancelled"
  startDate: string
  nextDelivery: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [pauseDate, setPauseDate] = useState<Date>()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Mock subscription data
    setSubscriptions([
      {
        id: "1",
        plan: "Protein Plan",
        price: 40000,
        mealTypes: ["Breakfast", "Lunch"],
        deliveryDays: ["Monday", "Wednesday", "Friday"],
        status: "active",
        startDate: "2024-01-15",
        nextDelivery: "2024-02-05",
      },
      {
        id: "2",
        plan: "Diet Plan",
        price: 30000,
        mealTypes: ["Dinner"],
        deliveryDays: ["Tuesday", "Thursday"],
        status: "paused",
        startDate: "2024-01-01",
        nextDelivery: "2024-02-10",
      },
    ])
  }, [user, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handlePauseSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === subscriptionId ? { ...sub, status: "paused" as const } : sub)),
    )
  }

  const handleCancelSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === subscriptionId ? { ...sub, status: "cancelled" as const } : sub)),
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 safe-area-inset">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2 text-balance">Welcome back, {user.name}</h1>
          <p className="text-gray-400 text-pretty">Manage your meal subscriptions and preferences</p>
        </div>

        {/* Stats Overview with enhanced styling */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white">
                    {subscriptions.filter((sub) => sub.status === "active").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Spend</p>
                  <p className="text-2xl font-bold text-white">
                    {formatPrice(
                      subscriptions
                        .filter((sub) => sub.status === "active")
                        .reduce(
                          (total, sub) => total + sub.price * sub.mealTypes.length * sub.deliveryDays.length * 4.3,
                          0,
                        ),
                    )}
                  </p>
                </div>
                <Settings className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Next Delivery</p>
                  <p className="text-2xl font-bold text-white">Feb 5</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions with improved layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-balance">Your Subscriptions</h2>

          {subscriptions.map((subscription, index) => (
            <Card
              key={subscription.id}
              className="bg-gray-900 border-gray-800 glass-effect animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{subscription.plan}</CardTitle>
                  <Badge
                    variant={
                      subscription.status === "active"
                        ? "default"
                        : subscription.status === "paused"
                          ? "secondary"
                          : "destructive"
                    }
                    className="backdrop-blur-sm"
                  >
                    {subscription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Plan Details</p>
                      <p className="text-white font-semibold">{formatPrice(subscription.price)} per meal</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Meal Types</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {subscription.mealTypes.map((type) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="border-gray-600 text-gray-300 backdrop-blur-sm"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Delivery Days</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {subscription.deliveryDays.map((day) => (
                          <Badge key={day} variant="outline" className="border-gray-600 text-gray-300 backdrop-blur-sm">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Total</p>
                      <p className="text-white font-semibold">
                        {formatPrice(
                          subscription.price * subscription.mealTypes.length * subscription.deliveryDays.length * 4.3,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Next Delivery</p>
                      <p className="text-white">{format(new Date(subscription.nextDelivery), "MMM dd, yyyy")}</p>
                    </div>

                    <div className="flex gap-2">
                      {subscription.status === "active" && (
                        <>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 focus-ring">
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800 glass-effect">
                              <div className="p-4">
                                <p className="text-white font-semibold mb-2">Select pause date</p>
                                <Calendar
                                  mode="single"
                                  selected={pauseDate}
                                  onSelect={setPauseDate}
                                  className="rounded-md border-gray-700"
                                />
                                <div className="flex gap-2 mt-4">
                                  <Button
                                    size="sm"
                                    onClick={() => handlePauseSubscription(subscription.id)}
                                    disabled={!pauseDate}
                                    className="focus-ring"
                                  >
                                    Confirm Pause
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="border-red-600 text-red-400 focus-ring">
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-gray-800 glass-effect">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Cancel Subscription</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Are you sure you want to cancel this subscription? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white focus-ring">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleCancelSubscription(subscription.id)}
                                  className="bg-red-600 hover:bg-red-700 focus-ring"
                                >
                                  Cancel Subscription
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}

                      {subscription.status === "paused" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-400 focus-ring"
                          onClick={() =>
                            setSubscriptions((prev) =>
                              prev.map((sub) => (sub.id === subscription.id ? { ...sub, status: "active" } : sub)),
                            )
                          }
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {subscriptions.length === 0 && (
            <Card className="bg-gray-900 border-gray-800 glass-effect">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 mb-4">You don't have any active subscriptions yet.</p>
                <Button asChild className="focus-ring">
                  <a href="/subscription">Start Your First Subscription</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
