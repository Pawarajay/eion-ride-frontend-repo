"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit, Save, ArrowLeft, Shield, Star, Award } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1992-05-15",
    address: "Andheri West, Mumbai, Maharashtra",
    emergencyContact: "Raj Sharma",
    emergencyPhone: "+91 98765 43211",
  })

  const [userStats, setUserStats] = useState({
    memberSince: "January 2024",
    totalTrips: 24,
    rating: 4.9,
    totalSpent: 4200,
    favoriteDriver: "Rajesh Kumar",
    preferredVehicle: "Sedan",
  })

  const achievements = [
    { icon: Star, title: "5-Star Passenger", description: "Maintained 4.9+ rating", color: "bg-yellow-500" },
    { icon: Award, title: "Frequent Rider", description: "Completed 20+ trips", color: "bg-blue-500" },
    { icon: Shield, title: "Verified Account", description: "Phone & email verified", color: "bg-green-500" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data
  }

  const updateProfileData = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <Button onClick={handleSave} className="bg-lime-400 text-black hover:bg-lime-500">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-lime-400 to-green-500 rounded-xl p-6 text-black"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="/user-avatar-female.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="opacity-80">Member since {userStats.memberSince}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{userStats.rating}</span>
                </div>
                <Badge className="bg-white text-black">{userStats.totalTrips} trips</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    {isEditing ? (
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => updateProfileData("firstName", e.target.value)}
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    {isEditing ? (
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => updateProfileData("lastName", e.target.value)}
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{profileData.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => updateProfileData("email", e.target.value)}
                        className="pl-10"
                      />
                    ) : (
                      <p className="p-3 pl-10 bg-gray-50 rounded-lg">{profileData.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => updateProfileData("phone", e.target.value)}
                        className="pl-10"
                      />
                    ) : (
                      <p className="p-3 pl-10 bg-gray-50 rounded-lg">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {isEditing ? (
                      <Input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => updateProfileData("dateOfBirth", e.target.value)}
                        className="pl-10"
                      />
                    ) : (
                      <p className="p-3 pl-10 bg-gray-50 rounded-lg">
                        {new Date(profileData.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    {isEditing ? (
                      <textarea
                        value={profileData.address}
                        onChange={(e) => updateProfileData("address", e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="p-3 pl-10 bg-gray-50 rounded-lg">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                    {isEditing ? (
                      <Input
                        value={profileData.emergencyContact}
                        onChange={(e) => updateProfileData("emergencyContact", e.target.value)}
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{profileData.emergencyContact}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        value={profileData.emergencyPhone}
                        onChange={(e) => updateProfileData("emergencyPhone", e.target.value)}
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{profileData.emergencyPhone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trips</span>
                  <span className="font-semibold">{userStats.totalTrips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{userStats.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">₹{userStats.totalSpent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorite Driver</span>
                  <span className="font-semibold text-sm">{userStats.favoriteDriver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preferred Vehicle</span>
                  <span className="font-semibold">{userStats.preferredVehicle}</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
