"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  BarChart3,
  Bot,
  FileText,
  Smartphone,
  Globe,
  Zap,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function WhatsAppDashboard() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const stats = {
    totalMessages: 15420,
    deliveredToday: 1250,
    deliveryRate: 98.5,
    responseRate: 85.2,
    activeTemplates: 12,
    pendingApproval: 3,
  }

  const templates = [
    {
      id: "booking_confirmation",
      name: "Booking Confirmation",
      status: "approved",
      category: "booking",
      language: "en",
      lastUsed: "2 hours ago",
      usage: 1250,
      content:
        "Hi {{customer_name}}, your booking {{booking_id}} has been confirmed! Driver {{driver_name}} will pick you up at {{pickup_time}}.",
    },
    {
      id: "driver_assigned",
      name: "Driver Assigned",
      status: "approved",
      category: "booking",
      language: "en",
      lastUsed: "5 minutes ago",
      usage: 890,
      content:
        "Great news! {{driver_name}} is your driver. Vehicle: {{vehicle_details}}. Track live: {{tracking_link}}",
    },
    {
      id: "driver_arrived",
      name: "Driver Arrived",
      status: "approved",
      category: "pickup",
      language: "en",
      lastUsed: "1 hour ago",
      usage: 750,
      content: "{{driver_name}} has arrived at your pickup location. Please come out when ready!",
    },
    {
      id: "trip_started",
      name: "Trip Started",
      status: "pending",
      category: "journey",
      language: "en",
      lastUsed: "Never",
      usage: 0,
      content: "Your trip has started! Estimated arrival: {{eta}}. Track your ride: {{tracking_link}}",
    },
  ]

  const notificationJourney = [
    {
      step: 1,
      title: "Booking Initiation",
      description: "Booking request received confirmation",
      template: "booking_confirmation",
      timing: "Immediate",
      status: "active",
    },
    {
      step: 2,
      title: "Driver Assignment",
      description: "Driver assigned with vehicle details",
      template: "driver_assigned",
      timing: "Within 2 minutes",
      status: "active",
    },
    {
      step: 3,
      title: "Driver En Route",
      description: "Driver heading to pickup location",
      template: "driver_enroute",
      timing: "When driver starts",
      status: "active",
    },
    {
      step: 4,
      title: "Driver Arrived",
      description: "Driver reached pickup location",
      template: "driver_arrived",
      timing: "On arrival",
      status: "active",
    },
    {
      step: 5,
      title: "Trip Started",
      description: "Journey begins with ETA",
      template: "trip_started",
      timing: "Trip start",
      status: "pending",
    },
    {
      step: 6,
      title: "Trip Completed",
      description: "Journey completed with invoice",
      template: "trip_completed",
      timing: "On completion",
      status: "active",
    },
  ]

  const recentMessages = [
    {
      id: "MSG001",
      customer: "Priya Sharma",
      phone: "+91 98765 43210",
      template: "driver_assigned",
      status: "delivered",
      sentAt: "2 minutes ago",
      tripId: "TR001",
    },
    {
      id: "MSG002",
      customer: "Amit Patel",
      phone: "+91 87654 32109",
      template: "booking_confirmation",
      status: "delivered",
      sentAt: "5 minutes ago",
      tripId: "TR002",
    },
    {
      id: "MSG003",
      customer: "Neha Gupta",
      phone: "+91 76543 21098",
      template: "driver_arrived",
      status: "failed",
      sentAt: "8 minutes ago",
      tripId: "TR003",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "delivered":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "delivered":
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
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
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">WhatsApp Business</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-green-500 text-white hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.totalMessages.toLocaleString()}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Messages</p>
                  <p className="text-2xl font-bold">{stats.deliveredToday.toLocaleString()}</p>
                </div>
                <Send className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                  <p className="text-2xl font-bold">{stats.deliveryRate}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold">{stats.responseRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Templates</p>
                  <p className="text-2xl font-bold">{stats.activeTemplates}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold">{stats.pendingApproval}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Notification Journey */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Notification Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationJourney.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 border border-blue-100 rounded-lg bg-white/50"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{step.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{step.title}</h4>
                          <Badge className={getStatusColor(step.status)}>
                            {getStatusIcon(step.status)}
                            <span className="ml-1">{step.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Template: {step.template}</span>
                          <span>•</span>
                          <span>Timing: {step.timing}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Templates */}
            <Card className="p-6 mt-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Message Templates</span>
                  <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Template
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-blue-100 rounded-lg bg-white/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Used {template.usage} times</span>
                        <Button variant="outline" size="sm" className="bg-transparent border-blue-200 hover:bg-blue-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{template.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Category: {template.category}</span>
                      <span>•</span>
                      <span>Language: {template.language}</span>
                      <span>•</span>
                      <span>Last used: {template.lastUsed}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Recent Messages</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 border border-blue-100 rounded-lg bg-white/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{message.customer}</span>
                      <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Template: {message.template}</p>
                      <p>Trip: {message.tripId}</p>
                      <p>Sent: {message.sentAt}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Templates
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Chatbot Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-blue-200 hover:bg-blue-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  API Configuration
                </Button>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Integration Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">WhatsApp Business API</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Message Templates</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">12 Approved</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Webhook Events</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Configuring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Chatbot</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Overview */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Message Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold">15,420</p>
                <p className="text-sm text-gray-600">Messages Sent</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-gray-600">Delivery Rate</p>
                <p className="text-xs text-blue-600">+2.1% improvement</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">85.2%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-xs text-purple-600">+5.3% this week</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">4,230</p>
                <p className="text-sm text-gray-600">Active Chats</p>
                <p className="text-xs text-blue-600">+8% today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
