"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem("taniyn_admin_session")
    if (session !== "authenticated") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("taniyn_admin_session")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-mono">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-mono">TANIYN ADMIN DASHBOARD</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-mono mb-4">Merch Collection</h2>
            <p className="text-gray-400 mb-4">Manage merchandise items</p>
            <Link href="/admin/merch">
              <Button className="bg-white text-black hover:bg-gray-200">Manage Merch</Button>
            </Link>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-mono mb-4">Upcoming Concerts</h2>
            <p className="text-gray-400 mb-4">Manage concert listings</p>
            <Link href="/admin/concerts">
              <Button className="bg-white text-black hover:bg-gray-200">Manage Concerts</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
