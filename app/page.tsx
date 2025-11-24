"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookingInterface from "@/components/booking-interface"
import Image from "next/image"
import {
  MapPin,
  Star,
  CreditCard,
  Play,
  Apple,
  Phone,
  Mail,
  User,
  Car,
  Clock,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Navigation,
  Smartphone,
  Zap,
  Shield,
  Heart,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import { Description } from "@radix-ui/react-toast"

const screens = [
  "/screen-logo.jpg",
  "/screen-booking.jpg",
  "/screenshot-3.jpg",
  "/screenshot-4.jpg",
  "/screenshot-5.jpg",
  "/screenshot-6.jpg",
  "/screenshot-7.jpg",
  "/screenshot-8.jpg"
]

export default function InDrivePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [animatedStats, setAnimatedStats] = useState({ drivers: 0, waitTime: 0, rides: 0 })
  const [isVisible, setIsVisible] = useState(false)
  type FloatingElement = { id: number; x: number; y: number; delay: number; size: number; opacity: number }
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const generateFloatingElements = () =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 30 + 10, // Made them a bit larger
      opacity: Math.random() * 0.2 + 0.05,
    }))


  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats((prev) => ({
          drivers: prev.drivers < 2254 ? prev.drivers + 23 : 2254,
          waitTime: prev.waitTime < 3.2 ? Math.min(prev.waitTime + 0.1, 3.2) : 3.2,
          rides: prev.rides < 7743 ? prev.rides + 87 : 7743,
        }))
      }, 30)

      setTimeout(() => clearInterval(interval), 3000)
    }, 800)

    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setFloatingElements(elements)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(testimonialInterval)
    }
  }, [])

  const bookingSteps = [
    {
      title: "Set Pickup Location", icon: MapPin,
      description: "Enter your pickup point or use GPS to auto-detect your location."
    },
    {
      title: "Choose Destination",
      description: "Type your drop-off address or select from recent locations.", icon: Navigation
    },
    {
      title: "Select Vehicle Type",
      description: " Pick from Mini, Sedan, SUV, MUV, or Luxury cars — based on your need", icon: Car
    },
    {
      title: "Set Your Fare",
      description: "Decide your price. Drivers compete for your trip, ensuring fair rides.", icon: CreditCard
    },
    {
      title: "Confirm Booking",
      description: "Get instant ride confirmation with driver & vehicle details.", icon: CheckCircle
    },
  ]

  const benefits = [
    {
      title: "Fair & Transparent Pricing",
      description:
        "No surge charges – you set the fare and drivers compete for your ride.",
    },
    {
      title: "Verified Drivers",
      description:
        "All drivers are trained, experienced, and background-checked for safety.",
    },
    {
      title: "Fast Pickups",
      description:
        "Average wait time of just a few minutes across Mumbai’s busiest areas.",
    },
    {
      title: "Wide Fleet Options",
      description:
        "Choose from Mini, Sedan, SUV, MUV, or Luxury cars depending on your travel need.",
    },
    {
      title: "Multiple Ride Types",
      description:
        "Local Flexi rides, hourly/daily rentals, airport transfers, and outstation trips.",
    },
    {
      title: "24x7 Availability",
      description: "Reliable cab booking in Mumbai, anytime you need.",
    },
    {
      title: "Tech + Human Support",
      description:
        "Live tracking, digital payments, and a call-centre to assist.",
    },
  ];

  const vehicleTypes = [
    {
      id: "Mini",
      name: "Mini",
      image: "/swift.jpg",
      desc: "Quick & economical",
    },
    {
      id: "Sedan",
      name: "Sedan",
      image: "/economy.jpg",
      desc: "Affordable rides",
    },
    {
      id: "SUV",
      name: "SUV",
      image: "/SUV.jpg",
      desc: "Premium experience",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Executive",
      rating: 5,
      review: "Game changer! I save ₹200+ daily with fair pricing. No more surge pricing stress!",
      avatar: "/user-avatar-female.jpg",
    },
    {
      name: "Rahul Mehta",
      role: "Software Engineer",
      rating: 5,
      review: "Reliable and safe. The driver verification gives me complete peace of mind.",
      avatar: "/user-avatar-female.jpg",
    },
    {
      name: "Anjali Patel",
      role: "Doctor",
      rating: 5,
      review: "Perfect for my night shifts. Always find a ride, even at 3 AM!",
      avatar: "/user-avatar-female.jpg",
    },
  ]
  useEffect(() => {
    setIsVisible(true)
    setFloatingElements(generateFloatingElements())
  }, [])

  useEffect(() => {
    // Set up an interval to change the screen every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length)
    }, 3000)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  // This function determines the style of each slide based on its position
  const getSlideStyle = (index: number) => {
    // Current (center) slide
    if (index === currentIndex) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 10,
      }
    }

    // Previous slide (to the left)
    const prevIndex = (currentIndex - 1 + screens.length) % screens.length
    if (index === prevIndex) {
      return {
        transform: "translateX(-50%) scale(0.8)",
        opacity: 0.7,
        zIndex: 5,
      }
    }

    // Next slide (to the right)
    const nextIndex = (currentIndex + 1) % screens.length
    if (index === nextIndex) {
      return {
        transform: "translateX(50%) scale(0.8)",
        opacity: 0.7,
        zIndex: 5,
      }
    }

    // Other hidden slides
    return {
      transform: "scale(0.7)",
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <section
        id="booking"
        className="relative lg:min-h-screen flex lg:items-center lg:py-20 lg:px-4 overflow-hidden isolate"
      >
        {/* LAYER 1: The Background Image (Now it will be visible) */}
        <div className="absolute inset-0 w-full h-full z-[-2]">
          <img
            src="/heroimage1.png"
            alt="A modern cab on a city street at dusk"
            className="w-full h-full object-cover"
          />
        </div>

        {/* LAYER 2: Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-[-1]" />

        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden z-[-1]">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="absolute bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                opacity: element.opacity,
                animation: `float 8s ease-in-out infinite ${element.delay}s, pulse 4s ease-in-out infinite ${element.delay * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* LAYER 3: Main Content Container (This part was already correct) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div
            className={`w-full transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
      
      // DESKTOP STYLES (lg and up)
      lg:max-w-xl lg:bg-black/20 lg:backdrop-blur-lg lg:p-8 lg:rounded-2xl lg:border lg:border-white/20 lg:shadow-2xl`
            }
          >
            {/* On mobile, this h1 needs its own padding. On desktop, the parent provides it. */}
            <h1 className="text-xl lg:text-4xl font-bold mb-6 leading-tight text-white px-6 pt-10 lg:p-0 text-justify">
              Your Ride, Just a Tap Away
            </h1>
            <BookingInterface />
          </div>

        </div>


        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </section>

      <section className="py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-4xl font-bold mb-6 text-gray-900">
              Cab & Taxi Services in
              <br />
              <span className="text-blue-600 bg-clip-text">
                Mumbai, Pune & Bhopal
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto text-justify">
              Eion Rides offers safe, reliable, and affordable cabs across major Indian cities. Whether it’s daily office travel, airport transfers, or weekend getaways, our cab booking services in Mumbai, Pune, and Bhopal are designed for comfort and convenience.            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Mumbai Destinations */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative mb-6">
                <img
                  src="/mumbai-gateway-of-india.webp"
                  alt="Gateway of India Mumbai"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                  Mumbai
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Mumbai</h3>
              <p className="my-3">Taxi & Cab Services in Mumbai – Local & Outstation.</p>
              <p className="my-3">Serving popular locations like Andheri, Bandra, Colaba, Dadar, Goregaon, Juhu and more.</p>
              <p className="my-3">Book airport cabs, office commute rides, outstation taxis, or hourly rentals in Mumbai.</p>
              <p className="my-3 font-bold">More Areas Coming Soon...</p>
            </div>

            {/* Pune Destinations */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative mb-6">
                <img
                  src="/pune-shaniwar-wada.jpeg"
                  alt="Shaniwar Wada Pune"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                  Pune
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pune</h3>
              <p className="my-3">Affordable Cab Booking in Pune – Local & Outstation</p>
              <p className="my-3">Available in Koregaon Park, Baner, Wakad, Hinjewadi, Kothrud, Deccan.</p>
              <p className="my-3"> Choose daily rentals, Pune airport taxis, corporate travel, or weekend getaways with Eion Rides.</p>
              <p className="my-3 font-bold">More Areas Coming Soon...</p>

            </div>

            {/* Bhopal Destinations */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="relative mb-6">
                <img
                  src="/bhopal-upper-lake.jpg"
                  alt="Upper Lake Bhopal"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                  Bhopal
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Bhopal</h3>
              <p className="my-3">Trusted Taxi Service in Bhopal – City & Beyond</p>
              <p className="my-3"> Now serving New Market, MP Nagar, Arera Colony, Kolar, Shahpura, Habibganj.</p>
              <p className="my-3"> Book affordable local rides, Bhopal airport transfers, and outstation taxis with ease.</p>
              <p className="my-3 font-bold">More Areas Coming Soon...</p>

            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-full px-8 py-4 shadow-lg">
              <MapPin className="w-6 h-6 text-blue-600 mr-3" />
              <a href="/#booking">
                <button className="text-lg font-semibold text-gray-900 
               hover:scale-105 
             transition-all duration-300 ease-in-out">
                  Book your ride to any destination with Eion Rides
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        // --- CHANGES START HERE ---
        className="relative py-20 px-4 border-b border-white/10 isolate overflow-hidden" // 1. Added relative, isolate, overflow-hidden and changed border color
      // --- CHANGES END HERE ---
      >
        {/* LAYER 1: The Background Image */}
        <div className="absolute inset-0 w-full h-full z-[-2]">
          <img
            src="/secondpageimage.jpg" // <-- IMPORTANT: Replace with your actual image file name
            alt="Abstract city lights or a relevant background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* LAYER 2: Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/70 z-[-1]" />

        {/* LAYER 3: Main Content (Brought to the front) */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">

          {/* Badge updated for dark background */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
            <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-white font-semibold">India’s Trusted & Fastest Growing Ride Platform</span>
          </div>

          {/* Text colors updated for dark background */}
          <h2 className="text-xl lg:text-4xl font-bold mb-4 text-white">
            Why Riders in Mumbai, Pune & Bhopal Trust <span className="text-blue-600">"Eion Rides"</span>?
          </h2>
          <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto text-justify">
            Thousands of riders rely on Eion Rides for safe, reliable, and affordable cab booking services. Whether it’s daily office commute, airport transfers, or outstation trips, we make every ride fast and hassle-free.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                value: animatedStats.drivers,
                label: "Verified Drivers Online",
                description: "Experienced, trained, and background-checked drivers ready to serve you.",
                icon: Car,
                color: "text-blue-600",
                bgColor: "bg-blue-600/10",
                suffix: "+",
              },
              {
                value: animatedStats.waitTime,
                label: "Average Wait Time",
                description: "Quick pickups across Mumbai, Pune & Bhopal — skip the long waits.",
                icon: Clock,
                color: "text-indigo-600",
                bgColor: "bg-indigo-500/10",
                suffix: " min",
              },
              {
                value: animatedStats.rides,
                label: "Happy Rides Completed",
                description: "Thousands of riders trust us for comfort, safety & transparent pricing.",
                icon: CheckCircle,
                color: "text-purple-600",
                bgColor: "bg-purple-500/10",
                suffix: "+",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                  {typeof stat.value === "number" && stat.value % 1 !== 0
                    ? stat.value.toFixed(1)
                    : Math.floor(stat.value)}
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</h3>
                <p className="text-gray-600 font-medium text-justify">{stat.description}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Fair Prices Section */}
      <section className="bg-blue-50 text-blue-600 py-4 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xl lg:text-4xl font-bold mb-6">
              Smart Cab Rides in India
              <br />
              <p className="ml-14 ">Fair Prices, No Surprises</p>
            </h2>
            <p className="text-black mb-8 text-lg">
              In today’s congested cities, parking hassles, maintenance worries, and unreliable rides waste time and energy. EionRides solves this with on-demand rentals, professional drivers, and real-time tech —delivering flexibility,  comfort, and peace of mind for city commutes or long journeys.
              More than just a cab service, we’re a commitment to smarter, accessible, tech-enabled mobility, built on the values of safety, trust, and innovation.
              EionRides. Your Route, Our Responsibility.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xl text-blue-600">You set the fare – pay what’s fair, no hidden costs</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xl text-blue-600">Drivers compete for your trip – better availability</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xl text-blue-600">No surge pricing – same fair price, peak or off-peak</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xl text-blue-600">Flexible ride options – city rides, rentals, or outstation</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xl text-blue-600">Tech-enabled + human-backed – live tracking & 24x7 support</span>
              </div>
              <h4 className="text-blue-600">This isn’t just another cab service — it’s our promise of smarter, fairer, and more accessible travel for all.</h4>
            </div>
          </div>
          <div>
            <img src="/taxi.webp" alt="Taxi in Mumbai" className="rounded-lg w-full" />
          </div>
        </div>
        <a href="/#booking" className="flex justify-center">
          <button className="font-semibold text-white mt-10 bg-blue-700 border-spacing-300 px-2 py-2 rounded-full text-xs lg:text-lg">
            Eion Rides – Your Route, Our Responsibility.
          </button>
        </a>

      </section>

      {/* Vehicle Types */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl lg:text-4xl font-bold text-center mb-4">
            Eion Rides offers a variety of
            transport services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {vehicleTypes.map((vehicle) => (
              <Card key={vehicle.id} className="p-6 text-center">
                <CardContent className="p-0">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600">{vehicle.time}</p>
                  <p className="text-gray-600 mt-2">{vehicle.price}</p>
                  <p className="text-gray-600 mt-4">{vehicle.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="bg-blue-50 text-gray-900 py-20 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"   // <-- replace with your logo path
                  alt="Eion Rides Logo"
                  className="h-16 w-auto"
                />
              </a>
            </div>
            <h2 className="text-xl lg:text-4xl font-bold  leading-tight">
              Download the
              <br />
              <span className="text-blue-600">
                Eion Rides app
              </span>
            </h2>
            <h3 className="mb-4">–
              Your Cab, Anytime, Anywhere</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Hassle-free cab booking, available 24/7 on all platforms.            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.isoftinc.eion_customer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  className="h-16 w-48 object-contain"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/eion-rides/id6747707285"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/appstore.png"
                  alt="Download on the App Store"
                  className="h-16 w-48 object-contain"
                />
              </a>
            </div>


            <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Free Download</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px]">
              {screens.map((src, index) => (
                <div
                  key={src}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  style={getSlideStyle(index)}
                >
                  <Image
                    src={src}
                    alt={`App screenshot ${index + 1}`}
                    width={300} // Adjust width as needed
                    height={600} // Adjust height as needed
                    className="object-contain h-full w-auto drop-shadow-2xl"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
          </div>
        </div>
      </section>


      {/* How to Book */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="font-bold text-center mb-12">
            <h2 className="text-xl lg:text-4xl">
              How to Book a Cab with Eion Rides
            </h2>
            <h3 className=""> Step-by-Step Flow
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bookingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl"><step.icon className="w-8 h-8 text-white" /></span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600"> {step.description}
                </p>
              </div>
            ))}
          </div>
          <a href="/#booking" className="flex justify-center">
            <button className="text-lg font-semibold text-white mt-12 bg-blue-700 lg:border-spacing-600 lg:px-6 lg:py-3 rounded-full border-spacing-300 py-2 px-2">
              Book your ride now with Eion Rides
            </button>
          </a>

        </div>
      </section>

      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl lg:text-4xl font-bold text-center mb-12">
            What are the main advantages
            <br />
            of booking a cab in
            <br />
            Mumbai with Eion Rides
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Enhanced Customer Reviews with rotation */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-100 rounded-full px-6 py-2 mb-6">
              <Star className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-700 font-semibold">4.8/5 Average Rating</span>
            </div>
            <h2 className="text-xl lg:text-4xl font-bold mb-4">Why Thousands Choose Eion Rides –
            </h2>
            <p className="text-black text-xl lg:text-4xl font-bold">Hear From Our Riders</p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                "{testimonials[currentTestimonial].review}"
              </blockquote>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Notification Journey */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl lg:text-4xl font-bold text-center mb-4">
            Ride Updates Made Simple – Straight to Your

            <span className="text-blue-600"> WhatsApp</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Get real-time updates throughout your journey via WhatsApp - from booking confirmation to trip completion.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Booking Confirmed",
                desc: "Instant confirmation with trip details and reference number",
                icon: CheckCircle,
                color: "bg-blue-500",
              },
              {
                step: "2",
                title: "Driver Assigned",
                desc: "Driver details, vehicle info, and live location sharing",
                icon: User,
                color: "bg-green-500",
              },
              {
                step: "3",
                title: "En Route Updates",
                desc: "Real-time arrival time and location tracking",
                icon: Navigation,
                color: "bg-orange-500",
              },
              {
                step: "4",
                title: "Trip Complete",
                desc: "Invoice, payment confirmation, and rating request",
                icon: Star,
                color: "bg-purple-500",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-sm text-center">{item.desc}</p>
                <div className="flex items-center justify-center mt-4">
                  <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-green-600 font-medium">WhatsApp Alert</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl lg:text-4xl font-bold mb-8">
            Multiple Ways to <span className="text-blue-600">Join</span> Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mail, title: "Email", desc: "Quick email verification", color: "bg-blue-500" },
              { icon: Phone, title: "Mobile OTP", desc: "SMS verification", color: "bg-green-500" },
              { icon: User, title: "Username", desc: "Traditional login", color: "bg-purple-500" },
              { icon: Smartphone, title: "Social Login", desc: "Google, Facebook, Apple", color: "bg-orange-500" },
            ].map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
