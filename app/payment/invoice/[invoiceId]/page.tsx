"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Share,
  Printer as Print,
  MapPin,
  Clock,
  CreditCard,
  User,
  Car,
  Receipt,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function InvoicePage({ params }: { params: { invoiceId: string } }) {
  const [invoice] = useState({
    id: params.invoiceId,
    tripId: "TR001",
    date: "2024-01-15",
    time: "9:55 AM",
    status: "paid",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
    },
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      vehicle: "Maruti Swift Dzire",
      plateNumber: "MH 01 AB 1234",
      rating: 4.8,
    },
    trip: {
      pickup: "Andheri West Station",
      dropoff: "Bandra Kurla Complex",
      distance: "12.5 km",
      duration: "35 minutes",
      route: "Via Western Express Highway",
    },
    payment: {
      baseFare: 150,
      tip: 20,
      discount: 10,
      taxes: 20,
      total: 180,
      method: "Visa •••• 4242",
      transactionId: "TXN123456789",
    },
  })

  const handleDownload = () => {
    // Implement PDF download
    console.log("Downloading invoice...")
  }

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing invoice...")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard/trips" className="flex items-center text-gray-600 hover:text-lime-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Trips
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">in</span>
            </div>
            <span className="text-xl font-bold">Drive</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="bg-transparent">
              <Print className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={handleDownload} className="bg-lime-400 text-black hover:bg-lime-500">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <Card className="p-8">
          {/* Invoice Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">in</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Eion Rides</h1>
                <p className="text-gray-600">Ride Invoice</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {invoice.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Invoice #{invoice.id}</p>
              <p className="text-sm text-gray-600">
                {invoice.date} at {invoice.time}
              </p>
            </div>
          </div>

          {/* Customer & Driver Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <User className="w-5 h-5" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{invoice.customer.name}</p>
                <p className="text-sm text-gray-600">{invoice.customer.email}</p>
                <p className="text-sm text-gray-600">{invoice.customer.phone}</p>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Car className="w-5 h-5" />
                  <span>Driver Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{invoice.driver.name}</p>
                <p className="text-sm text-gray-600">{invoice.driver.phone}</p>
                <p className="text-sm text-gray-600">
                  {invoice.driver.vehicle} • {invoice.driver.plateNumber}
                </p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm">{invoice.driver.rating}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trip Details */}
          <Card className="p-6 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Trip Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Pickup Location</h4>
                  <p className="text-sm">{invoice.trip.pickup}</p>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Drop-off Location</h4>
                  <p className="text-sm">{invoice.trip.dropoff}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Distance</p>
                    <p className="font-medium">{invoice.trip.distance}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="font-medium">{invoice.trip.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Trip ID</p>
                    <p className="font-medium">{invoice.tripId}</p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-600">Route: {invoice.trip.route}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Breakdown */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>₹{invoice.payment.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver Tip</span>
                  <span>₹{invoice.payment.tip}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount Applied</span>
                  <span>-₹{invoice.payment.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{invoice.payment.taxes}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{invoice.payment.total}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span>{invoice.payment.method}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID</span>
                    <span className="font-mono">{invoice.payment.transactionId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            <p>Thank you for choosing Eion Rides!</p>
            <p className="mt-2">
              For support, contact us at{" "}
              <a href="mailto:support@EionRides.com" className="text-lime-600 hover:underline">
                support@EionRides.com
              </a>{" "}
              or call{" "}
              <a href="tel:+911800123456" className="text-lime-600 hover:underline">
                +91 1800-123-456
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
