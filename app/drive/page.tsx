"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import {
  Car,
  DollarSign,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Calculator,
  Shield,
  Smartphone,
  Award,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

export default function DrivePage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [hoursPerDay, setHoursPerDay] = useState(8)
  const [daysPerWeek, setDaysPerWeek] = useState(6)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cities = ["Mumbai", "Pune", "Bhopal"]

  const earningsData = {
    Mumbai: { perKm: 12, avgTrips: 15, avgDistance: 8 },
    Pune: { perKm: 11, avgTrips: 14, avgDistance: 7 },
    Bhopal: { perKm: 10, avgTrips: 12, avgDistance: 6 },
  }

  const calculateEarnings = () => {
    const data = earningsData[selectedCity]
    const dailyEarnings = data.avgTrips * data.avgDistance * data.perKm
    const weeklyEarnings = dailyEarnings * daysPerWeek
    const monthlyEarnings = weeklyEarnings * 4.33

    return {
      daily: Math.round(dailyEarnings),
      weekly: Math.round(weeklyEarnings),
      monthly: Math.round(monthlyEarnings),
    }
  }

  const earnings = calculateEarnings()

  const benefits = [
    {
      icon: DollarSign,
      title: "Flexible Earnings",
      description: "Set your own rates and earn more with our fair pricing model. No commission caps.",
      highlight: "Earn ₹25,000-₹45,000/month",
    },
    {
      icon: Clock,
      title: "Work Your Hours",
      description: "Complete flexibility to work when you want. Be your own boss with no fixed schedules.",
      highlight: "100% flexible timing",
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Comprehensive insurance coverage for you and your vehicle during rides.",
      highlight: "₹10 lakh coverage",
    },
    {
      icon: Smartphone,
      title: "Easy App Interface",
      description: "User-friendly driver app with navigation, earnings tracking, and instant payments.",
      highlight: "Simple & intuitive",
    },
    {
      icon: Users,
      title: "Driver Community",
      description: "Join a supportive community of drivers with regular meetups and support.",
      highlight: "25,000+ drivers",
    },
    {
      icon: Award,
      title: "Performance Rewards",
      description: "Earn bonuses and rewards for excellent service and high ratings.",
      highlight: "Monthly bonuses",
    },
  ]

  const requirements = [
    {
      category: "Driver Requirements",
      items: [
        "Valid driving license (minimum 1 year old)",
        "Age between 21-65 years",
        "Clean driving record",
        "Basic smartphone knowledge",
        "Local area knowledge",
      ],
    },
    {
      category: "Vehicle Requirements",
      items: [
        "4-wheeler in good condition",
        "Valid registration certificate",
        "Comprehensive insurance",
        "Pollution under control certificate",
        "Vehicle age less than 10 years",
      ],
    },
    {
      category: "Documents Required",
      items: [
        "Driving license",
        "Aadhaar card",
        "PAN card",
        "Vehicle registration",
        "Insurance papers",
        "Bank account details",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      city: "Mumbai",
      experience: "2 years",
      rating: 4.9,
      quote: "Eion Rides changed my life. I earn 40% more than other platforms and work on my own terms.",
      monthlyEarning: "₹42,000",
    },
    {
      name: "Suresh Patel",
      city: "Pune",
      experience: "1.5 years",
      rating: 4.8,
      quote: "The flexibility is amazing. I can spend time with family and still earn well.",
      monthlyEarning: "₹38,000",
    },
    {
      name: "Venkat Reddy",
      city: "Bhopal",
      experience: "3 years",
      rating: 4.9,
      quote: "Best decision I made. Fair pricing means better earnings and happier customers.",
      monthlyEarning: "₹45,000",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-7 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
              <Car className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Drive & Earn with Eion Rides</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Your Car, Your Rules,
              <br />
              <span className="text-blue-600">Your Earnings</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of drivers earning more with fair pricing. Set your own rates, work flexible hours, and
              keep more of what you earn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/driver/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
                  Start Driving Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 bg-transparent"
              >
                Calculate Earnings
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25K+</div>
                <p className="text-gray-600">Active Drivers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">₹35K</div>
                <p className="text-gray-600">Avg Monthly Earning</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.8★</div>
                <p className="text-gray-600">Driver Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/heroimage.jpg"
              alt="Happy driver with white cab"
              className="rounded-2xl w-full shadow-2xl"
            />
            {/* <div className="absolute -top-6 -right-6 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              💰 Earn More
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow-lg border-2 border-blue-200">
              🚗 Your Schedule
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Calculate Your Potential Earnings</h2>
            <p className="text-xl text-gray-600">See how much you could earn driving with Eion Rides</p>
          </div>

          <Card className="p-8 shadow-lg">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Your City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hours per day: {hoursPerDay}</label>
                    <input
                      type="range"
                      min="4"
                      max="12"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Days per week: {daysPerWeek}</label>
                    <input
                      type="range"
                      min="3"
                      max="7"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Calculator className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">Your Potential Earnings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily Earnings:</span>
                      <span className="text-2xl font-bold text-blue-600">₹{earnings.daily}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weekly Earnings:</span>
                      <span className="text-2xl font-bold text-blue-600">₹{earnings.weekly}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                      <span className="text-gray-600">Monthly Earnings:</span>
                      <span className="text-3xl font-bold text-blue-600">₹{earnings.monthly}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    *Earnings may vary based on demand, location, and time of day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Drive with Eion Rides?</h2>
            <p className="text-xl text-gray-600">Join the platform that puts drivers first</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{benefit.highlight}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Requirements to Join</h2>
            <p className="text-xl text-gray-600">Simple requirements to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{req.category}</h3>
                  <div className="space-y-3">
                    {req.items.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Drivers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real drivers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 shadow-lg border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.city} • {testimonial.experience}
                      </p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{testimonial.rating}</span>
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Earnings:</span>
                      <span className="font-bold text-blue-600">{testimonial.monthlyEarning}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of drivers who've made the switch to better earnings and flexibility
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/driver/register">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Apply to Drive
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 bg-transparent"
            >
              Learn More
            </Button>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            Application takes less than 10 minutes. Start earning within 24 hours of approval.
          </p>
        </div>
      </section>
<Footer />
    </div>
  )
}
