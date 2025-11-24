"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Search,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Send,
} from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  })

  const supportTickets = [
    {
      id: "SUP001",
      subject: "Payment not processed",
      status: "resolved",
      priority: "high",
      date: "2024-01-15",
      lastUpdate: "2 hours ago",
    },
    {
      id: "SUP002",
      subject: "Driver was late",
      status: "in-progress",
      priority: "medium",
      date: "2024-01-14",
      lastUpdate: "1 day ago",
    },
    {
      id: "SUP003",
      subject: "App not working properly",
      status: "pending",
      priority: "low",
      date: "2024-01-12",
      lastUpdate: "3 days ago",
    },
  ]

  const faqCategories = [
    {
      title: "Booking & Rides",
      icon: "🚗",
      questions: [
        "How do I book a ride?",
        "Can I schedule a ride in advance?",
        "How do I cancel a booking?",
        "What if my driver is late?",
      ],
    },
    {
      title: "Payments & Billing",
      icon: "💳",
      questions: [
        "What payment methods are accepted?",
        "How do I add a payment method?",
        "Why was I charged extra?",
        "How do I get a refund?",
      ],
    },
    {
      title: "Account & Profile",
      icon: "👤",
      questions: [
        "How do I update my profile?",
        "I forgot my password",
        "How do I delete my account?",
        "How do I change my phone number?",
      ],
    },
    {
      title: "Safety & Security",
      icon: "🛡️",
      questions: [
        "How do you ensure rider safety?",
        "What if I left something in the car?",
        "How do I report a safety issue?",
        "Are drivers background checked?",
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <HelpCircle className="w-4 h-4" />
    }
  }

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

          <Button className="bg-lime-400 text-black hover:bg-lime-500">
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">We're here to help you with any questions or issues</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0 text-center">
              <MessageCircle className="w-8 h-8 text-lime-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help from our support team</p>
            </CardContent>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0 text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Support</h3>
              <p className="text-sm text-gray-600">Speak directly with our support team</p>
            </CardContent>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowContactForm(true)}
          >
            <CardContent className="p-0 text-center">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">Send us a detailed message</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="flex items-center space-x-2 font-semibold text-lg mb-3">
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.title}</span>
                    </h3>
                    <div className="space-y-2">
                      {category.questions.map((question, qIndex) => (
                        <div
                          key={qIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <span className="text-sm">{question}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Support Tickets */}
          <div>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Your Support Tickets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{ticket.subject}</p>
                    <div className="text-xs text-gray-500">
                      <p>Created: {ticket.date}</p>
                      <p>Last update: {ticket.lastUpdate}</p>
                    </div>
                  </motion.div>
                ))}

                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowContactForm(true)}>
                  Create New Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="p-6 mt-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">support@EionRides.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">24/7 Support Available</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input
                    value={contactForm.subject}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-lime-400 text-black hover:bg-lime-500">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => setShowContactForm(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
