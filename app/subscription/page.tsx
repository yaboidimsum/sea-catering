"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calculator, CheckCircle } from "lucide-react"

const mealPlans = [
  { id: "diet", name: "Diet Plan", price: 30000 },
  { id: "protein", name: "Protein Plan", price: 40000 },
  { id: "royal", name: "Royal Plan", price: 60000 },
]

const mealTypes = ["Breakfast", "Lunch", "Dinner"]
const deliveryDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function SubscriptionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plan: "",
    mealTypes: [] as string[],
    deliveryDays: [] as string[],
    allergies: "",
  })

  const [totalPrice, setTotalPrice] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate total price whenever form data changes
  useEffect(() => {
    if (formData.plan && formData.mealTypes.length > 0 && formData.deliveryDays.length > 0) {
      const selectedPlan = mealPlans.find((plan) => plan.id === formData.plan)
      if (selectedPlan) {
        const price = selectedPlan.price * formData.mealTypes.length * formData.deliveryDays.length * 4.3
        setTotalPrice(Math.round(price))
      }
    } else {
      setTotalPrice(0)
    }
  }, [formData.plan, formData.mealTypes, formData.deliveryDays])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Full name is required."
    }

    const phoneRegex = /^08[0-9]{8,11}$/
    if (!formData.phone) {
      newErrors.phone = "Phone number is required."
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid Indonesian phone number format."
    } else if (formData.phone.length < 10 || formData.phone.length > 13) {
      newErrors.phone = "Phone number must be between 10-13 digits."
    }

    if (!formData.plan) {
      newErrors.plan = "Please select a meal plan."
    }

    if (formData.mealTypes.length === 0) {
      newErrors.mealTypes = "At least one meal type must be selected."
    }

    if (formData.deliveryDays.length === 0) {
      newErrors.deliveryDays = "At least one delivery day must be selected."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", { ...formData, totalPrice })
      // Here you would typically send the data to your API
      alert("Subscription submitted successfully!")
    }
  }

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        mealTypes: [...prev.mealTypes, mealType],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        mealTypes: prev.mealTypes.filter((type) => type !== mealType),
      }))
    }
  }

  const handleDeliveryDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        deliveryDays: [...prev.deliveryDays, day],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        deliveryDays: prev.deliveryDays.filter((d) => d !== day),
      }))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Subscribe to SEA Catering</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start your healthy meal journey today. Customize your plan to fit your lifestyle.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Subscription Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Active Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08123456789"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose Your Plan *</h3>
                  <RadioGroup
                    value={formData.plan}
                    onValueChange={(value) => setFormData({ ...formData, plan: value })}
                  >
                    {mealPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-primary font-semibold">{formatPrice(plan.price)}/meal</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.plan && <p className="text-red-500 text-sm">{errors.plan}</p>}
                </div>

                {/* Meal Types */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Meal Types *</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {mealTypes.map((mealType) => (
                      <div key={mealType} className="flex items-center space-x-2">
                        <Checkbox
                          id={mealType}
                          checked={formData.mealTypes.includes(mealType)}
                          onCheckedChange={(checked) => handleMealTypeChange(mealType, checked as boolean)}
                        />
                        <Label htmlFor={mealType} className="cursor-pointer">
                          {mealType}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.mealTypes && <p className="text-red-500 text-sm">{errors.mealTypes}</p>}
                </div>

                {/* Delivery Days */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Days *</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {deliveryDays.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.deliveryDays.includes(day)}
                          onCheckedChange={(checked) => handleDeliveryDayChange(day, checked as boolean)}
                        />
                        <Label htmlFor={day} className="cursor-pointer text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.deliveryDays && <p className="text-red-500 text-sm">{errors.deliveryDays}</p>}
                </div>

                {/* Allergies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Allergies & Dietary Restrictions</h3>
                  <Textarea
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="Please list any allergies or dietary restrictions..."
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Subscribe Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Price Calculator */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Price Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.plan && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Selected Plan:</span>
                    <Badge variant="secondary">{mealPlans.find((p) => p.id === formData.plan)?.name}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per meal:</span>
                    <span className="font-semibold">
                      {formatPrice(mealPlans.find((p) => p.id === formData.plan)?.price || 0)}
                    </span>
                  </div>
                </div>
              )}

              {formData.mealTypes.length > 0 && (
                <div className="flex justify-between">
                  <span>Meal types:</span>
                  <span className="font-semibold">{formData.mealTypes.length}</span>
                </div>
              )}

              {formData.deliveryDays.length > 0 && (
                <div className="flex justify-between">
                  <span>Delivery days:</span>
                  <span className="font-semibold">{formData.deliveryDays.length}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Weeks per month:</span>
                <span className="font-semibold">4.3</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Monthly:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>

              {totalPrice > 0 && (
                <div className="text-sm text-muted-foreground">
                  <p>Formula: Plan Price × Meal Types × Delivery Days × 4.3</p>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Free delivery included
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  24/7 customer support
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Flexible scheduling
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
