"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Settings,
  Bell,
  HelpCircle,
  Navigation,
  Calendar,
  Phone,
  MessageCircle,
  Heart,
  History,
  Wallet,
  User,
  CreditCard,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    avatar: "/user-avatar-female.jpg",
    memberSince: "January 2024",
    totalTrips: 24,
    rating: 4.9,
    savedLocations: 3,
  })

  const [recentTrips, setRecentTrips] = useState([
    {
      id: "TR001",
      from: "Home - Andheri West",
      to: "Office - Bandra Kurla Complex",
      date: "Today, 9:30 AM",
      fare: 180,
      status: "completed",
      driver: "Rajesh Kumar",
      rating: 5,
    },
    {
      id: "TR002",
      from: "Phoenix Mall",
      to: "Home - Andheri West",
      date: "Yesterday, 8:45 PM",
      fare: 120,
      status: "completed",
      driver: "Amit Sharma",
      rating: 4,
    },
    {
      id: "TR003",
      from: "Mumbai Airport",
      to: "Hotel Taj",
      date: "Dec 15, 2024",
      fare: 350,
      status: "completed",
      driver: "Suresh Patel",
      rating: 5,
    },
  ])

  const [favoriteLocations, setFavoriteLocations] = useState([
    { id: 1, name: "Home", address: "Andheri West, Mumbai", icon: "🏠" },
    { id: 2, name: "Office", address: "Bandra Kurla Complex", icon: "🏢" },
    { id: 3, name: "Gym", address: "Powai, Mumbai", icon: "💪" },
  ])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Trip completed",
      message: "Your trip to BKC has been completed",
      time: "2 hours ago",
      read: false,
    },
    { id: 2, title: "Payment successful", message: "₹180 paid to Rajesh Kumar", time: "2 hours ago", read: false },
    { id: 3, title: "Rate your driver", message: "How was your trip with Rajesh?", time: "3 hours ago", read: true },
  ])

  const sidebarItems = [
    { icon: Navigation, title: "Dashboard", href: "/dashboard", active: true },
    { icon: History, title: "Trip History", href: "/dashboard/trips" },
    { icon: CreditCard, title: "Payments", href: "/dashboard/payments" },
    { icon: User, title: "Profile", href: "/dashboard/profile" },
    { icon: Settings, title: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, title: "Support", href: "/dashboard/support" },
  ]

  const quickActions = [
    { icon: Navigation, title: "Book a Ride", description: "Quick booking", href: "/book", color: "bg-blue-500" },
    {
      icon: History,
      title: "Trip History",
      description: "View all trips",
      href: "/dashboard/trips",
      color: "bg-green-500",
    },
    {
      icon: Wallet,
      title: "Payments",
      description: "Manage payments",
      href: "/dashboard/payments",
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Account settings",
      href: "/dashboard/settings",
      color: "bg-gray-500",
    },
  ]

  const stats = [
    { label: "Total Trips", value: user.totalTrips, icon: Navigation, color: "text-blue-600" },
    { label: "Your Rating", value: user.rating, icon: Star, color: "text-yellow-600" },
    { label: "Saved Places", value: user.savedLocations, icon: Heart, color: "text-red-600" },
    { label: "This Month", value: "8 trips", icon: Calendar, color: "text-green-600" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eion Rides</span>
            </Link>
            <Badge className="bg-blue-100 text-blue-800">Dashboard</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <Bell className="w-4 h-4" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              )}
            </Button>
            <Link href="/dashboard/profile">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            </Link>
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
                  <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                  <p className="opacity-90">Ready for your next journey?</p>
                </div>
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div key={action.title}>
                  <Link href={action.href}>
                    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border border-gray-200">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <Card className="p-6 border border-gray-200">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-gray-900">
                      <span>Recent Trips</span>
                      <Link href="/dashboard/trips">
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
                            <p className="text-sm text-gray-500">Driver: {trip.driver}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{trip.fare}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{trip.rating}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-xs mt-1">{trip.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900">
                      <Heart className="w-5 h-5" />
                      <span>Favorite Places</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {favoriteLocations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <span className="text-lg">{location.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{location.name}</p>
                          <p className="text-xs text-gray-500">{location.address}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </CardContent>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                      </div>
                      {notifications.filter((n) => !n.read).length > 0 && (
                        <Badge className="bg-red-100 text-red-800">{notifications.filter((n) => !n.read).length}</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          !notification.read ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Notifications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="p-6 border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Need Help?</h3>
                      <p className="text-sm text-gray-600">Get support or report an issue</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
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
