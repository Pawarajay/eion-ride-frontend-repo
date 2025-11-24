"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  Clock,
  MapPin,
  Star,
  Shield,
  CreditCard,
  Users,
  Calendar,
  Route,
  CheckCircle,
  Zap,
  Heart,
  Phone,
  ArrowRight,
  Sparkles,
  Award,
  Globe,
  Loader,
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "flexi",
      name: "Flexi",
      subtitle: "Instant Pick-up & Drop",
      description:
        "Need a ride in a hurry? EION Rides Flexi offers instant pick-up and drop services with a wide range of vehicles available within 2 hours",
      icon: Zap,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      features: [
        { icon: Clock, title: "Quick & Reliable", desc: "Get a vehicle at your location within 2 hours" },
        { icon: Car, title: "Any Vehicle, Anytime", desc: "Choose from sedans, SUVs, luxury cars, or tempo travelers" },
        {
          icon: MapPin,
          title: "Perfect for Urgent Trips",
          desc: "Airport transfers, emergency meetings, or last-minute travel",
        },
        {
          icon: CheckCircle,
          title: "Simple & Hassle-free",
          desc: "One-way pick-up and drop without any waiting charges",
        },
      ],
      image: "flexi.png",
    },
    {
      id: "rental",
      name: "Rental",
      subtitle: "Hourly or Daily Car Rentals",
      description:
        "Looking for a car for a few hours or an entire day? Eion Rides Rental offers flexible hourly and daily car rental services to suit your needs",
      icon: Calendar,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      features: [
        {
          icon: Car,
          title: "Wide Vehicle Selection",
          desc: "Choose from hatchbacks, sedans, SUVs, luxury cars, and more",
        },
        { icon: Clock, title: "Flexible Duration", desc: "Rent a car for a few hours or an entire day" },
        { icon: Users, title: "With or Without Driver", desc: "Self-drive or chauffeur-driven options available" },
        { icon: CreditCard, title: "Affordable & Transparent Pricing", desc: "No hidden charges, just easy rentals" },
      ],
      image: "rental.png",
    },
    {
      id: "outstation",
      name: "Outstation",
      subtitle: "One-Way & Round-Trip Rides",
      description:
        "Planning a trip outside the city? Eion Rides Outstation offers comfortable and reliable one-way and round-trip rides to your destination.",
      icon: Route,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      features: [
        { icon: Route, title: "One-Way & Round-Trip Options", desc: "Travel as per your convenience" },
        { icon: Car, title: "Variety of Vehicles", desc: "Choose from hatchbacks, sedans, SUVs, and luxury cars" },
        { icon: Shield, title: "Professional Chauffeurs", desc: "Well-trained drivers for a smooth journey" },
        { icon: CreditCard, title: "Transparent Pricing", desc: "No hidden charges, just fair fares" },
        { icon: Calendar, title: "Flexible Booking", desc: "Book in advance or on short notice" },
      ],
      image: "outstation.png",
    },
    {
      id: "contractual",
      name: "Contractual",
      subtitle: "Long-Term Transport Agreements",
      description:
        "Looking for reliable long-term transportation? Eion Rides Contractual offers customized monthly and yearly transport agreements for businesses and individuals",
      icon: Users,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      features: [
        { icon: Calendar, title: "Flexible Contracts", desc: "Monthly, quarterly, or yearly rental plans" },
        { icon: Car, title: "Diverse Fleet", desc: "Choose from sedans, SUVs, luxury cars, and buses" },
        {
          icon: Users,
          title: "Corporate & Personal Plans",
          desc: "Ideal for businesses, executives, and staff transport",
        },
        { icon: CreditCard, title: "Cost-Effective & Hassle-Free", desc: "Fixed pricing with no surge rates" },
        { icon: Phone, title: "Maintenance & Support", desc: "24/7 customer assistance and vehicle maintenance" },
      ],
      image: "contractual.png",
    },
  ]

  const availableCities = [
    {
      name: "Mumbai",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "Andheri",
        "Bandra",
        "Colaba",
        "Dadar",
        "Goregaon",
        "Juhu",
        "Kandivali",
        "Lower Parel",
        "Malad",
        "Powai",
        "Santacruz",
        "Worli",
      ],
    },
    {
      name: "Pune",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "Koregaon Park",
        "Baner",
        "Wakad",
        "Hinjewadi",
        "Kothrud",
        "Deccan",
        "Camp",
        "Viman Nagar",
        "Hadapsar",
        "Magarpatta",
        "Aundh",
        "Pimpri",
      ],
    },
    {
      name: "Bhopal",
      image: "/mumbai-map-with-location-pin.png", // Using a placeholder image
      areas: [
        "MP Nagar",
        "Arera Colony",
        "Kolar Road",
        "BHEL",
        "Old Bhopal",
        "New Market",
        "Indrapuri",
        "Shahpura",
        "Gulmohar",
        "Hoshangabad Road",
        "Ayodhya Bypass",
        "Lalghati",
      ],
    },
  ]
  const comingSoonCities = [
    {
      name: "Delhi",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "Connaught Place",
        "Karol Bagh",
        "Lajpat Nagar",
        "Dwarka",
        "Rohini",
        "Janakpuri",
        "Saket",
        "Vasant Kunj",
        "Greater Kailash",
        "Defence Colony",
        "Nehru Place",
        "Chandni Chowk",
      ],
    },
    {
      name: "Bangalore",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "Koramangala",
        "Indiranagar",
        "Whitefield",
        "Electronic City",
        "BTM Layout",
        "Jayanagar",
        "Malleshwaram",
        "Rajajinagar",
        "HSR Layout",
        "Marathahalli",
        "Banashankari",
        "JP Nagar",
      ],
    },
    {
      name: "Hyderabad",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "Banjara Hills",
        "Jubilee Hills",
        "Gachibowli",
        "Hitech City",
        "Kondapur",
        "Madhapur",
        "Secunderabad",
        "Begumpet",
        "Ameerpet",
        "Kukatpally",
        "Miyapur",
        "Uppal",
      ],
    },
    {
      name: "Chennai",
      image: "/mumbai-map-with-location-pin.png",
      areas: [
        "T. Nagar",
        "Anna Nagar",
        "Adyar",
        "Velachery",
        "OMR",
        "Porur",
        "Tambaram",
        "Chrompet",
        "Mylapore",
        "Nungambakkam",
        "Egmore",
        "Guindy",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-8 py-3 mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-semibold">Complete Transportation Solutions</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto text-left leading-relaxed">
            EION Rides is committed to deliver quality service with a vision of excellence.
            EION Rides is committed to making transportation effortless, offering everything from rental and car hire near me to book an outstation cab in just a few clicks. Whether you need a rental nearby or an extended rental plan, we ensure high-quality vehicles, transparent pricing and excellent customer service.
            As the world moves towards smarter mobility, EION Rides stands at the forefront, redefining convenience in the car travels near me industry. So, the next time you need a reliable vehicle hire near me, think EION Rides—your ultimate car rental partner.           </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { icon: Clock, text: "Flexi Rides Pickup & Drop"},
              { icon: Heart, text: "Rental Rides" },
              { icon: Shield, text: "Outstation Rides" },
              { icon: Award, text: "Contractual Rides" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200"
              >
                <feature.icon className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
              <Globe className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">Choose Your Perfect Ride</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Transportation Made Simple</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed text-left">
              Whether you need a quick ride, hourly rental, outstation travel, or long-term transport, we have the
              perfect solution for you.
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""} space-y-8`}>
                  <div className="space-y-6">
                    <div
                      className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center shadow-xl`}
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </div>

                    <div>
                      <h3 className="text-4xl font-bold mb-3 text-gray-900">{service.name}</h3>
                      <p className="text-2xl text-blue-600 font-semibold mb-6">{service.subtitle}</p>
                      <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <feature.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a href="/#booking">
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-10 py-4 text-lg font-semibold group shadow-lg hover:shadow-xl transition-all">
                      Book {service.name} Now
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>

                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} relative`}>
                  <div className={`absolute inset-0 ${service.bgColor} rounded-3xl transform rotate-3 scale-105`}></div>
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.name} service`}
                      className="rounded-3xl w-full shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                      <service.icon
                        className={`w-8 h-8 ${service.color.replace("bg-gradient-to-br from-", "text-").replace("-500 to-", "-").replace("-600", "")}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Cities Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">Available Nationwide</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Available in These Cities</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Our services are available across these major metropolitan cities with extensive coverage areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableCities.map((city, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0 shadow-lg"
              >
                <div className="relative h-56">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={`${city.name} city`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{city.name}</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">{city.areas.length} Areas Covered</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-3">
                    {city.areas.slice(0, 8).map((area, areaIndex) => (
                      <div key={areaIndex} className="flex items-center text-sm text-gray-600 py-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="truncate">{area}</span>
                      </div>
                    ))}
                    {city.areas.length > 8 && (
                      <div className="col-span-2 text-center mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm text-blue-600 font-semibold">+{city.areas.length - 8} more areas</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New "Coming Soon" Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-purple-100 rounded-full px-6 py-2 mb-6">
              <Loader className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-700 font-semibold">Expanding Our Reach</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Coming Soon to More Cities</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              We're working hard to bring EION Rides to more locations. Stay tuned!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comingSoonCities.map((city, index) => (
              <Card
                key={index}
                className="overflow-hidden group border-0 shadow-lg relative"
              >
                <div className="relative h-56">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={`${city.name} city`}
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-2">{city.name}</h3>
                      <span className="text-white/80 font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 bg-gray-50">
                   <p className="text-center text-gray-500">We'll be launching in {city.name} soon. Get ready for a better way to ride!</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Experience the Difference</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our customer-first approach and innovative features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Fair Pricing",
                desc: "Set your own fare. No surge pricing or hidden fees.",
                color: "bg-gradient-to-br from-red-500 to-pink-500",
              },
              {
                icon: Shield,
                title: "Safety First",
                desc: "All drivers are verified and rated by passengers.",
                color: "bg-gradient-to-br from-green-500 to-emerald-500",
              },
              {
                icon: Clock,
                title: "Quick Booking",
                desc: "Find a ride in minutes with our large network.",
                color: "bg-gradient-to-br from-blue-500 to-indigo-500",
              },
              {
                icon: Star,
                title: "Quality Service",
                desc: "4.8/5 average rating from satisfied customers.",
                color: "bg-gradient-to-br from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0 shadow-lg"
              >
                <div
                  className={`w-20 h-20 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-xl`}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Experience Better Transportation?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made the switch to fair, reliable, and convenient rides.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/book">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold group shadow-2xl hover:shadow-3xl transition-all">
                Book Your Ride Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="/driver/register">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 text-xl font-semibold bg-transparent shadow-2xl hover:shadow-3xl transition-all"
              >
                Become a Driver
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
