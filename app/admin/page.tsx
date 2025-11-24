"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  Filter,
  Download,
  RefreshCw,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [refreshing, setRefreshing] = useState(false)

  const stats = {
    totalUsers: 15420,
    activeDrivers: 2340,
    todayTrips: 1250,
    todayRevenue: 125000,
    pendingVerifications: 45,
    activeTrips: 180,
    supportTickets: 23,
    systemHealth: 98.5,
  }

  const recentTrips = [
    {
      id: "TR001",
      customer: "Priya Sharma",
      driver: "Rajesh Kumar",
      pickup: "Andheri West",
      dropoff: "BKC",
      status: "completed",
      amount: 180,
      time: "2 mins ago",
    },
    {
      id: "TR002",
      customer: "Amit Patel",
      driver: "Suresh Singh",
      pickup: "Bandra",
      dropoff: "Airport",
      status: "in-progress",
      amount: 350,
      time: "5 mins ago",
    },
    {
      id: "TR003",
      customer: "Neha Gupta",
      driver: "Vikram Shah",
      pickup: "Powai",
      dropoff: "Colaba",
      status: "cancelled",
      amount: 0,
      time: "8 mins ago",
    },
  ]

  const pendingVerifications = [
    {
      id: "DRV001",
      name: "Rohit Sharma",
      phone: "+91 98765 43210",
      vehicle: "Maruti Swift Dzire",
      submittedAt: "2 hours ago",
      documents: ["License", "RC", "Insurance"],
      status: "pending",
    },
    {
      id: "DRV002",
      name: "Arjun Patel",
      phone: "+91 87654 32109",
      vehicle: "Hyundai Xcent",
      submittedAt: "4 hours ago",
      documents: ["License", "RC"],
      status: "incomplete",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High demand in Bandra area - consider surge pricing",
      time: "5 mins ago",
    },
    {
      id: 2,
      type: "info",
      message: "Payment gateway maintenance scheduled for tonight",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "error",
      message: "SMS service experiencing delays",
      time: "2 hours ago",
    },
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eion Rides Admin</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Admin Panel</Badge>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-transparent border-blue-200 hover:bg-blue-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <Link href="/admin/bookings">
                <Button
                  variant="outline"
                  className="w-full h-20 justify-start bg-transparent border-blue-200 hover:bg-blue-50 text-blue-500 font-extrabold text-2xl"
                >
                  <BookOpen className="w-36 h-36 mr-2" />
                  See Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeDrivers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+8% this month</p>
                </div>
                <Car className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.todayTrips.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">{stats.activeTrips} active now</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.todayRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+15% vs yesterday</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        {systemAlerts.length > 0 && (
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>System Alerts</span>
                <Badge className="bg-yellow-100 text-yellow-800">{systemAlerts.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border rounded-lg ${getAlertColor(alert.type)}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Trips */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Trips</span>
                  <Link href="/admin/trips">
                    <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-blue-100 rounded-lg bg-white/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{trip.id}</p>
                          <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {trip.customer} → {trip.driver}
                        </p>
                        <p className="text-sm text-gray-500">
                          {trip.pickup} → {trip.dropoff}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{trip.amount}</p>
                      <p className="text-xs text-gray-500">{trip.time}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent border-blue-200 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pending Verifications */}
          <div>
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pending Verifications</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingVerifications}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingVerifications.map((driver, index) => (
                  <motion.div
                    key={driver.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-blue-100 rounded-lg bg-white/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{driver.name}</p>
                      <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="w-3 h-3" />
                        <span>{driver.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{driver.submittedAt}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}

                <Link href="/admin/drivers">
                  <Button variant="outline" className="w-full bg-transparent border-blue-200 hover:bg-blue-50">
                    View All Verifications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 mt-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/drivers">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Drivers
                  </Button>
                </Link>
                <Link href="/admin/trips">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Monitor Trips
                  </Button>
                </Link>
                <Link href="/admin/whatsapp">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    WhatsApp System
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Health */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>System Health</span>
              <Badge className="bg-green-100 text-green-800">{stats.systemHealth}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium">API Services</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium">Payment Gateway</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-sm font-medium">SMS Service</p>
                <p className="text-xs text-yellow-600">Degraded</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-green-600">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
