"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, MapPin, Car, Clock, CheckCircle } from "lucide-react"

interface NotificationPreviewProps {
  type: "booking" | "driver_assigned" | "pickup" | "journey" | "completion"
  data?: any
}

export default function NotificationPreview({ type, data }: NotificationPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getNotificationContent = () => {
    switch (type) {
      case "booking":
        return {
          title: "Booking Confirmed",
          message: `Hi ${data?.customerName || "Priya"}, your booking ${data?.bookingId || "BK001"} has been confirmed! We're finding you a driver now.`,
          buttons: ["Track Booking", "Cancel Booking"],
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          color: "bg-green-50 border-green-200",
        }
      case "driver_assigned":
        return {
          title: "Driver Assigned",
          message: `Great news! ${data?.driverName || "Rajesh Kumar"} is your driver. Vehicle: ${data?.vehicle || "White Swift Dzire (MH 01 AB 1234)"}. He's on his way!`,
          buttons: ["Call Driver", "Track Live"],
          icon: <Car className="w-5 h-5 text-blue-600" />,
          color: "bg-blue-50 border-blue-200",
          media: "📍 Live location sharing enabled",
        }
      case "pickup":
        return {
          title: "Driver Arrived",
          message: `${data?.driverName || "Rajesh Kumar"} has arrived at your pickup location. Please come out when ready!`,
          buttons: ["I'm Coming", "Call Driver"],
          icon: <MapPin className="w-5 h-5 text-purple-600" />,
          color: "bg-purple-50 border-purple-200",
        }
      case "journey":
        return {
          title: "Trip Started",
          message: `Your trip has started! Estimated arrival: ${data?.eta || "25 minutes"}. Enjoy your ride!`,
          buttons: ["Track Ride", "Share Trip"],
          icon: <Clock className="w-5 h-5 text-orange-600" />,
          color: "bg-orange-50 border-orange-200",
          media: "🗺️ Live route tracking",
        }
      case "completion":
        return {
          title: "Trip Completed",
          message: `Thank you for riding with InDrive! Your fare is ₹${data?.fare || "180"}. Please rate your experience.`,
          buttons: ["Rate Trip", "View Invoice"],
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          color: "bg-green-50 border-green-200",
          media: "🧾 Invoice attached",
        }
      default:
        return {
          title: "Notification",
          message: "Sample notification message",
          buttons: ["Action 1", "Action 2"],
          icon: <MessageSquare className="w-5 h-5 text-gray-600" />,
          color: "bg-gray-50 border-gray-200",
        }
    }
  }

  const content = getNotificationContent()

  return (
    <Card className={`max-w-sm border-2 ${content.color}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-sm">
          {content.icon}
          <span>{content.title}</span>
          <Badge className="bg-green-100 text-green-800 text-xs">WhatsApp</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">{content.message}</p>

        {content.media && <div className="p-2 bg-white rounded border text-xs text-gray-600">{content.media}</div>}

        <div className="space-y-2">
          {content.buttons.map((button, index) => (
            <Button key={index} variant="outline" size="sm" className="w-full text-xs bg-white hover:bg-gray-50">
              {button}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>InDrive</span>
          <span>Just now</span>
        </div>
      </CardContent>
    </Card>
  )
}
