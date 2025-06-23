import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Utensils } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-balance">Welcome to SEA Catering</h2>
          <p className="text-gray-400 text-lg text-pretty">
            We provide customizable healthy meal services with delivery all across Indonesia. 
            Our mission is to make nutritious eating accessible, convenient, and delicious for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Meal-Connected Delivery */}
          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">→ Meal-Connected Delivery</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-balance">
                From kitchen to doorstep, in minutes.
              </h3>
              <p className="text-gray-400 mb-6">Order from our app or your phone.</p>
              <div className="bg-black rounded-lg p-4 font-mono text-sm scrollbar-thin overflow-auto">
                <div className="text-green-400">$ npm i -g sea-catering</div>
                <div className="text-gray-400">$ sea-catering order</div>
                <div className="text-gray-400">
                  <span className="text-blue-400">SEA Catering CLI</span> 2.8.4
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">? Set up</span> and deliver "Diet Plan"? [Y/n] y
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">? Which area</span> do you want to deliver to? Jakarta
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">? Link to existing subscription?</span> [y/N] n
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">? What's your meal preference?</span> Healthy & Fresh
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">? In which time slot do you prefer?</span> ./lunch
                </div>
                <div className="text-gray-400 mt-2">
                  <span className="text-blue-400">What will you eat?</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaborative Nutrition */}
          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">🥗 Collaborative Nutrition</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-balance">
                Every meal is remarkable. Chat with your nutritionist on real, health-grade plans, not just calories.
              </h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 ml-2">app.seacatering.com/nutrition-chat</span>
                </div>
                <div className="space-y-3 scrollbar-thin max-h-64 overflow-y-auto">
                  <div className="flex items-start gap-3 animate-slide-up">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold">
                      JD
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
                        Swapped out the protein for some variants we needed.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 animate-slide-up">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-semibold">
                      AM
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">How about this instead?</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 animate-slide-up">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-xs font-semibold">
                      BR
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">
                        I like it. Does this work with the new dietary requirements?
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500">This looks great! 👍</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Features Card */}
          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">✨ Key Features</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-balance">
                Designed for your health and convenience.
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-600 p-2 rounded-lg">
                    <Utensils className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Meal Customization</h4>
                    <p className="text-gray-400 text-sm">Tailor your meals to your specific dietary needs and preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-600 p-2 rounded-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Nationwide Delivery</h4>
                    <p className="text-gray-400 text-sm">We deliver to all major cities across Indonesia, ensuring fresh meals arrive on time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-600 p-2 rounded-lg">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Nutritional Information</h4>
                    <p className="text-gray-400 text-sm">Detailed nutritional breakdown for every meal to help you make informed choices</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Card */}
          <Card className="bg-gray-900 border-gray-800 glass-effect interactive-hover">
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-400">📞 Contact Us</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-balance">
                We're here to help with your meal planning needs.
              </h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 ml-2">contact.seacatering.com</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-700 text-white px-3 py-2 rounded-lg">
                        <p className="text-sm font-medium">Manager: Brian</p>
                        <p className="text-sm text-gray-300">08123456789</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-700 text-white px-3 py-2 rounded-lg">
                        <p className="text-sm">info@seacatering.id</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-700 text-white px-3 py-2 rounded-lg">
                        <p className="text-sm">Jakarta, Indonesia</p>
                      </div>
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
