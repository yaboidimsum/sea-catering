"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Leaf, Zap, Crown, Star } from "lucide-react"

const mealPlans = [
  {
    id: 1,
    name: "Diet Plan",
    price: 30000,
    description: "Perfect for weight management and healthy living",
    icon: Leaf,
    features: [
      "Low-calorie meals (300-400 cal)",
      "High fiber content",
      "Portion-controlled servings",
      "Fresh vegetables and lean proteins",
    ],
    details: {
      calories: "300-400 per meal",
      protein: "25-30g",
      carbs: "30-40g",
      fat: "10-15g",
      fiber: "8-12g",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Protein Plan",
    price: 40000,
    description: "Ideal for fitness enthusiasts and muscle building",
    icon: Zap,
    features: [
      "High-protein meals (35-45g protein)",
      "Lean meats and fish",
      "Post-workout nutrition",
      "Balanced macronutrients",
    ],
    details: {
      calories: "450-550 per meal",
      protein: "35-45g",
      carbs: "40-50g",
      fat: "15-20g",
      fiber: "6-10g",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Royal Plan",
    price: 60000,
    description: "Premium gourmet meals with exotic ingredients",
    icon: Crown,
    features: [
      "Gourmet ingredients",
      "Chef-crafted recipes",
      "Premium proteins (salmon, wagyu)",
      "Artisanal presentation",
    ],
    details: {
      calories: "500-650 per meal",
      protein: "30-40g",
      carbs: "45-60g",
      fat: "20-30g",
      fiber: "8-15g",
    },
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function MenuPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof mealPlans)[0] | null>(null)

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
        <h1 className="text-4xl font-bold mb-4">Our Meal Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose from our carefully crafted meal plans designed to meet your health and lifestyle goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <plan.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                {formatPrice(plan.price)}
                <span className="text-sm font-normal text-muted-foreground">/meal</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">{plan.description}</p>

              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <img
                  src={plan.image || "/placeholder.svg"}
                  alt={plan.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                      <Star className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedPlan(plan)}>
                    See More Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <plan.icon className="h-6 w-6 text-primary" />
                      {plan.name} - Detailed Information
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Nutritional Information</h4>
                        <div className="space-y-2">
                          {Object.entries(plan.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize text-muted-foreground">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Plan Features</h4>
                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-2">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4 border-t">
                      <div className="text-2xl font-bold text-primary mb-2">{formatPrice(plan.price)} per meal</div>
                      <Button size="lg" className="px-8">
                        Choose This Plan
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Healthy Journey?</h3>
            <p className="text-muted-foreground mb-6">
              All plans include free delivery, flexible scheduling, and 24/7 customer support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/subscription">Start Subscription</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
