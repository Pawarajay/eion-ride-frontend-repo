import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Square, Users, Shield, Award, Star, Heart, ShieldCheck, BrainCircuit, Handshake, Leaf, BadgeCheck } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-3 px-0">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Eion Rides</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12   leading-relaxed  text-justify justify-items-center p-4 ">

              Eion Rides – Cab & Taxi Services is a smart digital platform that connects passengers with trusted cab providers for safe, seamless, and hassle-free travel.

              Promoted by Eion Travelcare Pvt. Ltd. (est. 2011), and backed by decades of expertise in professional driver services and manpower outsourcing, Eion Rides brings reliability and professionalism to the mobility sector.

              Our platform offers flexible travel plans—from quick point-to-point rides to customized options—ensuring comfort, convenience, and trust at every step.
            </p>
            <div className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/taxi.webp"
                alt="Eion Rides taxi on Mumbai street"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To offer reliable, tech-driven cab services that blend comfort, safety and affordability—powered by innovation, professional drivers and a deep commitment to service excellence.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To redefine urban and intercity commuting through smart, efficient and trusted mobility solutions that uplift lives and connect communities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Values of <span className="text-blue-600">Eion Rides</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 1. Customer-Centricity */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer-Centricity</h3>
                <p className="text-gray-600">
                  Always putting rider convenience, safety and satisfaction first.
                </p>
              </div>

              {/* 2. Reliability */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
                <p className="text-gray-600">
                  Ensuring dependable, punctual rides through a robust tech and human network.
                </p>
              </div>

              {/* 3. Innovation */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Leveraging smart technologies to enhance efficiency, safety and user experience.
                </p>
              </div>

              {/* 4. Accessibility */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Square className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  Serving diverse geographies and user groups with inclusive mobility options.
                </p>
              </div>

              {/* 5. Professionalism */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professionalism</h3>
                <p className="text-gray-600">
                  Empowering trained drivers as service partners, not just operators.
                </p>
              </div>

              {/* 6. Sustainability */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  Promoting eco-conscious practices, while staying open to multiple fuel and fleet options.
                </p>
              </div>

              {/* 7. Trust & Transparency */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BadgeCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h3>
                <p className="text-gray-600">
                  Operating with honesty, accountability and clear communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Our Impact in Numbers</h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">1M+</div>
                <div className="text-blue-100">Happy Riders</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Verified Drivers</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">6</div>
                <div className="text-blue-100">Cities Served</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">10M+</div>
                <div className="text-blue-100">Rides Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Leadership Team</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-justify bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MM</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Manish Mathur</h3>
                <p className="text-blue-600  text-center">President & CEO </p>
                <p className="text-blue-600 mb-1 text-center">📧 manish@ashkom.com</p>
                <p className="text-gray-600 text-sm">

                  Manish brings over 35 years of business management expertise, blending vision with execution. A seasoned leader, he has successfully driven growth in marketing, sales, and business development, with strong command over strategic planning and market expansion. Known for his dynamic leadership and people management skills, he has consistently inspired teams to achieve their potential while delivering measurable results.

                  Steadily growing his portfolio over the decades, Manish has expanded into new ventures at a controlled pace—Eion Rides being the latest addition.

                  He is a proud recipient of the Order of Free Masonry and a Certified Internal Quality Auditor by Lloyd’s Register, UK. Recognized for his adaptability and foresight, Manish continues to embrace technology and innovation to steer organizations toward sustainable growth.
                </p>
              </div>

              <div className="text-justify bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">NC</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Neeta Chaturvedi
                </h3>
                <p className="text-blue-600 text-center"> Executive Group Director</p>
                <p className="text-blue-600 mb-1 text-center">📧 neeta@ashkom.com</p>
                <p className="text-gray-600 text-sm">

                  A Postgraduate in Mathematics and a national-level sportsperson, Neeta brings unmatched energy, passion, and over 30 years of multifaceted professional experience. She began her career as an Assistant Professor of Mathematics and has since held leadership positions across education, animation, e-learning, executive search, and training.

                  As a certified trainer, she holds the prestigious Dale Carnegie “Train the Trainer” Certificate and is a Certified Extended DISC Administrator, enabling her to effectively assess, develop, and empower teams. She is also trained in Mind Mapping techniques, applying them to enhance both professional and personal effectiveness.

                  With a strong passion for technology implementation, Neeta is currently driving initiatives in AI integration for internal processes, further strengthening organizational efficiency and innovation.
                </p>
              </div>
              <div className="text-justify bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">SS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Salman Shaikh</h3>
                <p className="text-blue-600  text-center">Director</p>
                <p className="text-blue-600 mb-1 text-center">📧 salman.shaikh@ashkom.com</p>
                <p className="text-gray-600 text-sm">

                  Salman represents the new generation of leadership—dynamic, ambitious, and results-driven. With extensive experience in operations and business expansion, he has played a pivotal role in driving new product development, building strategic partnerships, and strengthening customer relationships.

                  For the past 10 years, Salman has been at the helm of DriverSuvidha, steering it from the driver’s seat and leading its technology development. He is also the strategic mind behind Eion Rides, shaping its vision, platform, and execution. His ability to adapt quickly, communicate effectively, and deliver under pressure makes him an invaluable leader for innovation, project management, and team growth.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer-Centricity</h3>
                <p className="text-gray-600">
                  Always putting rider convenience, safety and satisfaction first.
                </p>
              </div>

              {/* 2. Reliability */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
                <p className="text-gray-600">
                  Ensuring dependable, punctual rides through a robust tech and human network.
                </p>
              </div>

              {/* 3. Innovation */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Leveraging smart technologies to enhance efficiency, safety and user experience.
                </p>
              </div>

              {/* 4. Accessibility */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Square className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  Serving diverse geographies and user groups with inclusive mobility options.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
