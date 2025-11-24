"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Download,
  Eye,
  MapPin,
  Clock,
  User,
  Car,
  DollarSign,
  Navigation,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function AdminTripsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")

  const trips = [
    {
      id: "TR001",
      customer: {
        name: "Priya Sharma",
        phone: "+91 98765 43210",
        rating: 4.9,
      },
      driver: {
        name: "Rajesh Kumar",
        phone: "+91 87654 32109",
        vehicle: "MH 01 AB 1234",
        rating: 4.8,
      },
      pickup: {
        address: "Andheri West Station, Mumbai",
        time: "9:30 AM",
        coordinates: { lat: 19.1136, lng: 72.8697 },
      },
      dropoff: {
        address: "Bandra Kurla Complex, Mumbai",
        time: "10:05 AM",
        coordinates: { lat: 19.0728, lng: 72.8826 },
      },
      status: "completed",
      fare: {
        base: 150,
        tip: 20,
        total: 180,
      },
      distance: "12.5 km",
      duration: "35 minutes",
      paymentMethod: "Visa •••• 4242",
      bookedAt: "2024-01-15 09:25:00",
      startedAt: "2024-01-15 09:32:00",
      completedAt: "2024-01-15 10:05:00",
      route: "Via Western Express Highway",
    },
    {
      id: "TR002",
      customer: {
        name: "Amit Patel",
        phone: "+91 76543 21098",
        rating: 4.7,
      },
      driver: {
        name: "Suresh Singh",
        phone: "+91 65432 10987",
        vehicle: "MH 02 CD 5678",
        rating: 4.6,
      },
      pickup: {
        address: "Bandra Station, Mumbai",
        time: "2:15 PM",
        coordinates: { lat: 19.0544, lng: 72.8406 },
      },
      dropoff: {
        address: "Chhatrapati Shivaji Airport, Mumbai",
        time: "In Progress",
        coordinates: { lat: 19.0896, lng: 72.8656 },
      },
      status: "in-progress",
      fare: {
        base: 320,
        tip: 0,
        total: 350,
      },
      distance: "18.2 km",
      duration: "45 minutes (estimated)",
      paymentMethod: "Cash",
      bookedAt: "2024-01-15 14:10:00",
      startedAt: "2024-01-15 14:18:00",
      route: "Via Eastern Express Highway",
    },
    {
      id: "TR003",
      customer: {
        name: "Neha Gupta",
        phone: "+91 54321 09876",
        rating: 4.5,
      },
      driver: {
        name: "Vikram Shah",
        phone: "+91 43210 98765",
        vehicle: "MH 03 EF 9012",
        rating: 4.3,
      },
      pickup: {
        address: "Powai Lake, Mumbai",
        time: "11:45 AM",
        coordinates: { lat: 19.1197, lng: 72.9059 },
      },
      dropoff: {
        address: "Colaba Causeway, Mumbai",
        time: "Cancelled",
        coordinates: { lat: 18.9067, lng: 72.8147 },
      },
      status: "cancelled",
      fare: {
        base: 0,
        tip: 0,
        total: 0,
      },
      distance: "28.5 km",
      duration: "Not completed",
      paymentMethod: "UPI",
      bookedAt: "2024-01-15 11:40:00",
      cancelledAt: "2024-01-15 11:52:00",
      cancellationReason: "Driver unavailable",
      route: "Via Sion-Panvel Highway",
    },
  ]

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">Trip Management</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                {trips.filter((t) => t.status === "completed").length} Completed
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {trips.filter((t) => t.status === "in-progress").length} Active
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                {trips.filter((t) => t.status === "cancelled").length} Cancelled
              </Badge>
            </div>
          </div>
        </Card>

        {/* Trips List */}
        <div className="space-y-4">
          {filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{trip.id}</h3>
                        <Badge className={getStatusColor(trip.status)}>
                          {getStatusIcon(trip.status)}
                          <span className="ml-1">{trip.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Booked: {new Date(trip.bookedAt).toLocaleString()}</span>
                        <span>•</span>
                        <span>{trip.distance}</span>
                        <span>•</span>
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-lg font-bold text-green-600">₹{trip.fare.total}</p>
                      <p className="text-sm text-gray-600">{trip.paymentMethod}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4" />
                        <span>Customer</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{trip.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{trip.customer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{trip.customer.rating} ⭐</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Driver Info */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-sm">
                        <Car className="w-4 h-4" />
                        <span>Driver</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{trip.driver.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{trip.driver.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-medium">{trip.driver.vehicle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{trip.driver.rating} ⭐</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trip Route */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-sm">
                        <Navigation className="w-4 h-4" />
                        <span>Route Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">Pickup:</span>
                        </div>
                        <p className="font-medium ml-4">{trip.pickup.address}</p>
                        <p className="text-gray-500 ml-4">{trip.pickup.time}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600">Drop-off:</span>
                        </div>
                        <p className="font-medium ml-4">{trip.dropoff.address}</p>
                        <p className="text-gray-500 ml-4">{trip.dropoff.time}</p>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-gray-600">Route: {trip.route}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fare Breakdown */}
                <Card className="p-4 mt-4 bg-white/50 border border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>Fare Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Fare:</span>
                        <span className="font-medium">₹{trip.fare.base}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tip:</span>
                        <span className="font-medium">₹{trip.fare.tip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-medium">{trip.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-green-600">₹{trip.fare.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cancellation Info */}
                {trip.status === "cancelled" && trip.cancellationReason && (
                  <Card className="p-4 mt-4 border-red-200 bg-red-50">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Cancellation Reason:</span>
                        <span className="text-sm text-red-700">{trip.cancellationReason}</span>
                      </div>
                      {trip.cancelledAt && (
                        <p className="text-xs text-red-600 mt-1">
                          Cancelled at: {new Date(trip.cancelledAt).toLocaleString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
