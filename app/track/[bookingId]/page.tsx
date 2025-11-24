"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, MessageCircle, Star, Clock, ArrowLeft, Share, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function TrackRidePage({ params }: { params: { bookingId: string } }) {
  const [rideStatus, setRideStatus] = useState("driver_assigned")
  const [estimatedArrival, setEstimatedArrival] = useState(5)
  const [currentLocation, setCurrentLocation] = useState("Approaching pickup location")

  const statusSteps = [
    { id: "driver_assigned", title: "Driver Assigned", completed: true },
    { id: "driver_coming", title: "Driver Coming", completed: true },
    { id: "driver_arrived", title: "Driver Arrived", completed: false },
    { id: "trip_started", title: "Trip Started", completed: false },
    { id: "trip_completed", title: "Trip Completed", completed: false },
  ]

  const driverInfo = {
    name: "Rajesh Kumar",
    rating: 4.8,
    trips: 1250,
    vehicle: "Maruti Swift",
    plateNumber: "MH 01 AB 1234",
    photo: "/indian-driver-profile.jpg",
  }

  const tripDetails = {
    bookingId: params.bookingId,
    pickup: "Andheri West, Mumbai",
    destination: "Bandra Kurla Complex",
    fare: 180,
    distance: "5.2 km",
    estimatedTime: "18 min",
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setEstimatedArrival((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "driver_assigned":
        return "bg-blue-500"
      case "driver_coming":
        return "bg-yellow-500"
      case "driver_arrived":
        return "bg-green-500"
      case "trip_started":
        return "bg-purple-500"
      case "trip_completed":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-600 hover:text-lime-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">in</span>
            </div>
            <span className="text-xl font-bold">Drive</span>
          </div>

          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Live Map Placeholder */}
        <Card className="overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-green-100 to-lime-100 relative flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-lime-600 mx-auto mb-2" />
              <p className="text-gray-600">Live tracking map would be integrated here</p>
              <p className="text-sm text-gray-500">Google Maps / Mapbox integration</p>
            </div>

            {/* Mock location indicator */}
            <motion.div
              className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Location</span>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Trip Status */}
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Trip Status</h2>
                <p className="text-gray-600">Booking ID: {tripDetails.bookingId}</p>
              </div>
              <Badge className={`${getStatusColor(rideStatus)} text-white`}>
                {statusSteps.find((s) => s.id === rideStatus)?.title}
              </Badge>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      step.completed ? "bg-lime-400" : step.id === rideStatus ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`${
                      step.completed || step.id === rideStatus ? "text-gray-900 font-medium" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.id === rideStatus && (
                    <Badge variant="secondary" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Current Status Message */}
            <div className="mt-6 p-4 bg-lime-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-lime-600" />
                <span className="font-medium text-lime-800">{currentLocation}</span>
              </div>
              <p className="text-sm text-lime-700 mt-1">Estimated arrival: {estimatedArrival} minutes</p>
            </div>
          </CardContent>
        </Card>

        {/* Driver Information */}
        <Card className="p-6">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-4">Your Driver</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={driverInfo.photo || "/placeholder.svg"}
                  alt={driverInfo.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{driverInfo.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{driverInfo.rating}</span>
                    <span>•</span>
                    <span>{driverInfo.trips} trips</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {driverInfo.vehicle} • {driverInfo.plateNumber}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card className="p-6">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-gray-600">{tripDetails.pickup}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-gray-600">{tripDetails.destination}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-semibold">{tripDetails.distance}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Est. Time</p>
                  <p className="font-semibold">{tripDetails.estimatedTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Fare</p>
                  <p className="font-semibold text-lime-600">₹{tripDetails.fare}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-4 border-red-200 bg-red-50">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-red-800">Emergency Support</p>
                <p className="text-sm text-red-600">24/7 safety assistance available</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              >
                Call Help
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-lime-400 text-black hover:bg-lime-500 py-3">Share Trip with Friends</Button>
          <Button variant="outline" className="w-full py-3 bg-transparent">
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  )
}
