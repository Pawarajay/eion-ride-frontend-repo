"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import {
  HelpCircle,
  Search,
  Phone,
  Mail,
  MessageCircle,
  User,
  Car,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
} from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState(null)

  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "booking", name: "Booking", icon: Car },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "account", name: "Account", icon: User },
    { id: "safety", name: "Safety", icon: Shield },
  ]

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a ride with Eion Rides?",
      answer:
        "To book a ride: 1) Open the app and set your pickup location, 2) Enter your destination, 3) Set your fare offer, 4) Wait for drivers to accept or make counter-offers, 5) Choose your preferred driver and confirm the booking.",
    },
    {
      id: 2,
      category: "booking",
      question: "Can I schedule a ride for later?",
      answer:
        "Yes! You can schedule rides up to 7 days in advance. Simply select 'Schedule for Later' when booking and choose your preferred date and time.",
    },
    {
      id: 3,
      category: "payment",
      question: "What payment methods are accepted?",
      answer:
        "We accept cash, credit/debit cards, UPI, digital wallets, and our in-app wallet. You can add and manage payment methods in your profile settings.",
    },
    {
      id: 4,
      category: "payment",
      question: "How does the pricing work?",
      answer:
        "With Eion Rides, you set your own fare based on distance, time, and demand. Drivers can accept your offer or make counter-offers. There's no surge pricing - you're always in control of what you pay.",
    },
    {
      id: 5,
      category: "account",
      question: "How do I create an account?",
      answer:
        "You can sign up using your email, phone number, or social media accounts (Google, Facebook, Apple). Verification is required for security purposes.",
    },
    {
      id: 6,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click 'Forgot Password' on the login screen, enter your email or phone number, and follow the instructions sent to you to reset your password.",
    },
    {
      id: 7,
      category: "safety",
      question: "How do you ensure driver safety?",
      answer:
        "All drivers undergo background checks, document verification, and vehicle inspections. We also provide real-time tracking, emergency buttons, and 24/7 support.",
    },
    {
      id: 8,
      category: "safety",
      question: "What should I do in case of an emergency?",
      answer:
        "Use the emergency button in the app to immediately alert authorities and your emergency contacts. You can also call our 24/7 safety helpline at 1800-Eion Rides.",
    },
  ]

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "1800-Eion Rides",
      availability: "24/7 Available",
      color: "bg-green-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help via chat",
      contact: "Start Chat",
      availability: "Response in 2 min",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your detailed query",
      contact: "help@EionRides.com",
      availability: "Response in 4 hours",
      color: "bg-purple-500",
    },
  ]

  const resources = [
    {
      icon: BookOpen,
      title: "User Guide",
      description: "Complete guide to using Eion Rides",
      link: "#",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video instructions",
      link: "#",
    },
    {
      icon: FileText,
      title: "Terms & Conditions",
      description: "Legal terms and policies",
      link: "#",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we protect your data",
      link: "#",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            How can we <span className="text-purple-400">help you?</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find answers to your questions or get in touch with our support team
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Support</h2>
            <p className="text-xl text-gray-600">Choose the best way to reach us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-0 text-center">
                  <div
                    className={`w-16 h-16 ${channel.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <channel.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
                  <p className="text-gray-600 mb-3">{channel.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{channel.contact}</p>
                  <Badge className="bg-gray-100 text-gray-700">{channel.availability}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find quick answers to common questions</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "hover:bg-purple-50"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or browse different categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Helpful Resources</h2>
            <p className="text-xl text-gray-300">Additional resources to help you get the most out of Eion Rides</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-300 text-sm">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">Send us a message and we'll get back to you soon</p>
          </div>

          <Card className="p-8">
            <CardContent className="p-0">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Select a topic</option>
                    <option>Booking Issues</option>
                    <option>Payment Problems</option>
                    <option>Account Help</option>
                    <option>Safety Concerns</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>

                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
<Footer />
    </div>
  )
}
