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
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Car,
  FileText,
  AlertTriangle,
  MoreHorizontal,
  User,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function AdminDriversPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)

  const drivers = [
    {
      id: "DRV001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      status: "active",
      vehicle: {
        make: "Maruti",
        model: "Swift Dzire",
        year: 2020,
        plateNumber: "MH 01 AB 1234",
        color: "White",
      },
      documents: {
        license: { status: "verified", expiryDate: "2026-12-15" },
        registration: { status: "verified", expiryDate: "2025-08-20" },
        insurance: { status: "verified", expiryDate: "2024-11-30" },
        photo: { status: "verified" },
      },
      stats: {
        totalTrips: 1250,
        rating: 4.8,
        earnings: 125000,
        joinedDate: "2023-06-15",
      },
      verification: {
        status: "verified",
        verifiedAt: "2023-06-20",
        verifiedBy: "Admin",
      },
    },
    {
      id: "DRV002",
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 87654 32109",
      status: "pending",
      vehicle: {
        make: "Hyundai",
        model: "Xcent",
        year: 2019,
        plateNumber: "MH 02 CD 5678",
        color: "Silver",
      },
      documents: {
        license: { status: "pending", expiryDate: "2025-10-12" },
        registration: { status: "verified", expiryDate: "2024-12-18" },
        insurance: { status: "pending", expiryDate: "2024-09-25" },
        photo: { status: "verified" },
      },
      stats: {
        totalTrips: 0,
        rating: 0,
        earnings: 0,
        joinedDate: "2024-01-15",
      },
      verification: {
        status: "pending",
        submittedAt: "2024-01-15",
      },
    },
    {
      id: "DRV003",
      name: "Suresh Patel",
      email: "suresh.patel@email.com",
      phone: "+91 76543 21098",
      status: "suspended",
      vehicle: {
        make: "Tata",
        model: "Tigor",
        year: 2021,
        plateNumber: "MH 03 EF 9012",
        color: "Blue",
      },
      documents: {
        license: { status: "verified", expiryDate: "2027-03-22" },
        registration: { status: "verified", expiryDate: "2026-01-15" },
        insurance: { status: "expired", expiryDate: "2024-01-10" },
        photo: { status: "verified" },
      },
      stats: {
        totalTrips: 890,
        rating: 4.2,
        earnings: 89000,
        joinedDate: "2023-08-10",
      },
      verification: {
        status: "verified",
        verifiedAt: "2023-08-15",
        verifiedBy: "Admin",
        suspendedAt: "2024-01-12",
        suspensionReason: "Insurance expired",
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "expired":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (driverId: string) => {
    console.log("Approving driver:", driverId)
  }

  const handleReject = (driverId: string) => {
    console.log("Rejecting driver:", driverId)
  }

  const handleSuspend = (driverId: string) => {
    console.log("Suspending driver:", driverId)
  }

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
              <span className="text-xl font-bold">Driver Management</span>
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
                  placeholder="Search drivers..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                {drivers.filter((d) => d.status === "active").length} Active
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                {drivers.filter((d) => d.status === "pending").length} Pending
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                {drivers.filter((d) => d.status === "suspended").length} Suspended
              </Badge>
            </div>
          </div>
        </Card>

        {/* Drivers List */}
        <div className="grid gap-6">
          {filteredDrivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{driver.name}</h3>
                        <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{driver.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{driver.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {driver.stats.joinedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Vehicle Info */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-sm">
                        <Car className="w-4 h-4" />
                        <span>Vehicle Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Make/Model:</span>
                        <span className="font-medium">
                          {driver.vehicle.make} {driver.vehicle.model}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{driver.vehicle.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plate:</span>
                        <span className="font-medium">{driver.vehicle.plateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{driver.vehicle.color}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documents Status */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>License:</span>
                        <div className="flex items-center space-x-1">
                          {getDocumentIcon(driver.documents.license.status)}
                          <Badge className={getStatusColor(driver.documents.license.status)}>
                            {driver.documents.license.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Registration:</span>
                        <div className="flex items-center space-x-1">
                          {getDocumentIcon(driver.documents.registration.status)}
                          <Badge className={getStatusColor(driver.documents.registration.status)}>
                            {driver.documents.registration.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Insurance:</span>
                        <div className="flex items-center space-x-1">
                          {getDocumentIcon(driver.documents.insurance.status)}
                          <Badge className={getStatusColor(driver.documents.insurance.status)}>
                            {driver.documents.insurance.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Photo:</span>
                        <div className="flex items-center space-x-1">
                          {getDocumentIcon(driver.documents.photo.status)}
                          <Badge className={getStatusColor(driver.documents.photo.status)}>
                            {driver.documents.photo.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats & Actions */}
                  <Card className="p-4 bg-white/50 border border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-sm">Performance Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Trips:</span>
                        <span className="font-medium">{driver.stats.totalTrips}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">
                          {driver.stats.rating > 0 ? `${driver.stats.rating} ⭐` : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Earnings:</span>
                        <span className="font-medium">₹{driver.stats.earnings.toLocaleString()}</span>
                      </div>

                      <div className="pt-3 space-y-2">
                        {driver.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(driver.id)}
                              className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(driver.id)}
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {driver.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuspend(driver.id)}
                            className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {driver.status === "suspended" && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(driver.id)}
                            className="w-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
