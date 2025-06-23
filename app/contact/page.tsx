import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, User, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about our meal plans or need assistance? We're here to help you start your healthy journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Manager</p>
                    <p className="text-muted-foreground">Brian</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Phone Number</p>
                    <p className="text-muted-foreground">08123456789</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@seacatering.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Service Area</p>
                    <p className="text-muted-foreground">All major cities across Indonesia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Customer Support</p>
                    <p className="text-muted-foreground">24/7 Available</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-muted-foreground">Within 2 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Service Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Jakarta",
                  "Surabaya",
                  "Bandung",
                  "Medan",
                  "Semarang",
                  "Makassar",
                  "Palembang",
                  "Tangerang",
                  "Depok",
                  "Bekasi",
                  "Bogor",
                  "Yogyakarta",
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{city}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Don't see your city? Contact us to check if we deliver to your area.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <a href="tel:08123456789">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <a href="/subscription">Start Subscription</a>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <a href="/menu">View Menu Plans</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Customer Support:</span>
                <span className="text-sm font-semibold">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Order Processing:</span>
                <span className="text-sm font-semibold">6 AM - 10 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Delivery Hours:</span>
                <span className="text-sm font-semibold">7 AM - 9 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-sm">How far in advance should I order?</p>
                <p className="text-xs text-muted-foreground">At least 24 hours for regular orders</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Can I modify my subscription?</p>
                <p className="text-xs text-muted-foreground">Yes, anytime through your dashboard</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Do you accommodate allergies?</p>
                <p className="text-xs text-muted-foreground">Yes, specify during subscription</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
