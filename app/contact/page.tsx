import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Phone, Mail, Clock, MessageCircle, Send, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-2 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need support? We're here to help! Reach out to us through any of the channels
              below.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg group hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
                <p className="text-gray-600 mb-2">24/7 Customer Support</p>
                <p className="text-blue-600 font-semibold">+916232107555</p>
              </div>

              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg group hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-2">General Inquiries</p>
                <p className="text-blue-600 font-semibold">support@eionrides.com</p>
              </div>

              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg group hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">WhatsApp</h3>
                <p className="text-gray-600 mb-2">Quick Support <br /> chatbot</p>
                <p className="text-blue-600 font-semibold">+91 8452890907</p>
              </div>

              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg group hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Hours</h3>
                <p className="text-gray-600 mb-2">Available 24/7</p>
              </div>
            </div>

            {/* Contact Form and Office Info */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 bg-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="driver">Driver Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Enter your message here..."
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 resize-none"
                      required
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>

              {/* Office Information */}
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Offices</h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Mumbai Headquarters</h3>
                        <p className="text-gray-600 mb-2">
                          Address: 2, Adhikari Bhavan,
                          <br />
               Sharma Compound, Old Nagardas Road,
               <br />
               Andheri East, Mumbai-400069.
                        </p>
                        <p className="text-blue-600 font-semibold">+91 8452890907</p>
                      </div>
                    </div>

                    
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
                  <p className="mb-4">For urgent safety concerns or emergencies during your ride:</p>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6" />
                    <span className="text-xl font-bold">+91 6232107555</span>
                  </div>
                  <p className="text-sm mt-2 opacity-90">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
      Frequently Asked Questions
    </h2>

    <div className="grid md:grid-cols-2 gap-10">
      {/* Customer FAQs */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Customer FAQs
        </h3>
        <div className="space-y-6">
          {[
            {
              q: "What is EionRides?",
              a: "EionRides is a smart mobility service that blends comfort, safety, and technology to make your travel simple and hassle-free.",
            },
            {
              q: "How is EionRides different from other cab services?",
              a: "We offer transparent pricing, verified drivers, enhanced safety, and flexible travel options—whether daily commutes, business travel, or outstation trips.",
            },
            {
              q: "Where is EionRides available?",
              a: "We’re launching in Mumbai, Pune, and Bhopal, with more cities coming soon.",
            },
            {
              q: "Do you only provide electric vehicles?",
              a: "Not only EVs. Our fleet includes electric, hybrid, and fuel-based cars to give you choice.",
            },
            {
              q: "Can I schedule rides in advance?",
              a: "Yes—book instantly or schedule hours or even days ahead.",
            },
            {
              q: "What payment methods do you accept?",
              a: "UPI, credit/debit cards, wallets, and cash are supported.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.q}
              </h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick FAQs */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-950 mb-6">
          Quick FAQs
        </h3>
        <div className="space-y-4">
          {[
            {
              q: "What is EionRides?",
              a: "A smart cab service offering safe, reliable, and tech-driven travel.",
            },
            {
              q: "Where available?",
              a: "Launching in Mumbai, Pune & Bhopal (expanding soon).",
            },
            {
              q: "Fleet type?",
              a: "Hatchbacks, sedans, SUVs, premium & EVs.",
            },
            {
              q: "How to book?",
              a: "App, website, WhatsApp, or call center.",
            },
            {
              q: "Advance booking?",
              a: "Yes, schedule rides hours/days ahead.",
            },
            {
              q: "Payments?",
              a: "UPI, cards, wallets, cash.",
            },
            {
              q: "Driver checks?",
              a: "All drivers verified & trained.",
            },
            {
              q: "Support?",
              a: "In-app chat, helpline & email (24x7).",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-xl p-4 border border-gray-300 hover:bg-white transition"
            >
              <p className="text-sm font-semibold text-gray-800">{faq.q}</p>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </div>
  )
}
