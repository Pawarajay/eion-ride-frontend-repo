"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Car,
  FileText,
  Camera,
  CreditCard,
  CheckCircle,
  Shield,
  ArrowLeft,
  ArrowRight,
  Save,
  Upload,
  Eye,
  X,
  AlertCircle,
  Users,
  Building,
  Plus,
  Minus,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function DriverRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [autoSaveStatus, setAutoSaveStatus] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [registrationType, setRegistrationType] = useState("") // "individual" or "fleet"
  const [fleetVehicles, setFleetVehicles] = useState([{ id: 1 }])

  const [formData, setFormData] = useState({
    // Registration Type
    registrationType: "",

    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Fleet Owner Details (additional)
    companyName: "",
    companyRegistration: "",
    gstNumber: "",
    numberOfVehicles: "",

    // Driver Information
    licenseNumber: "",
    licenseExpiry: "",
    drivingExperience: "",
    previousExperience: "",
    languagesSpoken: [],

    // Vehicle Details (for individual) or Fleet Details
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    registrationNumber: "",
    insuranceNumber: "",
    insuranceExpiry: "",
    vehicleColor: "",
    fuelType: "",

    // Financial Information
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    panNumber: "",

    // Verification
    backgroundCheckConsent: false,
    termsAccepted: false,
    dataProcessingConsent: false,
  })

  const registrationSteps = useMemo(
    () => [
      {
        id: "type",
        title: "Registration Type",
        icon: Users,
        description: "Choose your registration type",
        fields: ["registrationType"],
      },
      {
        id: "personal",
        title: "Personal Details",
        icon: User,
        description: "Basic information about you",
        fields: ["firstName", "lastName", "email", "phone", "dateOfBirth", "address"],
      },
      {
        id: "driver",
        title: "Driver Information",
        icon: Shield,
        description: "Your driving credentials",
        fields: ["licenseNumber", "licenseExpiry", "drivingExperience"],
      },
      {
        id: "vehicle",
        title: registrationType === "fleet" ? "Fleet Details" : "Vehicle Details",
        icon: Car,
        description: registrationType === "fleet" ? "Information about your fleet" : "Information about your vehicle",
        fields: ["vehicleType", "vehicleMake", "vehicleModel", "registrationNumber"],
      },
      {
        id: "documents",
        title: "Document Upload",
        icon: FileText,
        description: "Upload required documents",
        fields: [],
      },
      {
        id: "photos",
        title: registrationType === "fleet" ? "Fleet Photos" : "Vehicle Photos",
        icon: Camera,
        description: registrationType === "fleet" ? "Upload fleet images" : "Upload vehicle images",
        fields: [],
      },
      {
        id: "financial",
        title: "Financial Details",
        icon: CreditCard,
        description: "Bank account information",
        fields: ["bankName", "accountNumber", "ifscCode"],
      },
      {
        id: "verification",
        title: "Verification",
        icon: CheckCircle,
        description: "Final verification and consent",
        fields: ["backgroundCheckConsent", "termsAccepted"],
      },
    ],
    [registrationType],
  )

  const documentTypes = [
    { id: "license", name: "Driving License", required: true, uploaded: false },
    { id: "aadhar", name: "Aadhar Card", required: true, uploaded: false },
    { id: "pan", name: "PAN Card", required: true, uploaded: false },
    { id: "registration", name: "Vehicle Registration", required: true, uploaded: false },
    { id: "insurance", name: "Vehicle Insurance", required: true, uploaded: false },
    { id: "pollution", name: "Pollution Certificate", required: true, uploaded: false },
    { id: "bank", name: "Bank Statement", required: false, uploaded: false },
  ]

  const vehiclePhotoTypes = [
    { id: "exterior_front", name: "Vehicle Front", required: true },
    { id: "exterior_back", name: "Vehicle Back", required: true },
    { id: "exterior_left", name: "Vehicle Left Side", required: true },
    { id: "exterior_right", name: "Vehicle Right Side", required: true },
    { id: "interior", name: "Interior", required: true },
    { id: "dashboard", name: "Dashboard", required: true },
    { id: "license_plate", name: "License Plate", required: true },
    { id: "odometer", name: "Odometer Reading", required: false },
  ]

  const vehicleTypes = [
    { id: "hatchback", name: "Hatchback", category: "Economy" },
    { id: "sedan", name: "Sedan", category: "Comfort" },
    { id: "suv", name: "SUV", category: "Premium" },
    { id: "bike", name: "Motorcycle", category: "Bike" },
    { id: "auto", name: "Auto Rickshaw", category: "Auto" },
  ]

  const languages = ["Hindi", "English", "Marathi", "Gujarati", "Tamil", "Telugu", "Bengali", "Punjabi"]

  const calculateCompletionPercentage = useCallback(() => {
    // Calculate completion percentage
    const currentStepData = registrationSteps[currentStep]
    const totalFields = currentStepData.fields.length
    const completedFields = currentStepData.fields.filter((field) => formData[field]).length
    const stepCompletion = totalFields > 0 ? (completedFields / totalFields) * 100 : 100
    const overallCompletion = ((currentStep + stepCompletion / 100) / registrationSteps.length) * 100
    setCompletionPercentage(Math.round(overallCompletion))
  }, [currentStep, formData, registrationSteps])

  useEffect(() => {
    calculateCompletionPercentage()
  }, [calculateCompletionPercentage])

  useEffect(() => {
    // Auto-save functionality
    const saveTimer = setTimeout(() => {
      setAutoSaveStatus("Saving...")
      setTimeout(() => {
        setAutoSaveStatus("Saved")
        setTimeout(() => setAutoSaveStatus(""), 2000)
      }, 1000)
    }, 2000)

    return () => clearTimeout(saveTimer)
  }, [formData])

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file }))
  }

  const handleNext = () => {
    if (currentStep < registrationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit registration
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to success page or dashboard
      }, 3000)
    }
  }

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  const isStepValid = () => {
    const currentStepData = registrationSteps[currentStep]
    if (currentStepData.id === "documents") {
      return documentTypes.filter((doc) => doc.required).every((doc) => uploadedFiles[doc.id])
    }
    if (currentStepData.id === "photos") {
      return vehiclePhotoTypes.filter((photo) => photo.required).every((photo) => uploadedFiles[photo.id])
    }
    if (currentStepData.id === "verification") {
      return formData.backgroundCheckConsent && formData.termsAccepted && formData.dataProcessingConsent
    }
    return currentStepData.fields.every((field) => formData[field])
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Registration submitted successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white text-gray-900 px-4 py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold">Eion Rides</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {registrationSteps.length}
            </div>
            {autoSaveStatus && (
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <Save className="w-4 h-4" />
                <span>{autoSaveStatus}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Become a Driver Partner</h1>
              <p className="text-gray-600">Join thousands of drivers earning with Eion Rides</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex items-center justify-between">
            {registrationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      : index === currentStep + 1
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-400"
                        : "bg-gray-200 text-gray-500"
                  }`}
                  animate={{ scale: index === currentStep ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                {index < registrationSteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${index < currentStep ? "bg-blue-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h2 className="text-xl font-bold text-gray-900">{registrationSteps[currentStep]?.title}</h2>
            <p className="text-gray-600">{registrationSteps[currentStep]?.description}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-8 border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-center">
                    <Users className="w-6 h-6 text-blue-600" />
                    <span>Choose Your Registration Type</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Individual Cab Owner */}
                    <motion.div
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                        registrationType === "individual"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => {
                        setRegistrationType("individual")
                        setFormData((prev) => ({ ...prev, registrationType: "individual" }))
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            registrationType === "individual" ? "bg-blue-500" : "bg-gray-200"
                          }`}
                        >
                          <User
                            className={`w-8 h-8 ${registrationType === "individual" ? "text-white" : "text-gray-500"}`}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Individual Cab Owner</h3>
                        <p className="text-gray-600 mb-4">Own and drive your own vehicle</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Single vehicle registration</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Direct earnings</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Flexible schedule</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Quick approval process</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Fleet Owner */}
                    <motion.div
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                        registrationType === "fleet"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => {
                        setRegistrationType("fleet")
                        setFormData((prev) => ({ ...prev, registrationType: "fleet" }))
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            registrationType === "fleet" ? "bg-blue-500" : "bg-gray-200"
                          }`}
                        >
                          <Building
                            className={`w-8 h-8 ${registrationType === "fleet" ? "text-white" : "text-gray-500"}`}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Fleet Owner</h3>
                        <p className="text-gray-600 mb-4">Manage multiple vehicles and drivers</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Multiple vehicle registration</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Bulk submission process</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Fleet management dashboard</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Higher earning potential</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {registrationType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">
                            {registrationType === "individual"
                              ? "Individual Registration Selected"
                              : "Fleet Registration Selected"}
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            {registrationType === "individual"
                              ? "You'll register as an individual cab owner with a single vehicle. The process is streamlined for quick approval."
                              : "You'll register as a fleet owner with multiple vehicles. The process is designed for bulk submissions and fleet management."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        className="pl-10"
                        max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg resize-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <Input
                        type="text"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <Input
                        type="text"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={(e) => updateFormData("state", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                      <Input
                        type="text"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={(e) => updateFormData("pincode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                        <Input
                          type="text"
                          placeholder="Emergency contact name"
                          value={formData.emergencyContact}
                          onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.emergencyPhone}
                          onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="driver"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Driver Credentials</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Driving License Number *</label>
                      <Input
                        type="text"
                        placeholder="MH0120110012345"
                        value={formData.licenseNumber}
                        onChange={(e) => updateFormData("licenseNumber", e.target.value.toUpperCase())}
                        className="uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Expiry Date *</label>
                      <Input
                        type="date"
                        value={formData.licenseExpiry}
                        onChange={(e) => updateFormData("licenseExpiry", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Driving Experience (Years) *
                    </label>
                    <select
                      value={formData.drivingExperience}
                      onChange={(e) => updateFormData("drivingExperience", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select experience</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Commercial Driving Experience
                    </label>
                    <textarea
                      placeholder="Describe any previous experience as taxi driver, delivery driver, etc."
                      value={formData.previousExperience}
                      onChange={(e) => updateFormData("previousExperience", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {languages.map((language) => (
                        <label key={language} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.languagesSpoken.includes(language)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData("languagesSpoken", [...formData.languagesSpoken, language])
                              } else {
                                updateFormData(
                                  "languagesSpoken",
                                  formData.languagesSpoken.filter((lang) => lang !== language),
                                )
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5" />
                    <span>{registrationType === "fleet" ? "Fleet Details" : "Vehicle Information"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {registrationType === "individual" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type *</label>
                        <div className="grid md:grid-cols-3 gap-4">
                          {vehicleTypes.map((vehicle) => (
                            <div
                              key={vehicle.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.vehicleType === vehicle.id
                                  ? "border-blue-400 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-300"
                              }`}
                              onClick={() => updateFormData("vehicleType", vehicle.id)}
                            >
                              <h4 className="font-semibold">{vehicle.name}</h4>
                              <p className="text-sm text-gray-600">{vehicle.category}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make *</label>
                          <Input
                            type="text"
                            placeholder="Maruti Suzuki"
                            value={formData.vehicleMake}
                            onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model *</label>
                          <Input
                            type="text"
                            placeholder="Swift Dzire"
                            value={formData.vehicleModel}
                            onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturing Year</label>
                          <Input
                            type="number"
                            placeholder="2020"
                            value={formData.vehicleYear}
                            onChange={(e) => updateFormData("vehicleYear", e.target.value)}
                            min="2010"
                            max={new Date().getFullYear()}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
                          <Input
                            type="text"
                            placeholder="MH 01 AB 1234"
                            value={formData.registrationNumber}
                            onChange={(e) => updateFormData("registrationNumber", e.target.value.toUpperCase())}
                            className="uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Color</label>
                          <Input
                            type="text"
                            placeholder="White"
                            value={formData.vehicleColor}
                            onChange={(e) => updateFormData("vehicleColor", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Insurance Policy Number
                          </label>
                          <Input
                            type="text"
                            placeholder="Policy number"
                            value={formData.insuranceNumber}
                            onChange={(e) => updateFormData("insuranceNumber", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry Date</label>
                          <Input
                            type="date"
                            value={formData.insuranceExpiry}
                            onChange={(e) => updateFormData("insuranceExpiry", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                        <select
                          value={formData.fuelType}
                          onChange={(e) => updateFormData("fuelType", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select fuel type</option>
                          <option value="petrol">Petrol</option>
                          <option value="diesel">Diesel</option>
                          <option value="cng">CNG</option>
                          <option value="electric">Electric</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </>
                  )}

                  {registrationType === "fleet" && (
                    <>
                      {fleetVehicles.map((vehicle, index) => (
                        <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-3">Vehicle {index + 1}</h4>

                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make *</label>
                              <Input
                                type="text"
                                placeholder="Maruti Suzuki"
                                value={formData.vehicleMake}
                                onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model *</label>
                              <Input
                                type="text"
                                placeholder="Swift Dzire"
                                value={formData.vehicleModel}
                                onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Registration Number *
                              </label>
                              <Input
                                type="text"
                                placeholder="MH 01 AB 1234"
                                value={formData.registrationNumber}
                                onChange={(e) => updateFormData("registrationNumber", e.target.value.toUpperCase())}
                                className="uppercase"
                              />
                            </div>
                          </div>

                          {fleetVehicles.length > 1 && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setFleetVehicles(fleetVehicles.filter((v, i) => i !== index))
                              }}
                            >
                              <Minus className="w-4 h-4 mr-2" />
                              Remove Vehicle
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        variant="secondary"
                        onClick={() => {
                          setFleetVehicles([...fleetVehicles, { id: Date.now() }])
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Document Upload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Document Requirements</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          Please upload clear, high-quality images of your documents. All documents should be valid and
                          not expired.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {documentTypes.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            {doc.required && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                Required
                              </Badge>
                            )}
                          </div>
                          {uploadedFiles[doc.id] && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>

                        {uploadedFiles[doc.id] ? (
                          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                            <span className="text-sm text-green-700">{uploadedFiles[doc.id].name}</span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newFiles = { ...uploadedFiles }
                                  delete newFiles[doc.id]
                                  setUploadedFiles(newFiles)
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(doc.id, file)
                              }}
                              className="hidden"
                              id={`upload-${doc.id}`}
                            />
                            <label
                              htmlFor={`upload-${doc.id}`}
                              className="mt-2 inline-block px-4 py-2 bg-blue-400 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition-colors"
                            >
                              Choose File
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>{registrationType === "fleet" ? "Fleet Photos" : "Vehicle Photos"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Camera className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Photo Guidelines</h4>
                        <ul className="text-sm text-yellow-600 mt-1 space-y-1">
                          <li>• Take photos in good lighting conditions</li>
                          <li>• Ensure the entire vehicle/part is visible</li>
                          <li>• Photos should be clear and not blurry</li>
                          <li>• Vehicle should be clean for better visibility</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {vehiclePhotoTypes.map((photo) => (
                      <div key={photo.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{photo.name}</h4>
                            {photo.required && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                Required
                              </Badge>
                            )}
                          </div>
                          {uploadedFiles[photo.id] && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>

                        {uploadedFiles[photo.id] ? (
                          <div className="space-y-3">
                            <img
                              src={URL.createObjectURL(uploadedFiles[photo.id]) || "/placeholder.svg"}
                              alt={photo.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newFiles = { ...uploadedFiles }
                                  delete newFiles[photo.id]
                                  setUploadedFiles(newFiles)
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Take photo or upload</p>
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(photo.id, file)
                              }}
                              className="hidden"
                              id={`photo-${photo.id}`}
                            />
                            <label
                              htmlFor={`photo-${photo.id}`}
                              className="inline-block px-4 py-2 bg-blue-400 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition-colors"
                            >
                              <Camera className="w-4 h-4 inline mr-2" />
                              Capture
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="financial"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Financial Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Secure Information</h4>
                        <p className="text-sm text-green-600 mt-1">
                          Your financial information is encrypted and secure. This is required for payment processing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
                      <Input
                        type="text"
                        placeholder="State Bank of India"
                        value={formData.bankName}
                        onChange={(e) => updateFormData("bankName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name *</label>
                      <Input
                        type="text"
                        placeholder="As per bank records"
                        value={formData.accountHolderName}
                        onChange={(e) => updateFormData("accountHolderName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
                      <Input
                        type="text"
                        placeholder="Account number"
                        value={formData.accountNumber}
                        onChange={(e) => updateFormData("accountNumber", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
                      <Input
                        type="text"
                        placeholder="SBIN0001234"
                        value={formData.ifscCode}
                        onChange={(e) => updateFormData("ifscCode", e.target.value.toUpperCase())}
                        className="uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                    <Input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
                      className="uppercase"
                      maxLength={10}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Final Verification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Registration Summary</h4>
                    <div className="text-sm text-blue-600 space-y-1">
                      <p>• Personal information completed</p>
                      <p>• Driver credentials verified</p>
                      <p>• Vehicle details provided</p>
                      <p>• Documents uploaded</p>
                      <p>• Vehicle photos captured</p>
                      <p>• Financial information secured</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="background-check"
                        checked={formData.backgroundCheckConsent}
                        onChange={(e) => updateFormData("backgroundCheckConsent", e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="background-check" className="text-sm text-gray-700">
                        I consent to background verification checks including criminal record verification and driving
                        history verification. This is required for passenger safety.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => updateFormData("termsAccepted", e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/driver-agreement" className="text-blue-600 hover:underline">
                          Driver Agreement
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="data-processing"
                        checked={formData.dataProcessingConsent}
                        onChange={(e) => updateFormData("dataProcessingConsent", e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="data-processing" className="text-sm text-gray-700">
                        I consent to the processing of my personal data as described in the{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">What happens next?</h4>
                        <ul className="text-sm text-yellow-600 mt-1 space-y-1">
                          <li>• Your application will be reviewed within 24-48 hours</li>
                          <li>• Background verification may take 3-5 business days</li>
                          <li>• You'll receive updates via SMS and email</li>
                          <li>• Once approved, you can start earning immediately</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={() => {
              if (currentStep === registrationSteps.length - 1) {
                handleSubmit()
              } else {
                setCurrentStep(Math.min(registrationSteps.length - 1, currentStep + 1))
              }
            }}
            disabled={isLoading || (currentStep === 0 && !registrationType)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
          >
            {isLoading ? (
              "Processing..."
            ) : currentStep === registrationSteps.length - 1 ? (
              "Submit Application"
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
