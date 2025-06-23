import Link from "next/link"
import { Github, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-white text-sm">
                  Meal Plans
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-gray-400 hover:text-white text-sm">
                  Subscriptions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Monitoring
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact Sales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Social</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                  <Youtube className="w-4 h-4" /> YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-white font-bold">▲ SEA Catering</span>
          </div>
          <div className="text-gray-400 text-sm">© 2024 SEA Catering Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
