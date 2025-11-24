"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Car,
  Star,
  TrendingUp,
  FileText,
  BarChart3,
  Navigation,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Settings,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [earnings, setEarnings] = useState({ today: 0, week: 0, month: 0 })
  const [stats, setStats] = useState({ rating: 4.8, trips: 156, acceptance: 92 })

  const driverInfo = {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    licenseNumber: "MH0120110012345",
    vehicleNumber: "MH 01 AB 1234",
    vehicleModel: "Maruti Swift Dzire",
    joinDate: "January 2024",
    status: "Verified",
    profilePhoto: "/indian-driver-profile.jpg",
  }

  const sidebarItems = [
    { icon: BarChart3, title: "Dashboard", href: "/driver/dashboard", active: true },
    { icon: Navigation, title: "Trip History", href: "/driver/trips" },
    { icon: DollarSign, title: "Earnings", href: "/driver/earnings" },
    { icon: FileText, title: "Documents", href: "/driver/documents" },
    { icon: Car, title: "Vehicle", href: "/driver/vehicle" },
    { icon: User, title: "Profile", href: "/driver/profile" },
    { icon: Settings, title: "Settings", href: "/driver/settings" },
    { icon: HelpCircle, title: "Support", href: "/driver/support" },
  ]

  const recentTrips = [
    {
      id: "TR001",
      from: "Andheri West",
      to: "Bandra Kurla Complex",
      fare: 180,
      rating: 5,
      date: "Today, 2:30 PM",
      status: "completed",
    },
    {
      id: "TR002",
      from: "Juhu Beach",
      to: "Mumbai Airport",
      fare: 220,
      rating: 4,
      date: "Today, 11:45 AM",
      status: "completed",
    },
    {
      id: "TR003",
      from: "Colaba",
      to: "Powai",
      fare: 350,
      rating: 5,
      date: "Yesterday, 6:20 PM",
      status: "completed",
    },
  ]

  const documents = [
    { name: "Driving License", status: "verified", expiry: "2026-12-15" },
    { name: "Vehicle Registration", status: "verified", expiry: "2025-08-20" },
    { name: "Insurance", status: "expiring", expiry: "2024-03-15" },
    { name: "Pollution Certificate", status: "verified", expiry: "2024-12-10" },
  ]

  useEffect(() => {
    // Simulate real-time earnings update
    const interval = setInterval(() => {
      if (isOnline) {
        setEarnings((prev) => ({
          ...prev,
          today: prev.today + Math.floor(Math.random() * 50),
        }))
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isOnline])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eion Rides</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Driver Dashboard</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
              <span className="text-sm font-medium text-gray-900">{isOnline ? "Online" : "Offline"}</span>
            </div>
            <Button
              onClick={() => setIsOnline(!isOnline)}
              className={`${isOnline ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
            >
              {isOnline ? "Go Offline" : "Go Online"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto p-4 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {driverInfo.name}!</h1>
                  <p className="opacity-90">Ready to start earning today?</p>
                </div>
                <img
                  src={driverInfo.profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <Card className="p-6 border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Today's Earnings</p>
                        <p className="text-2xl font-bold text-green-600">₹{earnings.today}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="p-6 border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="p-6 border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Trips</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.trips}</p>
                      </div>
                      <Navigation className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="p-6 border border-gray-200">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Acceptance Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.acceptance}%</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-gray-900">
                      <span>Recent Trips</span>
                      <Link href="/driver/trips">
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTrips.map((trip, index) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Navigation className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {trip.from} → {trip.to}
                            </p>
                            <p className="text-sm text-gray-600">{trip.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{trip.fare}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{trip.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Car className="w-4 h-4 mr-2" />
                      Vehicle Details
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Earnings Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <FileText className="w-5 h-5" />
                      <span>Document Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">Expires: {doc.expiry}</p>
                        </div>
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </div>
                    ))}
                    {documents.some((doc) => doc.status === "expiring") && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-700">Some documents are expiring soon</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="p-6 border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <TrendingUp className="w-5 h-5" />
                  <span>Earnings Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Earnings chart would be integrated here</p>
                    <p className="text-sm text-gray-500">Chart.js or similar charting library</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
