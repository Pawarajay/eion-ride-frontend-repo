"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import NotificationPreview from "@/components/whatsapp/notification-preview"
import { ArrowLeft, Play, Pause, RotateCcw, MessageSquare, Clock, CheckCircle, MapPin, Car, Zap } from "lucide-react"
import Link from "next/link"

export default function WhatsAppJourneyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const journeySteps = [
    {
      id: 1,
      title: "Booking Initiation",
      description: "Customer books a ride",
      notification: "booking",
      timing: "Immediate",
      template: "booking_confirmation",
      delay: 0,
    },
    {
      id: 2,
      title: "Driver Assignment",
      description: "Driver found and assigned",
      notification: "driver_assigned",
      timing: "Within 2 minutes",
      template: "driver_assigned",
      delay: 2000,
    },
    {
      id: 3,
      title: "Driver En Route",
      description: "Driver heading to pickup",
      notification: "pickup",
      timing: "When driver starts",
      template: "driver_enroute",
      delay: 3000,
    },
    {
      id: 4,
      title: "Driver Arrived",
      description: "Driver at pickup location",
      notification: "pickup",
      timing: "On arrival",
      template: "driver_arrived",
      delay: 5000,
    },
    {
      id: 5,
      title: "Trip Started",
      description: "Journey begins",
      notification: "journey",
      timing: "Trip start",
      template: "trip_started",
      delay: 6000,
    },
    {
      id: 6,
      title: "Trip Completed",
      description: "Journey finished",
      notification: "completion",
      timing: "On completion",
      template: "trip_completed",
      delay: 8000,
    },
  ]

  const sampleData = {
    customerName: "Priya Sharma",
    bookingId: "BK001",
    driverName: "Rajesh Kumar",
    vehicle: "White Swift Dzire (MH 01 AB 1234)",
    eta: "25 minutes",
    fare: "180",
  }

  const playJourney = () => {
    setIsPlaying(true)
    setCurrentStep(0)

    journeySteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
        if (index === journeySteps.length - 1) {
          setIsPlaying(false)
        }
      }, step.delay / playbackSpeed)
    })
  }

  const resetJourney = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed"
    if (index === currentStep) return "active"
    return "pending"
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/whatsapp" className="flex items-center text-gray-600 hover:text-lime-600">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to WhatsApp
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Notification Journey</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x Speed</option>
              <option value={1}>1x Speed</option>
              <option value={2}>2x Speed</option>
              <option value={4}>4x Speed</option>
            </select>
            <Button
              onClick={isPlaying ? () => setIsPlaying(false) : playJourney}
              disabled={isPlaying}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Playing..." : "Play Journey"}
            </Button>
            <Button variant="outline" onClick={resetJourney} className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Journey Timeline */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>WhatsApp Notification Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {journeySteps.map((step, index) => {
                    const status = getStepStatus(index)
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex items-center space-x-4 p-4 border-2 rounded-lg transition-all duration-500 ${getStepColor(
                          status,
                        )}`}
                      >
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              status === "completed"
                                ? "bg-green-500 text-white"
                                : status === "active"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {status === "completed" ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : status === "active" ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Clock className="w-5 h-5" />
                              </motion.div>
                            ) : (
                              step.id
                            )}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{step.title}</h3>
                            <Badge
                              className={
                                status === "active"
                                  ? "bg-blue-100 text-blue-800"
                                  : status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-600"
                              }
                            >
                              {status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Timing: {step.timing}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>Template: {step.template}</span>
                            </span>
                          </div>
                        </div>

                        {/* Step Icon */}
                        <div className="flex-shrink-0">
                          {step.notification === "booking" && <CheckCircle className="w-6 h-6 text-green-500" />}
                          {step.notification === "driver_assigned" && <Car className="w-6 h-6 text-blue-500" />}
                          {step.notification === "pickup" && <MapPin className="w-6 h-6 text-purple-500" />}
                          {step.notification === "journey" && <Clock className="w-6 h-6 text-orange-500" />}
                          {step.notification === "completion" && <CheckCircle className="w-6 h-6 text-green-500" />}
                        </div>

                        {/* Connection Line */}
                        {index < journeySteps.length - 1 && (
                          <div
                            className={`absolute left-9 top-16 w-0.5 h-8 ${
                              status === "completed" ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div>
            <Card className="p-6 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Step {currentStep + 1} of {journeySteps.length}
                    </p>
                    <p className="font-medium">{journeySteps[currentStep]?.title}</p>
                  </div>

                  <div className="flex justify-center">
                    <NotificationPreview type={journeySteps[currentStep]?.notification as any} data={sampleData} />
                  </div>

                  <div className="text-center text-xs text-gray-500">
                    <p>This is how the notification appears in WhatsApp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Stats */}
            <Card className="p-6 mt-6">
              <CardHeader>
                <CardTitle>Journey Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Steps:</span>
                  <span className="font-medium">{journeySteps.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed:</span>
                  <span className="font-medium text-green-600">{currentStep}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium text-blue-600">{journeySteps.length - currentStep}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="font-medium">{Math.round((currentStep / journeySteps.length) * 100)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
