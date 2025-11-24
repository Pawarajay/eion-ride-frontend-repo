"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, User, Eye, EyeOff, ArrowLeft, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  const [activeTab, setActiveTab] = useState("username")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
  })
  const [error, setError] = useState("") // NEW: State for login errors

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error on new input
  }

  const handleSendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleLogin = () => {
    // Only check credentials when the "username" tab is active
    if (activeTab !== "username") {
      alert("Please use the Username tab for admin login.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Hardcoded check
    if (formData.username === "eionrides" && formData.password === "Eionrides@123") {
      // Simulate a small delay for user experience
      setTimeout(() => {
        router.push('/admin'); // Redirect to the admin dashboard
      }, 500);
    } else {
      setTimeout(() => {
        setError("Invalid username or password.");
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const socialLogins = [
    {
      name: "Google",
      icon: "/google.webp",
      text: "Continue with Google",
    },
    {
      name: "Facebook",
      icon: "/facebook.png",
      text: "Continue with Facebook",
    },
    {
      name: "Apple",
      icon: "/apple.png",
      text: "Continue with Apple",
    },
  ]; return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-lime-400 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-700 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <motion.div className="flex items-center justify-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Eion Rides</span>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Choose your preferred login method</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-gray-800">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">Quick Sign In</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Container for the vertically stacked buttons */}
              <div className="grid grid-cols-3 gap-3">
                {socialLogins.map((social, index) => (
                  <motion.button
                    key={social.name}
                    // Unified style for a clean, modern look
                    className="bg-white p-3 rounded-lg flex items-center justify-center 
                   border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50
                   transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={social.icon}
                      alt={`${social.name} login icon`}
                      className="h-10 w-10" // Slightly larger icon to fill the space
                    />
                  </motion.button>
                ))}
              </div>

            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Login Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email" className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Phone</span>
                </TabsTrigger>
                <TabsTrigger value="username" className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Username</span>
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="email" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {!otpSent ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="flex space-x-2">
                          <select className="px-3 py-2 border border-gray-300 rounded-md">
                            <option>+91</option>
                          </select>
                          <Input
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-600">OTP sent to {formData.phone}</span>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                          className="w-full text-center text-lg tracking-widest"
                        />
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="username" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {/* NEW: Display error message here */}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            {/* Two-Factor Authentication Option */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="2fa" className="rounded" />
              <label htmlFor="2fa" className="text-sm text-gray-600 flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-500" />
                Enable Two-Factor Authentication
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* {activeTab === "phone" && !otpSent ? (
                <Button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 py-3"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              ) : (
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 py-3"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              )} */}
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white hover:bg-blue-600 py-3"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>


              <div className="text-center space-y-2">
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>

            {/* Guest Option */}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <motion.div
          className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-gray-700">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-sm">Your data is protected with end-to-end encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
