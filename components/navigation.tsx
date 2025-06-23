"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/subscription", label: "Subscription" },
  { href: "/contact", label: "Contact Us" },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Left section - Logo */}
          <div className="flex-1 md:w-1/4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-white">
                {" "}
                😋SEA Catering
              </div>
            </Link>
          </div>

          {/* Middle section - Navigation */}
          <div className="hidden w-2/4 md:block">
            <nav className="flex justify-center">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white",
                      pathname === item.href ? "text-white" : "text-gray-400"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Right section - User controls */}
          <div className="flex justify-end md:w-1/4">
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" asChild className="hidden md:flex">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild className="hidden md:flex">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}

              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-gray-800 bg-black">
                  <div className="mt-6 flex flex-col space-y-6">
                    <nav className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-white",
                            pathname === item.href
                              ? "text-white"
                              : "text-gray-400"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    {!user && (
                      <div className="flex flex-col space-y-2">
                        <Button asChild variant="outline">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/register">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
