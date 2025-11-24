"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation, Star, Calendar, MapPin, ArrowLeft, Search, Filter, Download, Eye, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [trips, setTrips] = useState([
    {
      id: "TR001",
      from: "Home - Andheri West",
      to: "Office - Bandra Kurla Complex",
      date: "2024-01-15",
      time: "9:30 AM",
      fare: 180,
      status: "completed",
      driver: "Rajesh Kumar",
      driverPhone: "+91 98765 43210",
      vehicle: "Maruti Swift Dzire",
      plateNumber: "MH 01 AB 1234",
      rating: 5,
      distance: "12.5 km",
      duration: "25 min",
      paymentMethod: "Card",
    },
    {
      id: "TR002",
      from: "Phoenix Mall, Kurla",
      to: "Home - Andheri West",
      date: "2024-01-14",
      time: "8:45 PM",
      fare: 120,
      status: "completed",
      driver: "Amit Sharma",
      driverPhone: "+91 98765 43211",
      vehicle: "Honda City",
      plateNumber: "MH 02 CD 5678",
      rating: 4,
      distance: "8.2 km",
      duration: "18 min",
      paymentMethod: "Cash",
    },
    {
      id: "TR003",
      from: "Mumbai Airport Terminal 2",
      to: "Hotel Taj, Colaba",
      date: "2024-01-10",
      time: "11:30 PM",
      fare: 350,
      status: "completed",
      driver: "Suresh Patel",
      driverPhone: "+91 98765 43212",
      vehicle: "Toyota Innova",
      plateNumber: "MH 03 EF 9012",
      rating: 5,
      distance: "28.3 km",
      duration: "45 min",
      paymentMethod: "Card",
    },
    {
      id: "TR004",
      from: "Bandra Station",
      to: "Linking Road",
      date: "2024-01-08",
      time: "2:15 PM",
      fare: 80,
      status: "cancelled",
      driver: "Vikram Singh",
      driverPhone: "+91 98765 43213",
      vehicle: "Maruti Swift",
      plateNumber: "MH 04 GH 3456",
      rating: null,
      distance: "3.1 km",
      duration: "8 min",
      paymentMethod: "Card",
      cancellationReason: "Driver unavailable",
    },
  ])

  const [selectedTrip, setSelectedTrip] = useState(null)

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || trip.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalSpent = trips.filter((t) => t.status === "completed").reduce((sum, trip) => sum + trip.fare, 0)
  const totalTrips = trips.filter((t) => t.status === "completed").length
  const averageRating =
    trips.filter((t) => t.rating).reduce((sum, trip) => sum + trip.rating, 0) / trips.filter((t) => t.rating).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-lime-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">in</span>
            </div>
            <span className="text-xl font-bold">Drive</span>
          </div>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trip History</h1>
            <p className="text-gray-600">View and manage all your trips</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold">{totalTrips}</p>
                </div>
                <Navigation className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalSpent}</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">₹</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search trips by location or driver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="ongoing">Ongoing</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
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
              <Card className="p-6 hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                        <Navigation className="w-6 h-6 text-lime-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{trip.id}</h3>
                          <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {trip.from} → {trip.to}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            {trip.date} at {trip.time}
                          </span>
                          <span>•</span>
                          <span>{trip.distance}</span>
                          <span>•</span>
                          <span>{trip.duration}</span>
                          <span>•</span>
                          <span>Driver: {trip.driver}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₹{trip.fare}</p>
                      {trip.rating && (
                        <div className="flex items-center space-x-1 justify-end mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{trip.rating}</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{trip.paymentMethod}</p>
                    </div>
                  </div>

                  {trip.status === "cancelled" && trip.cancellationReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">
                        <strong>Cancelled:</strong> {trip.cancellationReason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{trip.vehicle}</span>
                      <span>•</span>
                      <span>{trip.plateNumber}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {trip.status === "completed" && !trip.rating && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-2" />
                          Rate Trip
                        </Button>
                      )}
                      {trip.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Book Again
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't taken any trips yet"}
              </p>
              <Link href="/book">
                <Button className="bg-lime-400 text-black hover:bg-lime-500">Book Your First Ride</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
