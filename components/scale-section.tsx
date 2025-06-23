import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ScaleSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Scale your{" "}
            <Badge variant="secondary" className="text-lg px-3 py-1">
              🏢 Enterprise
            </Badge>{" "}
            without compromising{" "}
            <Badge variant="secondary" className="text-lg px-3 py-1">
              🔒 Security
            </Badge>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Instant Menu Updates */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">⚡ Instant Menu Updates</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Go ahead, update on Friday. Instantly rollback to a working menu.
              </h3>
              <div className="bg-black rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">sea-catering/menu-updates</span>
                    <span className="text-gray-500 text-xs">14 sec ago</span>
                    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">90</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">sea-catering/protein-fix</span>
                    <span className="text-gray-500 text-xs">10m ago</span>
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">58</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Monitoring */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">📋 Conformance</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Move fast, don't break things. Keep quality high while maintaining velocity with Enterprise Monitoring.
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Conformance</div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Excellent</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-white font-semibold ml-2">9.5</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Code Owners</div>
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 bg-blue-500 rounded-full text-xs flex items-center justify-center">A</div>
                      <div className="w-6 h-6 bg-green-500 rounded-full text-xs flex items-center justify-center">
                        B
                      </div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full text-xs flex items-center justify-center">
                        C
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Total Issues</span>
                    <span className="text-white font-semibold">34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Remaining</span>
                    <span className="text-white font-semibold">5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Major Issues</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Remaining</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
