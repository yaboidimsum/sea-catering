import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to order?</h2>
          <p className="text-gray-400 mb-8">
            Start eating healthy with a free account. Speak to an expert for your Pro or Enterprise needs.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Button className="bg-white text-black hover:bg-gray-200 w-full mb-4" asChild>
                  <Link href="/register">Start Ordering</Link>
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
                  <Link href="/contact">Talk to an Expert</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-semibold mb-2">Explore SEA Enterprise</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Built for teams that eat healthy. Talk to our experts about a customized meal plan.
                </p>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 w-full" asChild>
                  <Link href="/contact">Explore Enterprise</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
