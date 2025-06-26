"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/components/auth-provider";
import { CalendarIcon, Pause, X, Settings, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface Subscription {
  id: string;
  plan: string;
  price: number;
  mealTypes: string[];
  deliveryDays: string[];
  status: "active" | "paused" | "cancelled";
  startDate: string;
  nextDelivery: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // Add state for pause date range
  const [pauseDateRange, setPauseDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [subscriptionToPause, setSubscriptionToPause] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
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
    ]);
  }, [user, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Update the pause subscription handler
  const handlePauseSubscription = (subscriptionId: string) => {
    if (pauseDateRange.from && pauseDateRange.to) {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === subscriptionId
            ? {
                ...sub,
                status: "paused" as const,
                pauseFrom: format(pauseDateRange.from!, "yyyy-MM-dd"),
                pauseTo: format(pauseDateRange.to!, "yyyy-MM-dd"),
              }
            : sub
        )
      );
      // Reset the pause date range and subscription to pause
      setPauseDateRange({ from: undefined, to: undefined });
      setSubscriptionToPause(null);
    }
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? { ...sub, status: "cancelled" as const }
          : sub
      )
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="safe-area-inset container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="mb-2 text-balance text-3xl font-bold text-white">
            Welcome back, {user.name}
          </h1>
          <p className="text-pretty text-gray-400">
            Manage your meal subscriptions and preferences
          </p>
        </div>

        {/* Stats Overview with enhanced styling */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="glass-effect interactive-hover border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white">
                    {
                      subscriptions.filter((sub) => sub.status === "active")
                        .length
                    }
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect interactive-hover border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Monthly Spend</p>
                  <p className="text-2xl font-bold text-white">
                    {formatPrice(
                      subscriptions
                        .filter((sub) => sub.status === "active")
                        .reduce(
                          (total, sub) =>
                            total +
                            sub.price *
                              sub.mealTypes.length *
                              sub.deliveryDays.length *
                              4.3,
                          0
                        )
                    )}
                  </p>
                </div>
                <Settings className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect interactive-hover border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Next Delivery</p>
                  <p className="text-2xl font-bold text-white">Feb 5</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions with improved layout */}
        <div className="space-y-6">
          <h2 className="text-balance text-2xl font-bold text-white">
            Your Subscriptions
          </h2>

          {subscriptions.map((subscription, index) => (
            <Card
              key={subscription.id}
              className="glass-effect animate-slide-up border-gray-800 bg-gray-900"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {subscription.plan}
                  </CardTitle>
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
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Plan Details</p>
                      <p className="font-semibold text-white">
                        {formatPrice(subscription.price)} per meal
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Meal Types</p>
                      <div className="mt-1 flex flex-wrap gap-2">
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
                      <p className="text-sm text-gray-400">Delivery Days</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {subscription.deliveryDays.map((day) => (
                          <Badge
                            key={day}
                            variant="outline"
                            className="border-gray-600 text-gray-300 backdrop-blur-sm"
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Monthly Total</p>
                      <p className="font-semibold text-white">
                        {formatPrice(
                          subscription.price *
                            subscription.mealTypes.length *
                            subscription.deliveryDays.length *
                            4.3
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Next Delivery</p>
                      <p className="text-white">
                        {format(
                          new Date(subscription.nextDelivery),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {subscription.status === "active" && (
                        <>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="focus-ring border-gray-600 text-gray-300"
                              >
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="glass-effect w-auto border-gray-800 bg-gray-900 p-4">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Pause Subscription
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Select the date range during which you want to
                                  pause your subscription.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <p className="font-semibold text-white">
                                    From
                                  </p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {pauseDateRange.from ? (
                                          format(pauseDateRange.from, "PPP")
                                        ) : (
                                          <span>Select start date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto border-gray-800 bg-gray-900 p-0">
                                      <Calendar
                                        mode="single"
                                        selected={pauseDateRange.from}
                                        onSelect={(date) =>
                                          setPauseDateRange({
                                            ...pauseDateRange,
                                            from: date,
                                          })
                                        }
                                        className="rounded-md border-gray-700"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <div className="space-y-2">
                                  <p className="font-semibold text-white">To</p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {pauseDateRange.to ? (
                                          format(pauseDateRange.to, "PPP")
                                        ) : (
                                          <span>Select end date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto border-gray-800 bg-gray-900 p-0">
                                      <Calendar
                                        mode="single"
                                        selected={pauseDateRange.to}
                                        onSelect={(date) =>
                                          setPauseDateRange({
                                            ...pauseDateRange,
                                            to: date,
                                          })
                                        }
                                        className="rounded-md border-gray-700"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>

                              <AlertDialogFooter>
                                <AlertDialogCancel className="focus-ring border-gray-700 bg-gray-800 text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    setSubscriptionToPause(subscription.id);
                                    handlePauseSubscription(subscription.id);
                                  }}
                                  disabled={
                                    !pauseDateRange.from || !pauseDateRange.to
                                  }
                                  className="focus-ring"
                                >
                                  Confirm Pause
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="focus-ring border-red-600 text-red-400"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="glass-effect border-gray-800 bg-gray-900">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Cancel Subscription
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Are you sure you want to cancel this
                                  subscription? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="focus-ring border-gray-700 bg-gray-800 text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleCancelSubscription(subscription.id)
                                  }
                                  className="focus-ring bg-red-600 hover:bg-red-700"
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
                          className="focus-ring border-green-600 text-green-400"
                          onClick={() =>
                            setSubscriptions((prev) =>
                              prev.map((sub) =>
                                sub.id === subscription.id
                                  ? { ...sub, status: "active" }
                                  : sub
                              )
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
            <Card className="glass-effect border-gray-800 bg-gray-900">
              <CardContent className="p-8 text-center">
                <p className="mb-4 text-gray-400">
                  You don't have any active subscriptions yet.
                </p>
                <Button asChild className="focus-ring">
                  <a href="/subscription">Start Your First Subscription</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
