import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-white font-bold text-xl">▲ Vercel</div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Link href="#" className="text-gray-300 hover:text-white">
                Enterprise
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Docs
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Log In
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm">
              Contact
            </Link>
            <Button className="bg-white text-black hover:bg-gray-200">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
