import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, User, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground">
            Have questions? We're here to help you start your healthy journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <User className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">Brian</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">08123456789</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">All Major Cities</p>
              <p className="text-sm text-muted-foreground">Across Indonesia</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">24/7</p>
              <p className="text-sm text-muted-foreground">Customer Support</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
