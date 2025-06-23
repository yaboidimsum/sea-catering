"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(formData.email, formData.password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 safe-area-inset">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-balance">Welcome back</h1>
          <p className="text-gray-400 text-pretty">Sign in to your SEA Catering account</p>
        </div>

        <Card className="bg-gray-900 border-gray-800 glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white focus-ring"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white focus-ring"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert className="bg-red-900/50 border-red-800 backdrop-blur-sm">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 focus-ring"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-white hover:underline focus-ring rounded">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <p className="text-gray-300 text-sm mb-2">Demo accounts:</p>
              <p className="text-xs text-gray-400">Admin: admin@seacatering.com / Admin123!</p>
              <p className="text-xs text-gray-400">User: user@example.com / User123!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
