import { Card, CardContent } from "@/components/ui/card"

export function AnalyticsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-sm text-gray-400">📊 Enhanced Nutrition Tracking</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 text-balance">
            Privacy-friendly, lightweight Nutrition Analytics.
          </h2>
          <p className="text-gray-400 mb-8 text-pretty">
            Upgrade your post-meal workflow with actionable, real-time insights.
          </p>

          <Card className="bg-gray-900 border-gray-800 glass-effect">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Area with improved accessibility */}
                <div className="lg:col-span-2">
                  <div
                    className="h-64 relative"
                    role="img"
                    aria-label="Nutrition analytics chart showing meal consumption trends"
                  >
                    <svg className="w-full h-full gpu-accelerated" viewBox="0 0 400 200" aria-hidden="true">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Chart lines with improved animations */}
                      <path
                        d="M 20 180 Q 80 160 120 140 T 200 120 T 280 100 T 360 80"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        className="will-change-transform"
                      />
                      <path
                        d="M 20 160 Q 80 140 120 130 T 200 110 T 280 90 T 360 70"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="will-change-transform"
                      />

                      {/* Y-axis labels */}
                      <text x="10" y="180" fill="#9ca3af" fontSize="12">
                        1.0k
                      </text>
                      <text x="10" y="140" fill="#9ca3af" fontSize="12">
                        2.0k
                      </text>
                      <text x="10" y="100" fill="#9ca3af" fontSize="12">
                        3.0k
                      </text>
                      <text x="10" y="60" fill="#9ca3af" fontSize="12">
                        4.0k
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Stats with enhanced styling */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-400 text-sm">Meals</span>
                    <div className="text-right">
                      <span className="text-white font-semibold">5.2k</span>
                      <span className="text-blue-400 text-xs ml-2">+12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-400 text-sm">Orders</span>
                    <div className="text-right">
                      <span className="text-white font-semibold">2.0k</span>
                      <span className="text-green-400 text-xs ml-2">+18%</span>
                    </div>
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
