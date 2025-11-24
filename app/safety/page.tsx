"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  CheckCircle,
  Phone,
  MapPin,
  Star,
  Users,
  Clock,
  AlertTriangle,
  Camera,
  Smartphone,
  UserCheck,
} from "lucide-react"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { Nav } from "react-day-picker"

export default function SafetyPage() {
  const [activeTab, setActiveTab] = useState("riders")

  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Driver Verification",
      description:
        "All drivers undergo thorough background checks, document verification, and training before joining our platform.",
      details: [
        "Criminal background check",
        "License verification",
        "Vehicle inspection",
        "Safety training completion",
      ],
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description:
        "Share your live location with trusted contacts and track your ride in real-time for complete peace of mind.",
      details: ["GPS tracking", "Route monitoring", "ETA updates", "Location sharing"],
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Our safety team is available round the clock to assist you with any concerns or emergencies.",
      details: ["Emergency hotline", "In-app support", "Quick response team", "Multilingual assistance"],
    },
    {
      icon: AlertTriangle,
      title: "Emergency Button",
      description:
        "One-tap emergency button instantly alerts authorities and your emergency contacts with your location.",
      details: ["Instant alerts", "Police notification", "Emergency contacts", "Location broadcast"],
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Two-way rating system helps maintain high standards and builds trust between riders and drivers.",
      details: ["Driver ratings", "Rider feedback", "Quality monitoring", "Performance tracking"],
    },
    {
      icon: Camera,
      title: "Trip Recording",
      description: "Optional trip recording feature for added security and dispute resolution.",
      details: ["Audio recording", "Route logging", "Incident reporting", "Evidence collection"],
    },
  ]

  const safetyStats = [
    { number: "99.9%", label: "Safe trips completed", icon: CheckCircle, color: "text-green-500" },
    { number: "24/7", label: "Safety support available", icon: Clock, color: "text-blue-500" },
    { number: "100%", label: "Drivers verified", icon: Shield, color: "text-purple-500" },
    { number: "<2min", label: "Emergency response time", icon: Phone, color: "text-red-500" },
  ]

  const safetyTips = {
    riders: [
      {
        title: "Before Your Ride",
        tips: [
          "Verify driver details match the app",
          "Check vehicle number plate",
          "Share trip details with someone",
          "Ensure your phone is charged",
        ],
      },
      {
        title: "During Your Ride",
        tips: [
          "Wear your seatbelt",
          "Follow the suggested route",
          "Stay alert and aware",
          "Keep emergency contacts handy",
        ],
      },
      {
        title: "After Your Ride",
        tips: [
          "Rate your driver honestly",
          "Report any issues immediately",
          "Check for personal belongings",
          "Confirm safe arrival",
        ],
      },
    ],
    drivers: [
      {
        title: "Vehicle Safety",
        tips: [
          "Regular vehicle maintenance",
          "Valid insurance and registration",
          "Clean and comfortable interior",
          "Working safety equipment",
        ],
      },
      {
        title: "Professional Conduct",
        tips: ["Respectful communication", "Follow traffic rules", "Maintain cleanliness", "Respect passenger privacy"],
      },
      {
        title: "Emergency Preparedness",
        tips: [
          "Know emergency procedures",
          "Keep first aid kit",
          "Have emergency contacts",
          "Report incidents immediately",
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
<Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-500/20 rounded-full px-6 py-2 mb-6">
            <Shield className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">Your Safety is Our Priority</span>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Safe Rides, <span className="text-blue-400">Every Time</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We've built comprehensive safety features and protocols to ensure every ride is secure, comfortable, and
            trustworthy for both riders and drivers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">Learn About Safety Features</Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
            >
              Emergency Support
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {safetyStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                <div
                  className={`w-16 h-16 ${stat.color.replace("text-", "bg-").replace("-500", "-100")} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Safety Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple layers of protection designed to keep you safe throughout your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Safety Tips & Guidelines</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Best practices to ensure a safe and pleasant experience for everyone
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <Button
                variant={activeTab === "riders" ? "default" : "ghost"}
                onClick={() => setActiveTab("riders")}
                className={`px-6 py-2 ${activeTab === "riders" ? "bg-blue-500 text-white" : "text-gray-300"}`}
              >
                <Users className="w-4 h-4 mr-2" />
                For Riders
              </Button>
              <Button
                variant={activeTab === "drivers" ? "default" : "ghost"}
                onClick={() => setActiveTab("drivers")}
                className={`px-6 py-2 ${activeTab === "drivers" ? "bg-blue-500 text-white" : "text-gray-300"}`}
              >
                <Users className="w-4 h-4 mr-2" />
                For Drivers
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {safetyTips[activeTab].map((section, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-red-900">Emergency Support</h2>
          <p className="text-lg text-red-700 mb-8">
            In case of emergency, immediately contact our 24/7 safety helpline or use the emergency button in the app.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-red-200">
              <CardContent className="p-0 text-center">
                <Phone className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">1800-Eion Rides</p>
                <p className="text-gray-600">Available 24/7 for immediate assistance</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-red-200">
              <CardContent className="p-0 text-center">
                <Smartphone className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">In-App Emergency</h3>
                <p className="text-gray-600 mb-4">Use the emergency button in the app to:</p>
                <div className="text-left space-y-1 text-sm text-gray-600">
                  <p>• Alert emergency contacts</p>
                  <p>• Share live location</p>
                  <p>• Contact authorities</p>
                  <p>• Record incident details</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

<Footer />
    </div>
  )
}
