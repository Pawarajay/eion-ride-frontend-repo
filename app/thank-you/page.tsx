"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CheckCircle, Download, Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import Script from "next/script"
import { Mail, Phone, Car, Home } from "lucide-react";

export default function ThankYouPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    // Generate confetti elements
    const confettiElements = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
    setConfetti(confettiElements)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ✅ Conversion tracking script */}
      <Script id="conversion-event" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17631308778/Ilu-CP3Pw6obEOrXoddB',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
      <Navbar />

      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-fall"
            style={{
              left: `${item.x}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          />
        ))}
      </div>

      <main className="pt-20 px-4">
        {/* Success Hero Section */}
        <section className="py-16 px-4">

          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center px-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                🚖 Thank You for Choosing
                <br className="sm:hidden" />
                <span className="block sm:inline"> Eion Rides! 🎉</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
                Your booking has been successfully received. 🎉
              </p>
            </div>

          </div>
        </section>

        {/* Download App Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl mx-auto max-w-6xl mb-16">
          <div className="px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Download className="w-12 h-12 text-white mr-4" />
              <h2 className="text-4xl font-bold text-white">
                While You Wait, Download Our App
              </h2>
            </div>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get ready for the smoothest ride experience. Book cabs in seconds with our mobile app.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <a
                href="https://play.google.com/store/apps/details?id=com.isoftinc.eion_customer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  className="h-16 w-auto"
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
                  className="h-16 w-auto"
                />
              </a>
            </div>

            {/* App Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Book rides in seconds",
                "Real-time tracking",
                "Multiple payment options",
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Next Section */}
        <section className="py-16 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What Happens Next?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "We Review Your Message",
                description: "Our support team carefully reads your inquiry and gathers any necessary information.",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "2",
                title: "Expert Response",
                description: "A dedicated team member prepares a personalized response to address your concerns.",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                step: "3",
                title: "Get Your Answer",
                description: "You'll receive a detailed response via email within 24 hours (usually much sooner!).",
                color: "from-purple-500 to-purple-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-blue-50 rounded-3xl max-w-6xl mx-auto mb-16">
          <div className="px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Explore More While You Wait
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Return Home</h3>
                  <p className="text-gray-600 text-sm">Explore our services</p>
                </div>
              </Link>

              <Link href="/#booking">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Book a Ride</h3>
                  <p className="text-gray-600 text-sm">Get started now</p>
                </div>
              </Link>

              <Link href="/contact">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Learn More</h3>
                  <p className="text-gray-600 text-sm">About our services</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 max-w-4xl mx-auto text-center px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Our support team is available 24/7 to assist you
            </p>

            {/* Buttons in vertical flex layout */}
            <div className="flex flex-col justify-center items-center gap-4">
              <a href="tel:+916232107555" className="w-full sm:w-2/3">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 px-4 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl whitespace-normal">
                  <Phone aria-hidden="true" className="w-5 h-5" /> Call Us Now: +916232107555
                </Button>
              </a>
              <a href="mailto:support@eionrides.com" className="w-full sm:w-2/3">
                <Button className="w-full bg-blue-800 text-white hover:bg-blue-900 px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl">
                  <Mail aria-hidden="true" className="w-5 h-5" /> Email Support
                </Button>
              </a>
            </div>
          </div>
        </section>


      </main>

      <Footer />

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  )
}