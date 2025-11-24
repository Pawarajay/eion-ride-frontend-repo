// "use client"

// import React, { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { ArrowLeft, Tag, UserCheck, UserPlus, Lock } from "lucide-react"
// import Link from "next/link"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { useSearchParams } from "next/navigation"
// import { useRouter } from "next/navigation"

// type VehicleType = {
//   id: string
//   name: string
//   basePrice: number
//   image?: string
//   capacity?: string
//   features?: string[]
// }

// export default function BookingPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const serviceType = searchParams.get("service") || "rental"
//   const tripType = searchParams.get("tripType") || "oneway"
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showBookingForm, setShowBookingForm] = useState(false)
//   const [actualHours, setActualHours] = useState(4)
//   const [actualDistance, setActualDistance] = useState(40)
//   const [totalTripHours, setTotalTripHours] = useState<number | null>(null)
//   const [totalTripMinutes, setTotalTripMinutes] = useState<number | null>(null)
//   const [distanceKm, setDistanceKm] = useState<number | null>(null)
//   const [distanceError, setDistanceError] = useState<string | null>(null)
//   const [prices, setPrices] = useState<Record<string, string>>({})
//   const [pricesLoading, setPricesLoading] = useState<Record<string, boolean>>({})
//   const [calculatingDistance, setCalculatingDistance] = useState(false)
//   const [fareBreakdowns, setFareBreakdowns] = useState<Record<string, any>>({})

//   // 🔒 Locked values state
//   const [lockedDistanceKm, setLockedDistanceKm] = useState<number | null>(null)
//   const [lockedTripMinutes, setLockedTripMinutes] = useState<number | null>(null)
//   const [lockedTripHours, setLockedTripHours] = useState<number | null>(null)
//   const [isLocked, setIsLocked] = useState(false)

//   const rentalPlans = [
//     { id: "4hr", name: "4 Hr", duration: "40 Kms", hours: 4, kms: 40 },
//     { id: "6hr", name: "6 Hr", duration: "60 Kms", hours: 6, kms: 60 },
//     { id: "8hr", name: "8 Hr", duration: "80 Kms", hours: 8, kms: 80 },
//     { id: "10hr", name: "10 Hr", duration: "100 Kms", hours: 10, kms: 100 },
//     { id: "12hr", name: "12 Hr", duration: "120 Kms", hours: 12, kms: 120 },
//   ]
//   const rentalPlanHoursMap: Record<string, number> = { "4hr": 4, "6hr": 6, "8hr": 8, "10hr": 10, "12hr": 12 }
//   const rentalPlanKmsMap: Record<string, number> = { "4hr": 40, "6hr": 60, "8hr": 80, "10hr": 100, "12hr": 120 }

//   const vehicleTypes: VehicleType[] = [
//     { id: "mini", name: "Mini", basePrice: 0.0, image: "/green-economy-car.png", capacity: "4 seats", features: ["AC", "Music"] },
//     { id: "sedan", name: "Sedan", basePrice: 0.0, image: "/green-comfort-car-sedan.png", capacity: "4 seats", features: ["AC", "Music", "Premium Interior"] },
//     { id: "suv", name: "SUV", basePrice: 0.0, image: "/taxi-car-on-street-mumbai.png", capacity: "6 seats", features: ["AC", "Music", "Spacious"] },
//     { id: "innova", name: "Innova Crysta", basePrice: 0.0, image: "/green-comfort-car-sedan.png", capacity: "7 seats", features: ["AC", "Music", "Premium", "Extra Space"] },
//   ]

//   const bookingFormRef = useRef<HTMLDivElement | null>(null)
//   const pickupRef = useRef<HTMLInputElement | null>(null)
//   const dropRef = useRef<HTMLInputElement | null>(null)

//   const [bookingData, setBookingData] = useState({
//     pickup: searchParams.get("pickup") || "",
//     pickupLat: null as number | null,
//     pickupLng: null as number | null,
//     destination: searchParams.get("drop") || "",
//     dropLat: null as number | null,
//     dropLng: null as number | null,
//     rentalPlan: "",
//     actualHours: 4,
//     actualDistance: 40,
//     vehicleType: "",
//     pickupDate: searchParams.get("pickupDate") || "",
//     pickupTime: searchParams.get("pickupTime") || "",
//     returnDate: searchParams.get("returnDate") || "",
//     returnTime: searchParams.get("returnTime") || "",
//     passengers: 1,
//     fare: 0,
//     notes: "",
//     customerName: "",
//     customerPhone: "",
//     customerEmail: "",
//     couponCode: "",
//     discount: 0,
//     bookingFor: "self",
//     otherPersonName: "",
//     otherPersonPhone: "",
//     paymentMethod: "online",
//     serviceType: serviceType,
//     tripType: tripType,
//   })

//   const getServiceDisplayName = (): string => {
//     switch (bookingData.serviceType) {
//       case "flexi": return "Flexi Ride"
//       case "rental": return "Rental Service"
//       case "outstation": return bookingData.tripType === "roundtrip" ? "Outstation Round Trip" : "Outstation One Way"
//       default: return "Rental Service"
//     }
//   }

//   const getDefaultPickupTime = (): string => {
//     const now = new Date()
//     now.setHours(now.getHours() + 1)
//     return now.toTimeString().slice(0, 5)
//   }
  
//   const getDefaultPickupDate = (): string => {
//     const now = new Date()
//     return now.toISOString().split("T")[0]
//   }

//   useEffect(() => {
//     if (!bookingData.pickupTime) updateBookingData("pickupTime", getDefaultPickupTime())
//     if (!bookingData.pickupDate) updateBookingData("pickupDate", getDefaultPickupDate())
//   }, [])

//   useEffect(() => {
//     const initAutocomplete = async () => {
//       if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return
//       await loadGoogleMapsScript()
//       const google = (window as any).google
//       if (!google?.maps?.places) return
//       if (pickupRef.current && !(pickupRef.current as any).autocompleteAttached) {
//         const autocomplete = new google.maps.places.Autocomplete(pickupRef.current, { componentRestrictions: { country: "in" } })
//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace()
//           if (place?.geometry?.location) {
//             updateBookingData("pickupLat", place.geometry.location.lat())
//             updateBookingData("pickupLng", place.geometry.location.lng())
//           }
//           if (place?.formatted_address) {
//             updateBookingData("pickup", place.formatted_address)
//           }
//         })
//         ;(pickupRef.current as any).autocompleteAttached = true
//       }
//       if (dropRef.current && !(dropRef.current as any).autocompleteAttached) {
//         const autocomplete = new google.maps.places.Autocomplete(dropRef.current, { componentRestrictions: { country: "in" } })
//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace()
//           if (place?.geometry?.location) {
//             updateBookingData("dropLat", place.geometry.location.lat())
//             updateBookingData("dropLng", place.geometry.location.lng())
//           }
//           if (place?.formatted_address) {
//             updateBookingData("destination", place.formatted_address)
//           }
//         })
//         ;(dropRef.current as any).autocompleteAttached = true
//       }
//     }
//     initAutocomplete()
//   }, [])

//   const updateBookingData = (field: string, value: any) => {
//     setBookingData((prev) => ({ ...prev, [field]: value }))
//   }

//   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

//   const detectCity = (pickup: string) => {
//     if (pickup.toLowerCase().includes("pune")) return "Pune"
//     if (pickup.toLowerCase().includes("bhopal")) return "Bhopal"
//     return "Mumbai"
//   }

//   // 🔒 RESET LOCK when locations change
//   useEffect(() => {
//     setLockedDistanceKm(null)
//     setLockedTripMinutes(null)
//     setLockedTripHours(null)
//     setIsLocked(false)
//   }, [bookingData.pickup, bookingData.destination])

//   // ✅ MAIN DISTANCE & PRICE CALCULATION - USING BACKEND
//   useEffect(() => {
//     const pickup = bookingData.pickup?.trim()
//     const destination = bookingData.destination?.trim()
    
//     if (!pickup || !destination || !bookingData.pickupLat || !bookingData.dropLat) {
//       setDistanceKm(null)
//       setTotalTripHours(null)
//       setTotalTripMinutes(null)
//       setPrices({})
//       setFareBreakdowns({})
//       return
//     }

//     const computeDistanceAndPrices = async () => {
//       try {
//         setCalculatingDistance(true)
//         setDistanceError(null)

//         // ✅ CALL BACKEND API FOR DISTANCE CALCULATION
//         const distanceResponse = await fetch(
//           `${BACKEND_URL}/routes/calculate-distance?` +
//           `pickupLat=${bookingData.pickupLat}&` +
//           `pickupLng=${bookingData.pickupLng}&` +
//           `dropLat=${bookingData.dropLat}&` +
//           `dropLng=${bookingData.dropLng}&` +
//           `serviceType=${bookingData.serviceType}&` +
//           `tripType=${bookingData.tripType}`
//         )

//         const distanceData = await distanceResponse.json()

//         if (!distanceResponse.ok || !distanceData.success) {
//           throw new Error(distanceData.error || "Failed to calculate distance")
//         }

//         // Get consistent values from backend
//         const preciseKm = distanceData.distanceKm
//         const preciseMinutes = distanceData.durationMinutes
//         const preciseHours = distanceData.durationHours

//         console.log("📍 Distance from backend:", { 
//           km: preciseKm, 
//           minutes: preciseMinutes,
//           hours: preciseHours
//         })

//         // Set values
//         setDistanceKm(preciseKm)
//         setTotalTripMinutes(preciseMinutes)
//         setTotalTripHours(preciseHours)

//         // 🔒 Lock on first calculation
//         if (!isLocked && !lockedDistanceKm && !lockedTripMinutes) {
//           setLockedDistanceKm(preciseKm)
//           setLockedTripMinutes(preciseMinutes)
//           setLockedTripHours(preciseHours)
//           setIsLocked(true)
//           console.log("🔒 VALUES LOCKED:", { km: preciseKm, minutes: preciseMinutes })
//         }

//         // Use locked values for pricing
//         const distanceToUse = lockedDistanceKm || preciseKm
//         const minutesToUse = lockedTripMinutes || preciseMinutes
//         const hoursToUse = lockedTripHours || preciseHours

//         console.log("💰 CALCULATING PRICES WITH:", { 
//           distance: distanceToUse, 
//           minutes: minutesToUse,
//           locked: isLocked 
//         })

//         // Calculate prices for all vehicles
//         const newPrices: Record<string, string> = {}
//         const newBreakdowns: Record<string, any> = {}
        
//         await Promise.all(
//           vehicleTypes.map(async (v) => {
//             setPricesLoading((prev) => ({ ...prev, [v.id]: true }))
//             try {
//               let urlParams = new URLSearchParams()
//               urlParams.append("distance", distanceToUse.toString())
//               urlParams.append("vehicleType", v.id)
//               urlParams.append("city", detectCity(pickup))
//               urlParams.append("serviceType", bookingData.serviceType)
//               urlParams.append("pickupLat", bookingData.pickupLat?.toString() || "")
//               urlParams.append("pickupLng", bookingData.pickupLng?.toString() || "")
//               urlParams.append("dropLat", bookingData.dropLat?.toString() || "")
//               urlParams.append("dropLng", bookingData.dropLng?.toString() || "")
//               urlParams.append("tripType", bookingData.tripType || "oneway")
//               urlParams.append("pickupDate", bookingData.pickupDate || "")
//               urlParams.append("pickupTime", bookingData.pickupTime || "")
              
//               if (bookingData.tripType === "roundtrip") {
//                 urlParams.append("returnDate", bookingData.returnDate || "")
//                 urlParams.append("returnTime", bookingData.returnTime || "")
//               }
              
//               if (bookingData.serviceType === "outstation" && bookingData.tripType === "roundtrip" && hoursToUse) {
//                 urlParams.append("tripHours", hoursToUse.toString())
//               }
              
//               if (bookingData.serviceType === "rental") {
//                 urlParams.append("rentalHours", String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
//                 urlParams.append("actualHours", actualHours ? String(actualHours) : String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
//               }
              
//               if (bookingData.serviceType === "flexi") {
//                 urlParams.append("actualTripMinutes", minutesToUse.toString())
//               }
              
//               const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`
//               const res = await fetch(url)
//               const data = await res.json()
              
//               if (res.ok && data.totalFare) {
//                 newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
//                   style: "currency", 
//                   currency: "INR" 
//                 }).format(data.totalFare)
//                 newBreakdowns[v.id] = data.breakdown || {}
//               } else {
//                 newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
//                   style: "currency", 
//                   currency: "INR" 
//                 }).format(v.basePrice)
//                 newBreakdowns[v.id] = {}
//                 if (data.error) setDistanceError(String(data.error))
//               }
//             } catch (error) {
//               console.error("Error calculating price for", v.id, error)
//               newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
//                 style: "currency", 
//                 currency: "INR" 
//               }).format(v.basePrice)
//               newBreakdowns[v.id] = {}
//             } finally {
//               setPricesLoading((prev) => ({ ...prev, [v.id]: false }))
//             }
//           })
//         )
        
//         setPrices(newPrices)
//         setFareBreakdowns(newBreakdowns)
//         setCalculatingDistance(false)
        
//       } catch (err) {
//         console.error("Error in distance calculation:", err)
//         setDistanceError("Error calculating distance. Please try again.")
//         setDistanceKm(null)
//         setTotalTripHours(null)
//         setTotalTripMinutes(null)
//         const fallbackPrices: Record<string, string> = {}
//         vehicleTypes.forEach((v) => {
//           fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", { 
//             style: "currency", 
//             currency: "INR" 
//           }).format(v.basePrice)
//         })
//         setPrices(fallbackPrices)
//         setCalculatingDistance(false)
//       }
//     }

//     computeDistanceAndPrices()
//   }, [
//     bookingData.pickup,
//     bookingData.destination,
//     bookingData.serviceType,
//     bookingData.pickupLat,
//     bookingData.dropLat,
//     bookingData.tripType,
//     bookingData.rentalPlan,
//     bookingData.vehicleType,
//     bookingData.pickupDate,
//     bookingData.pickupTime,
//     bookingData.returnDate,
//     bookingData.returnTime,
//     actualHours,
//     isLocked
//   ])

//   useEffect(() => {
//     if (bookingData.serviceType === "rental" && bookingData.rentalPlan) {
//       setActualHours(rentalPlanHoursMap[bookingData.rentalPlan] || 4)
//       setActualDistance(rentalPlanKmsMap[bookingData.rentalPlan] || 40)
//     }
//   }, [bookingData.rentalPlan, bookingData.serviceType])

//   useEffect(() => {
//     if (bookingData.serviceType === "rental" && bookingData.rentalPlan && bookingData.vehicleType) {
//       setPricesLoading((prev) => ({ ...prev, [bookingData.vehicleType]: true }))
//     }
//   }, [actualHours, actualDistance])

//   const formatDistance = (km: number | null) => km === null ? "—" : `${km.toFixed(2)} km`
//   const formatTimeHours = (hours: number | null) => hours !== null ? `${hours.toFixed(2)} hr` : "---"
//   const formatTimeMins = (mins: number | null) => mins !== null ? `${mins} min` : "---"

//   const applyCoupon = () => {
//     const coupons: Record<string, number> = { FIRST10: 10, SAVE20: 20, WELCOME15: 15 }
//     const discount = coupons[bookingData.couponCode.toUpperCase()] || 0
//     updateBookingData("discount", discount)
//     if (discount > 0) { alert(`Coupon applied! You saved ${discount}%`) }
//     else { alert("Invalid coupon code") }
//   }

//   const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone)

//   const handleBookNow = () => {
//     if (bookingData.serviceType === "rental" && !bookingData.rentalPlan) {
//       alert("Please select a rental plan")
//       return
//     }
//     if (!bookingData.vehicleType) {
//       alert("Please select a vehicle type")
//       return
//     }
//     if (!bookingData.pickup || !bookingData.destination || !bookingData.pickupLat || !bookingData.dropLat) {
//       alert("Please select a valid pickup and drop location")
//       return
//     }
//     setShowBookingForm(true)
//   }

//   const handleConfirmBooking = async () => {
//     if (!bookingData.customerName || !bookingData.customerPhone || !isValidPhone(bookingData.customerPhone)) {
//       alert("Please fill in all required fields")
//       return
//     }
//     if (bookingData.bookingFor === "other" &&
//       (!bookingData.otherPersonName || !bookingData.otherPersonPhone || !isValidPhone(bookingData.otherPersonPhone))) {
//       alert("Please provide details for the person you're booking for")
//       return
//     }
//     setIsSubmitting(true)
//     try {
//       const response = await fetch(`${BACKEND_URL}/routes/save-booking`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...bookingData,
//           gstAmount: bookingData.fare * (5 / 100),
//           totalFare: bookingData.fare + bookingData.fare * (5 / 100),
//           distanceKm: lockedDistanceKm || distanceKm,
//           tripHours: lockedTripHours || totalTripHours,
//           actualTripMinutes: bookingData.serviceType === "flexi" 
//             ? (lockedTripMinutes || totalTripMinutes)
//             : undefined
//         }),
//       })
//       const data = await response.json()
//       if (response.ok) {
//         alert("Booking confirmed successfully!")
//         router.push("/thank-you")
//       } else {
//         alert(data.error || "There was an error confirming your booking. Please try again.")
//       }
//     } catch (error) {
//       alert("Network error while confirming booking.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const isBookNowDisabled = (
//     (bookingData.serviceType === "rental" && !bookingData.rentalPlan) ||
//     !bookingData.vehicleType ||
//     !bookingData.pickup ||
//     !bookingData.destination ||
//     !bookingData.pickupLat ||
//     !bookingData.dropLat
//   )

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-4 py-8">
//         <div className="flex items-center mb-8">
//           <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </Link>
//         </div>
        
//         <Card className="p-6 mb-4">
//           <CardContent className="p-0">
//             <h3 className="text-xl font-semibold mb-4 text-blue-600">Pick Your Locations</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
//                 <Input
//                   ref={pickupRef}
//                   type="text"
//                   placeholder="Enter pickup location"
//                   value={bookingData.pickup}
//                   onChange={(e) => updateBookingData("pickup", e.target.value)}
//                   required
//                 />
//                 {bookingData.pickupLat && bookingData.pickupLng && (
//                   <div className="text-xs text-gray-500 mt-1">
//                     Lat: {bookingData.pickupLat}, Lng: {bookingData.pickupLng}
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Drop Location *</label>
//                 <Input
//                   ref={dropRef}
//                   type="text"
//                   placeholder="Enter drop location"
//                   value={bookingData.destination}
//                   onChange={(e) => updateBookingData("destination", e.target.value)}
//                   required
//                 />
//                 {bookingData.dropLat && bookingData.dropLng && (
//                   <div className="text-xs text-gray-500 mt-1">
//                     Lat: {bookingData.dropLat}, Lng: {bookingData.dropLng}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {bookingData.serviceType === "outstation" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date & Time *</label>
//                   <input
//                     className="border p-2 rounded w-full"
//                     type="date"
//                     value={bookingData.pickupDate}
//                     onChange={(e) => updateBookingData("pickupDate", e.target.value)}
//                   />
//                   <input
//                     className="border p-2 rounded w-full mt-1"
//                     type="time"
//                     value={bookingData.pickupTime}
//                     onChange={(e) => updateBookingData("pickupTime", e.target.value)}
//                   />
//                 </div>
//                 {bookingData.tripType === "roundtrip" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Return Date & Time *</label>
//                     <input
//                       className="border p-2 rounded w-full"
//                       type="date"
//                       value={bookingData.returnDate}
//                       onChange={(e) => updateBookingData("returnDate", e.target.value)}
//                     />
//                     <input
//                       className="border p-2 rounded w-full mt-1"
//                       type="time"
//                       value={bookingData.returnTime}
//                       onChange={(e) => updateBookingData("returnTime", e.target.value)}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {bookingData.serviceType === "outstation" && bookingData.tripType === "roundtrip" && (
//               <div className="mt-2 text-sm text-blue-800">
//                 Estimated Total Time: <b>{formatTimeHours(lockedTripHours || totalTripHours)} ({formatTimeMins(lockedTripMinutes || totalTripMinutes)})</b>
//               </div>
//             )}
            
//             {(!bookingData.pickup || !bookingData.destination || !bookingData.pickupLat || !bookingData.dropLat) && (
//               <div className="text-xs text-red-500 mt-2">Please select locations from the suggestions. Both pickup and drop must be valid.</div>
//             )}
//           </CardContent>
//         </Card>

//         {!showBookingForm ? (
//           <div className="space-y-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your {getServiceDisplayName()}</h1>
//               <p className="text-gray-600">Choose your vehicle to get started</p>
//               <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mt-4">
//                 <span className="text-blue-700 font-medium">Service: {getServiceDisplayName()}</span>
//               </div>
              
//               <div className="mt-3 text-sm text-gray-600">
//                 <span className="font-medium">From:</span> {bookingData.pickup || "—"} &nbsp; • &nbsp;
//                 <span className="font-medium">To:</span> {bookingData.destination || "—"} &nbsp; • &nbsp;
//                 <span className="font-medium">Distance:</span> {
//                   calculatingDistance 
//                     ? "Calculating..." 
//                     : isLocked 
//                       ? <span className="inline-flex items-center text-green-700 font-semibold">
//                           <Lock className="w-3 h-3 mr-1" />
//                           {formatDistance(lockedDistanceKm)}
//                         </span>
//                       : formatDistance(distanceKm)
//                 }
//                 {bookingData.serviceType === "flexi" && (
//                   <>
//                     &nbsp; • &nbsp;
//                     <span className="font-medium">Duration:</span> {
//                       isLocked 
//                         ? <span className="inline-flex items-center text-green-700 font-semibold">
//                             <Lock className="w-3 h-3 mr-1" />
//                             {formatTimeMins(lockedTripMinutes)}
//                           </span>
//                         : formatTimeMins(totalTripMinutes)
//                     }
//                   </>
//                 )}
//                 {distanceError && <div className="text-xs text-red-600 mt-1">{distanceError}</div>}
//               </div>

//               {isLocked && (
//                 <div className="mt-2 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-xs text-green-800">
//                   <Lock className="w-3 h-3 mr-1" />
//                   Price locked - same fare guaranteed at checkout
//                 </div>
//               )}

//               <div className="mt-3 text-xl font-bold text-blue-900">
//                 {pricesLoading[bookingData.vehicleType]
//                   ? "Calculating..."
//                   : prices[bookingData.vehicleType]
//                     ? prices[bookingData.vehicleType]
//                     : "---"}
//               </div>
              
//               {bookingData.vehicleType && fareBreakdowns[bookingData.vehicleType] && (
//                 <div className="mt-6 p-5 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 max-w-md mx-auto shadow-md">
//                   <h4 className="font-semibold text-blue-900 mb-3 border-b border-blue-300 pb-2">Fare Calculation Breakdown</h4>
//                   <ul className="text-sm space-y-1 list-disc list-inside text-blue-900 font-medium">
//                     {Object.entries(fareBreakdowns[bookingData.vehicleType]).map(([key, value]) => (
//                       <li key={key}>
//                         <span className="capitalize">{key.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>:{" "}
//                         <span className="font-normal">
//                           {typeof value === "number"
//                             ? value.toLocaleString("en-IN", { maximumFractionDigits: 2 })
//                             : String(value)}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
              
//               {bookingData.serviceType === "rental" && bookingData.rentalPlan && (
//                 <Card className="p-6 mb-4 mt-6">
//                   <CardContent className="p-0">
//                     <h3 className="text-lg font-semibold mb-3 text-blue-600">Actual Usage (For Extra Charges)</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Actual Hours Used</label>
//                         <Input
//                           type="number"
//                           min={rentalPlanHoursMap[bookingData.rentalPlan] || 4}
//                           value={actualHours}
//                           onChange={(e) => setActualHours(Number(e.target.value))}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Actual Distance (km)</label>
//                         <Input
//                           type="number"
//                           min={rentalPlanKmsMap[bookingData.rentalPlan] || 40}
//                           value={actualDistance}
//                           onChange={(e) => setActualDistance(Number(e.target.value))}
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
              
//               {bookingData.serviceType === "rental" && (
//                 <Card className="p-6">
//                   <CardContent className="p-0">
//                     <h3 className="text-xl font-semibold mb-4 text-blue-600">RENTAL PLANS</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                       {rentalPlans.map((plan) => (
//                         <button
//                           key={plan.id}
//                           onClick={() => updateBookingData("rentalPlan", plan.id)}
//                           className={`p-4 rounded-lg border-2 text-center transition-all ${
//                             bookingData.rentalPlan === plan.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"
//                           }`}
//                         >
//                           <div className="font-semibold text-lg">{plan.name}</div>
//                           <div className="text-sm text-gray-600">{plan.duration}</div>
//                         </button>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
              
//               <Card className="p-6">
//                 <CardContent className="p-0">
//                   <h3 className="text-xl font-semibold mb-4 text-blue-600">VEHICLE TYPE</h3>
//                   <div className="space-y-3">
//                     {vehicleTypes.map((vehicle) => (
//                       <button
//                         key={vehicle.id}
//                         onClick={() => updateBookingData("vehicleType", vehicle.id)}
//                         className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
//                           bookingData.vehicleType === vehicle.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="flex items-center space-x-4">
//                           <img src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} className="w-20 h-14 object-fill" />
//                           <div className="text-left">
//                             <div className="font-semibold">{vehicle.name}</div>
//                             <div className="text-sm text-gray-600">{vehicle.capacity}</div>
//                             <div className="text-xs text-gray-500">{vehicle.features?.join(" • ")}</div>
//                           </div>
//                         </div>
//                         <div className="ml-4 text-right min-w-[120px]">
//                           {pricesLoading[vehicle.id] ? (
//                             <div className="text-sm text-gray-600">Calculating...</div>
//                           ) : prices[vehicle.id] ? (
//                             <div className="text-lg font-semibold">{prices[vehicle.id]}</div>
//                           ) : (
//                             <div className="text-lg font-semibold">
//                               {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(vehicle.basePrice)}
//                             </div>
//                           )}
//                           <div className="text-xs text-gray-500 mt-1">
//                             {isLocked ? `${lockedDistanceKm?.toFixed(2)} km` : distanceKm ? `${distanceKm.toFixed(2)} km` : "Price based on route"}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Button onClick={handleBookNow} disabled={isBookNowDisabled} className="w-full bg-blue-500 text-white hover:bg-blue-600 py-4 text-lg font-semibold">
//                 Book Now
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div ref={bookingFormRef} className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your {getServiceDisplayName()} Booking</h2>
//               <p className="text-gray-600">Fill in the details to confirm your booking</p>
              
//               {isLocked && (
//                 <div className="mt-4 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-800">
//                   <Lock className="w-4 h-4 mr-2" />
//                   Your fare is locked at {prices[bookingData.vehicleType]} for {formatDistance(lockedDistanceKm)}
//                 </div>
//               )}
//             </div>
            
//             <Card className="p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-lg font-semibold mb-4">Who are you booking for?</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "self")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${bookingData.bookingFor === "self" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"}`}
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     <span>For Myself</span>
//                   </button>
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "other")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${bookingData.bookingFor === "other" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"}`}
//                   >
//                     <UserPlus className="w-5 h-5" />
//                     <span>For Someone Else</span>
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="p-6">
//               <CardContent className="p-0 space-y-4">
//                 <h3 className="text-lg font-semibold">Your Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                     <Input type="text" placeholder="Enter your full name" value={bookingData.customerName}
//                       onChange={(e) => updateBookingData("customerName", e.target.value)} required />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//                     <Input type="tel" placeholder="Enter 10-digit mobile number" value={bookingData.customerPhone}
//                       onChange={(e) => updateBookingData("customerPhone", e.target.value)} required />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                   <Input type="email" placeholder="your.email@example.com" value={bookingData.customerEmail}
//                     onChange={(e) => updateBookingData("customerEmail", e.target.value)} />
//                 </div>
//               </CardContent>
//             </Card>
            
//             {bookingData.bookingFor === "other" && (
//               <Card className="p-6">
//                 <CardContent className="p-0 space-y-4">
//                   <h3 className="text-lg font-semibold">Passenger Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Passenger Name *</label>
//                       <Input type="text" placeholder="Enter passenger's full name" value={bookingData.otherPersonName}
//                         onChange={(e) => updateBookingData("otherPersonName", e.target.value)} required />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Passenger Phone *</label>
//                       <Input type="tel" placeholder="Enter 10-digit mobile number" value={bookingData.otherPersonPhone}
//                         onChange={(e) => updateBookingData("otherPersonPhone", e.target.value)} required />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
            
//             <Card className="p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-lg font-semibold mb-4">Apply Coupon Code</h3>
//                 <div className="flex space-x-2">
//                   <Input type="text" placeholder="Enter coupon code" value={bookingData.couponCode}
//                     onChange={(e) => updateBookingData("couponCode", e.target.value)} className="flex-1" />
//                   <Button onClick={applyCoupon} variant="outline" className="bg-transparent">
//                     <Tag className="w-4 h-4 mr-2" /> Apply
//                   </Button>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">Try: FIRST10, SAVE20, WELCOME15</div>
//               </CardContent>
//             </Card>
            
//             <div className="flex space-x-4">
//               <Button onClick={() => setShowBookingForm(false)} variant="outline" className="flex-1 bg-transparent">Back</Button>
//               <Button
//                 onClick={handleConfirmBooking}
//                 className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Confirming..." : "Confirm Booking"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   )
// }

// function loadGoogleMapsScript() {
//   return new Promise<void>((resolve, reject) => {
//     if (typeof window === "undefined") return reject(new Error("Window undefined"));
//     if ((window as any).google && (window as any).google.maps) return resolve();
//     const existing = document.getElementById("gmaps-js");
//     if (existing) {
//       existing.addEventListener("load", () => resolve());
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "gmaps-js";
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&libraries=places`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => resolve();
//     script.onerror = (err) => reject(err);
//     document.head.appendChild(script);
//   });
// }

//testing

"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Tag, UserCheck, UserPlus, Lock } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

type VehicleType = {
  id: string
  name: string
  basePrice: number
  image?: string
  capacity?: string
  features?: string[]
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get("service") || "rental"
  const tripType = searchParams.get("tripType") || "oneway"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [actualHours, setActualHours] = useState(4)
  const [actualDistance, setActualDistance] = useState(40)
  const [totalTripHours, setTotalTripHours] = useState<number | null>(null)
  const [totalTripMinutes, setTotalTripMinutes] = useState<number | null>(null)
  const [distanceKm, setDistanceKm] = useState<number | null>(null)
  const [distanceError, setDistanceError] = useState<string | null>(null)
  const [prices, setPrices] = useState<Record<string, string>>({})
  const [pricesLoading, setPricesLoading] = useState<Record<string, boolean>>({})
  const [calculatingDistance, setCalculatingDistance] = useState(false)
  const [fareBreakdowns, setFareBreakdowns] = useState<Record<string, any>>({})

  // 🔒 Locked values state
  const [lockedDistanceKm, setLockedDistanceKm] = useState<number | null>(null)
  const [lockedTripMinutes, setLockedTripMinutes] = useState<number | null>(null)
  const [lockedTripHours, setLockedTripHours] = useState<number | null>(null)
  const [isLocked, setIsLocked] = useState(false)

  const rentalPlans = [
    { id: "4hr", name: "4 Hr", duration: "40 Kms", hours: 4, kms: 40 },
    { id: "6hr", name: "6 Hr", duration: "60 Kms", hours: 6, kms: 60 },
    { id: "8hr", name: "8 Hr", duration: "80 Kms", hours: 8, kms: 80 },
    { id: "10hr", name: "10 Hr", duration: "100 Kms", hours: 10, kms: 100 },
    { id: "12hr", name: "12 Hr", duration: "120 Kms", hours: 12, kms: 120 },
  ]
  const rentalPlanHoursMap: Record<string, number> = { "4hr": 4, "6hr": 6, "8hr": 8, "10hr": 10, "12hr": 12 }
  const rentalPlanKmsMap: Record<string, number> = { "4hr": 40, "6hr": 60, "8hr": 80, "10hr": 100, "12hr": 120 }

  const vehicleTypes: VehicleType[] = [
    { id: "mini", name: "Mini", basePrice: 0.0, image: "/green-economy-car.png", capacity: "4 seats", features: ["AC", "Music"] },
    { id: "sedan", name: "Sedan", basePrice: 0.0, image: "/green-comfort-car-sedan.png", capacity: "4 seats", features: ["AC", "Music", "Premium Interior"] },
    { id: "suv", name: "SUV", basePrice: 0.0, image: "/taxi-car-on-street-mumbai.png", capacity: "6 seats", features: ["AC", "Music", "Spacious"] },
    { id: "innova", name: "Innova Crysta", basePrice: 0.0, image: "/green-comfort-car-sedan.png", capacity: "7 seats", features: ["AC", "Music", "Premium", "Extra Space"] },
  ]

  const bookingFormRef = useRef<HTMLDivElement | null>(null)
  const pickupRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef<HTMLInputElement | null>(null)

  const [bookingData, setBookingData] = useState({
    pickup: searchParams.get("pickup") || "",
    pickupLat: null as number | null,
    pickupLng: null as number | null,
    destination: searchParams.get("drop") || "",
    dropLat: null as number | null,
    dropLng: null as number | null,
    rentalPlan: "",
    actualHours: 4,
    actualDistance: 40,
    vehicleType: "",
    pickupDate: searchParams.get("pickupDate") || "",
    pickupTime: searchParams.get("pickupTime") || "",
    returnDate: searchParams.get("returnDate") || "",
    returnTime: searchParams.get("returnTime") || "",
    passengers: 1,
    fare: 0,
    notes: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    couponCode: "",
    discount: 0,
    bookingFor: "self",
    otherPersonName: "",
    otherPersonPhone: "",
    paymentMethod: "online",
    serviceType: serviceType,
    tripType: tripType,
  })

  const getServiceDisplayName = (): string => {
    switch (bookingData.serviceType) {
      case "flexi": return "Flexi Ride"
      case "rental": return "Rental Service"
      case "outstation": return bookingData.tripType === "roundtrip" ? "Outstation Round Trip" : "Outstation One Way"
      default: return "Rental Service"
    }
  }

  const getDefaultPickupTime = (): string => {
    const now = new Date()
    now.setHours(now.getHours() + 1)
    return now.toTimeString().slice(0, 5)
  }
  
  const getDefaultPickupDate = (): string => {
    const now = new Date()
    return now.toISOString().split("T")[0]
  }

  useEffect(() => {
    if (!bookingData.pickupTime) updateBookingData("pickupTime", getDefaultPickupTime())
    if (!bookingData.pickupDate) updateBookingData("pickupDate", getDefaultPickupDate())
  }, [])

  useEffect(() => {
    const initAutocomplete = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return
      await loadGoogleMapsScript()
      const google = (window as any).google
      if (!google?.maps?.places) return
      if (pickupRef.current && !(pickupRef.current as any).autocompleteAttached) {
        const autocomplete = new google.maps.places.Autocomplete(pickupRef.current, { componentRestrictions: { country: "in" } })
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (place?.geometry?.location) {
            updateBookingData("pickupLat", place.geometry.location.lat())
            updateBookingData("pickupLng", place.geometry.location.lng())
          }
          if (place?.formatted_address) {
            updateBookingData("pickup", place.formatted_address)
          }
        })
        ;(pickupRef.current as any).autocompleteAttached = true
      }
      if (dropRef.current && !(dropRef.current as any).autocompleteAttached) {
        const autocomplete = new google.maps.places.Autocomplete(dropRef.current, { componentRestrictions: { country: "in" } })
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (place?.geometry?.location) {
            updateBookingData("dropLat", place.geometry.location.lat())
            updateBookingData("dropLng", place.geometry.location.lng())
          }
          if (place?.formatted_address) {
            updateBookingData("destination", place.formatted_address)
          }
        })
        ;(dropRef.current as any).autocompleteAttached = true
      }
    }
    initAutocomplete()
  }, [])

  const updateBookingData = (field: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

  const detectCity = (pickup: string) => {
    if (pickup.toLowerCase().includes("pune")) return "Pune"
    if (pickup.toLowerCase().includes("bhopal")) return "Bhopal"
    return "Mumbai"
  }

  // 🔒 RESET LOCK when locations change
  useEffect(() => {
    console.log("📍 Location changed - resetting lock")
    setLockedDistanceKm(null)
    setLockedTripMinutes(null)
    setLockedTripHours(null)
    setIsLocked(false)
  }, [bookingData.pickup, bookingData.destination])

  // ✅ MAIN DISTANCE & PRICE CALCULATION - FIXED VERSION
  // useEffect(() => {
  //   const pickup = bookingData.pickup?.trim()
  //   const destination = bookingData.destination?.trim()
    
  //   if (!pickup || !destination || !bookingData.pickupLat || !bookingData.dropLat) {
  //     setDistanceKm(null)
  //     setTotalTripHours(null)
  //     setTotalTripMinutes(null)
  //     setPrices({})
  //     setFareBreakdowns({})
  //     return
  //   }

  //   const computeDistanceAndPrices = async () => {
  //     try {
  //       setCalculatingDistance(true)
  //       setDistanceError(null)

  //       console.log("\n" + "=".repeat(60))
  //       console.log("🔍 FRONTEND: Starting distance calculation")
  //       console.log("=".repeat(60))

  //       // ✅ STEP 1: CALL BACKEND FOR DISTANCE (SINGLE SOURCE OF TRUTH)
  //       const distanceResponse = await fetch(
  //         `${BACKEND_URL}/routes/calculate-distance?` +
  //         `pickupLat=${bookingData.pickupLat}&` +
  //         `pickupLng=${bookingData.pickupLng}&` +
  //         `dropLat=${bookingData.dropLat}&` +
  //         `dropLng=${bookingData.dropLng}&` +
  //         `serviceType=${bookingData.serviceType}&` +
  //         `tripType=${bookingData.tripType}`
  //       )

  //       const distanceData = await distanceResponse.json()

  //       if (!distanceResponse.ok || !distanceData.success) {
  //         throw new Error(distanceData.error || "Failed to calculate distance")
  //       }

  //       // 🔥 FIX: Backend values are THE TRUTH
  //       const backendKm = distanceData.distanceKm
  //       const backendMinutes = distanceData.durationMinutes
  //       const backendHours = distanceData.durationHours

  //       console.log("✅ Backend returned:", { 
  //         km: backendKm, 
  //         minutes: backendMinutes,
  //         hours: backendHours
  //       })

  //       // 🔥 FIX: LOCK VALUES IMMEDIATELY
  //       if (!isLocked) {
  //         setLockedDistanceKm(backendKm)
  //         setLockedTripMinutes(backendMinutes)
  //         setLockedTripHours(backendHours)
  //         setIsLocked(true)
  //         console.log("🔒 VALUES LOCKED:", { 
  //           km: backendKm, 
  //           minutes: backendMinutes,
  //           hours: backendHours
  //         })
  //       }

  //       // Set display values
  //       setDistanceKm(backendKm)
  //       setTotalTripMinutes(backendMinutes)
  //       setTotalTripHours(backendHours)

  //       // 🔥 CRITICAL: Use LOCKED values for all calculations
  //       const distanceToUse = lockedDistanceKm !== null ? lockedDistanceKm : backendKm
  //       const minutesToUse = lockedTripMinutes !== null ? lockedTripMinutes : backendMinutes
  //       const hoursToUse = lockedTripHours !== null ? lockedTripHours : backendHours

  //       console.log("💰 CALCULATING PRICES WITH LOCKED VALUES:", { 
  //         distance: distanceToUse, 
  //         minutes: minutesToUse,
  //         hours: hoursToUse,
  //         locked: isLocked 
  //       })

  //       // ✅ STEP 2: Calculate prices for all vehicles using LOCKED values
  //       const newPrices: Record<string, string> = {}
  //       const newBreakdowns: Record<string, any> = {}
        
  //       await Promise.all(
  //         vehicleTypes.map(async (v) => {
  //           setPricesLoading((prev) => ({ ...prev, [v.id]: true }))
  //           try {
  //             let urlParams = new URLSearchParams()
              
  //             // 🔥 FIX: ALWAYS use exact locked distance
  //             urlParams.append("distance", distanceToUse.toString())
  //             urlParams.append("vehicleType", v.id)
  //             urlParams.append("city", detectCity(pickup))
  //             urlParams.append("serviceType", bookingData.serviceType)
  //             urlParams.append("pickupLat", bookingData.pickupLat?.toString() || "")
  //             urlParams.append("pickupLng", bookingData.pickupLng?.toString() || "")
  //             urlParams.append("dropLat", bookingData.dropLat?.toString() || "")
  //             urlParams.append("dropLng", bookingData.dropLng?.toString() || "")
  //             urlParams.append("tripType", bookingData.tripType || "oneway")
  //             urlParams.append("pickupDate", bookingData.pickupDate || "")
  //             urlParams.append("pickupTime", bookingData.pickupTime || "")
              
  //             if (bookingData.tripType === "roundtrip") {
  //               urlParams.append("returnDate", bookingData.returnDate || "")
  //               urlParams.append("returnTime", bookingData.returnTime || "")
  //             }
              
  //             // 🔥 FIX: For outstation roundtrip, pass locked hours
  //             if (bookingData.serviceType === "outstation" && bookingData.tripType === "roundtrip") {
  //               urlParams.append("tripHours", hoursToUse.toString())
  //             }
              
  //             if (bookingData.serviceType === "rental") {
  //               urlParams.append("rentalHours", String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
  //               urlParams.append("actualHours", actualHours ? String(actualHours) : String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
  //             }
              
  //             if (bookingData.serviceType === "flexi") {
  //               urlParams.append("actualTripMinutes", minutesToUse.toString())
  //             }
              
  //             const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`
  //             console.log(`🔗 Fetching price for ${v.id}`)
              
  //             const res = await fetch(url)
  //             const data = await res.json()
              
  //             if (res.ok && data.totalFare) {
  //               newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
  //                 style: "currency", 
  //                 currency: "INR" 
  //               }).format(data.totalFare)
  //               newBreakdowns[v.id] = data.breakdown || {}
                
  //               console.log(`✅ ${v.id} price:`, data.totalFare)
  //             } else {
  //               newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
  //                 style: "currency", 
  //                 currency: "INR" 
  //               }).format(v.basePrice)
  //               newBreakdowns[v.id] = {}
  //               if (data.error) setDistanceError(String(data.error))
  //             }
  //           } catch (error) {
  //             console.error("❌ Error calculating price for", v.id, error)
  //             newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
  //               style: "currency", 
  //               currency: "INR" 
  //             }).format(v.basePrice)
  //             newBreakdowns[v.id] = {}
  //           } finally {
  //             setPricesLoading((prev) => ({ ...prev, [v.id]: false }))
  //           }
  //         })
  //       )
        
  //       setPrices(newPrices)
  //       setFareBreakdowns(newBreakdowns)
  //       setCalculatingDistance(false)
        
  //       console.log("=".repeat(60))
  //       console.log("✅ FRONTEND: Calculation complete")
  //       console.log("=".repeat(60) + "\n")
        
  //     } catch (err) {
  //       console.error("❌ Error in distance calculation:", err)
  //       setDistanceError("Error calculating distance. Please try again.")
  //       setDistanceKm(null)
  //       setTotalTripHours(null)
  //       setTotalTripMinutes(null)
  //       const fallbackPrices: Record<string, string> = {}
  //       vehicleTypes.forEach((v) => {
  //         fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", { 
  //           style: "currency", 
  //           currency: "INR" 
  //         }).format(v.basePrice)
  //       })
  //       setPrices(fallbackPrices)
  //       setCalculatingDistance(false)
  //     }
  //   }

  //   computeDistanceAndPrices()
  // }, [
  //   bookingData.pickup,
  //   bookingData.destination,
  //   bookingData.serviceType,
  //   bookingData.pickupLat,
  //   bookingData.dropLat,
  //   bookingData.tripType,
  //   bookingData.rentalPlan,
  //   bookingData.vehicleType,
  //   bookingData.pickupDate,
  //   bookingData.pickupTime,
  //   bookingData.returnDate,
  //   bookingData.returnTime,
  //   actualHours,
  //   // 🔥 REMOVED isLocked from dependencies to prevent recalculation
  // ])

  //testing (Work for outstation round trip)
  // ✅ REPLACE THE ENTIRE useEffect FOR DISTANCE CALCULATION WITH THIS:

useEffect(() => {
  const pickup = bookingData.pickup?.trim()
  const destination = bookingData.destination?.trim()
  
  if (!pickup || !destination || !bookingData.pickupLat || !bookingData.dropLat) {
    setDistanceKm(null)
    setTotalTripHours(null)
    setTotalTripMinutes(null)
    setPrices({})
    setFareBreakdowns({})
    return
  }

  const computeDistanceAndPrices = async () => {
    try {
      setCalculatingDistance(true)
      setDistanceError(null)

      console.log("\n" + "=".repeat(60))
      console.log("🔍 FRONTEND: Starting distance calculation")
      console.log("=".repeat(60))

      // ✅ STEP 1: Get distance from backend ONCE
      const distanceResponse = await fetch(
        `${BACKEND_URL}/routes/calculate-distance?` +
        `pickupLat=${bookingData.pickupLat}&` +
        `pickupLng=${bookingData.pickupLng}&` +
        `dropLat=${bookingData.dropLat}&` +
        `dropLng=${bookingData.dropLng}&` +
        `serviceType=${bookingData.serviceType}&` +
        `tripType=${bookingData.tripType}`
      )

      const distanceData = await distanceResponse.json()

      if (!distanceResponse.ok || !distanceData.success) {
        throw new Error(distanceData.error || "Failed to calculate distance")
      }

      // 🔥 FIX: These values from backend are THE SINGLE SOURCE OF TRUTH
      const backendKm = distanceData.distanceKm
      const backendMinutes = distanceData.durationMinutes
      const backendHours = distanceData.durationHours

      console.log("✅ Backend returned:", { 
        km: backendKm, 
        minutes: backendMinutes,
        hours: backendHours
      })

      // 🔥 CRITICAL FIX: Check if already locked BEFORE this calculation
      // If locked, use locked values. If not locked, lock them NOW and use backend values
      let distanceToUse = backendKm
      let minutesToUse = backendMinutes
      let hoursToUse = backendHours

      if (isLocked && lockedDistanceKm !== null) {
        // Already locked from previous calculation - use locked values
        distanceToUse = lockedDistanceKm
        minutesToUse = lockedTripMinutes!
        hoursToUse = lockedTripHours!
        console.log("🔒 USING ALREADY LOCKED VALUES:", { 
          km: distanceToUse, 
          minutes: minutesToUse,
          hours: hoursToUse
        })
      } else {
        // First calculation - lock these values NOW
        setLockedDistanceKm(backendKm)
        setLockedTripMinutes(backendMinutes)
        setLockedTripHours(backendHours)
        setIsLocked(true)
        console.log("🔒 LOCKING VALUES NOW:", { 
          km: backendKm, 
          minutes: backendMinutes,
          hours: backendHours
        })
      }

      // Set display values
      setDistanceKm(distanceToUse)
      setTotalTripMinutes(minutesToUse)
      setTotalTripHours(hoursToUse)

      console.log("💰 CALCULATING PRICES WITH:", { 
        distance: distanceToUse, 
        minutes: minutesToUse,
        hours: hoursToUse,
        locked: isLocked || lockedDistanceKm !== null
      })

      // ✅ STEP 2: Calculate prices for all vehicles using these values
      const newPrices: Record<string, string> = {}
      const newBreakdowns: Record<string, any> = {}
      
      await Promise.all(
        vehicleTypes.map(async (v) => {
          setPricesLoading((prev) => ({ ...prev, [v.id]: true }))
          try {
            let urlParams = new URLSearchParams()
            
            // 🔥 FIX: Use the determined values (locked or backend)
            urlParams.append("distance", distanceToUse.toString())
            urlParams.append("vehicleType", v.id)
            urlParams.append("city", detectCity(pickup))
            urlParams.append("serviceType", bookingData.serviceType)
            urlParams.append("pickupLat", bookingData.pickupLat?.toString() || "")
            urlParams.append("pickupLng", bookingData.pickupLng?.toString() || "")
            urlParams.append("dropLat", bookingData.dropLat?.toString() || "")
            urlParams.append("dropLng", bookingData.dropLng?.toString() || "")
            urlParams.append("tripType", bookingData.tripType || "oneway")
            urlParams.append("pickupDate", bookingData.pickupDate || "")
            urlParams.append("pickupTime", bookingData.pickupTime || "")
            
            if (bookingData.tripType === "roundtrip") {
              urlParams.append("returnDate", bookingData.returnDate || "")
              urlParams.append("returnTime", bookingData.returnTime || "")
            }
            
            // 🔥 FIX: For outstation roundtrip, pass the hours value
            if (bookingData.serviceType === "outstation" && bookingData.tripType === "roundtrip") {
              urlParams.append("tripHours", hoursToUse.toString())
            }
            
            if (bookingData.serviceType === "rental") {
              urlParams.append("rentalHours", String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
              urlParams.append("actualHours", actualHours ? String(actualHours) : String(rentalPlanHoursMap[bookingData.rentalPlan] || 4))
            }
            
            if (bookingData.serviceType === "flexi") {
              urlParams.append("actualTripMinutes", minutesToUse.toString())
            }
            
            const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`
            console.log(`🔗 Fetching price for ${v.id} with distance: ${distanceToUse} km`)
            
            const res = await fetch(url)
            const data = await res.json()
            
            if (res.ok && data.totalFare) {
              newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
                style: "currency", 
                currency: "INR" 
              }).format(data.totalFare)
              newBreakdowns[v.id] = data.breakdown || {}
              
              console.log(`✅ ${v.id} price:`, data.totalFare, "| Distance used:", distanceToUse)
            } else {
              newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
                style: "currency", 
                currency: "INR" 
              }).format(v.basePrice)
              newBreakdowns[v.id] = {}
              if (data.error) setDistanceError(String(data.error))
            }
          } catch (error) {
            console.error("❌ Error calculating price for", v.id, error)
            newPrices[v.id] = new Intl.NumberFormat("en-IN", { 
              style: "currency", 
              currency: "INR" 
            }).format(v.basePrice)
            newBreakdowns[v.id] = {}
          } finally {
            setPricesLoading((prev) => ({ ...prev, [v.id]: false }))
          }
        })
      )
      
      setPrices(newPrices)
      setFareBreakdowns(newBreakdowns)
      setCalculatingDistance(false)
      
      console.log("=".repeat(60))
      console.log("✅ FRONTEND: Calculation complete")
      console.log("Locked:", isLocked || lockedDistanceKm !== null)
      console.log("=".repeat(60) + "\n")
      
    } catch (err) {
      console.error("❌ Error in distance calculation:", err)
      setDistanceError("Error calculating distance. Please try again.")
      setDistanceKm(null)
      setTotalTripHours(null)
      setTotalTripMinutes(null)
      const fallbackPrices: Record<string, string> = {}
      vehicleTypes.forEach((v) => {
        fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", { 
          style: "currency", 
          currency: "INR" 
        }).format(v.basePrice)
      })
      setPrices(fallbackPrices)
      setCalculatingDistance(false)
    }
  }

  computeDistanceAndPrices()
}, [
  bookingData.pickup,
  bookingData.destination,
  bookingData.serviceType,
  bookingData.pickupLat,
  bookingData.dropLat,
  bookingData.tripType,
  bookingData.rentalPlan,
  bookingData.vehicleType,
  bookingData.pickupDate,
  bookingData.pickupTime,
  bookingData.returnDate,
  bookingData.returnTime,
  actualHours,
  // ✅ We need isLocked and lockedDistanceKm in deps to know if values are already locked
  isLocked,
  lockedDistanceKm
])

  useEffect(() => {
    if (bookingData.serviceType === "rental" && bookingData.rentalPlan) {
      setActualHours(rentalPlanHoursMap[bookingData.rentalPlan] || 4)
      setActualDistance(rentalPlanKmsMap[bookingData.rentalPlan] || 40)
    }
  }, [bookingData.rentalPlan, bookingData.serviceType])

  useEffect(() => {
    if (bookingData.serviceType === "rental" && bookingData.rentalPlan && bookingData.vehicleType) {
      setPricesLoading((prev) => ({ ...prev, [bookingData.vehicleType]: true }))
    }
  }, [actualHours, actualDistance])

  const formatDistance = (km: number | null) => km === null ? "—" : `${km.toFixed(2)} km`
  const formatTimeHours = (hours: number | null) => hours !== null ? `${hours.toFixed(2)} hr` : "---"
  const formatTimeMins = (mins: number | null) => mins !== null ? `${mins} min` : "---"

  const applyCoupon = () => {
    const coupons: Record<string, number> = { FIRST10: 10, SAVE20: 20, WELCOME15: 15 }
    const discount = coupons[bookingData.couponCode.toUpperCase()] || 0
    updateBookingData("discount", discount)
    if (discount > 0) { alert(`Coupon applied! You saved ${discount}%`) }
    else { alert("Invalid coupon code") }
  }

  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone)

  const handleBookNow = () => {
    if (bookingData.serviceType === "rental" && !bookingData.rentalPlan) {
      alert("Please select a rental plan")
      return
    }
    if (!bookingData.vehicleType) {
      alert("Please select a vehicle type")
      return
    }
    if (!bookingData.pickup || !bookingData.destination || !bookingData.pickupLat || !bookingData.dropLat) {
      alert("Please select a valid pickup and drop location")
      return
    }
    setShowBookingForm(true)
  }

  const handleConfirmBooking = async () => {
    if (!bookingData.customerName || !bookingData.customerPhone || !isValidPhone(bookingData.customerPhone)) {
      alert("Please fill in all required fields")
      return
    }
    if (bookingData.bookingFor === "other" &&
      (!bookingData.otherPersonName || !bookingData.otherPersonPhone || !isValidPhone(bookingData.otherPersonPhone))) {
      alert("Please provide details for the person you're booking for")
      return
    }
    
    setIsSubmitting(true)
    try {
      // 🔥 FIX: Use locked values for final booking
      const finalDistance = lockedDistanceKm !== null ? lockedDistanceKm : distanceKm
      const finalMinutes = lockedTripMinutes !== null ? lockedTripMinutes : totalTripMinutes
      const finalHours = lockedTripHours !== null ? lockedTripHours : totalTripHours
      
      console.log("\n" + "=".repeat(60))
      console.log("📤 SUBMITTING BOOKING")
      console.log("=".repeat(60))
      console.log("Distance:", finalDistance, "km")
      console.log("Hours:", finalHours)
      console.log("Minutes:", finalMinutes)
      console.log("Vehicle:", bookingData.vehicleType)
      console.log("Fare:", bookingData.fare)
      console.log("=".repeat(60) + "\n")
      
      const response = await fetch(`${BACKEND_URL}/routes/save-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          gstAmount: bookingData.fare * (5 / 100),
          totalFare: bookingData.fare + bookingData.fare * (5 / 100),
          distanceKm: finalDistance,
          tripHours: finalHours,
          actualTripMinutes: bookingData.serviceType === "flexi" 
            ? finalMinutes
            : undefined
        }),
      })
      
      const data = await response.json()
      if (response.ok) {
        alert("Booking confirmed successfully!")
        router.push("/thank-you")
      } else {
        alert(data.error || "There was an error confirming your booking. Please try again.")
      }
    } catch (error) {
      console.error("❌ Network error:", error)
      alert("Network error while confirming booking.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isBookNowDisabled = (
    (bookingData.serviceType === "rental" && !bookingData.rentalPlan) ||
    !bookingData.vehicleType ||
    !bookingData.pickup ||
    !bookingData.destination ||
    !bookingData.pickupLat ||
    !bookingData.dropLat
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <Card className="p-6 mb-4">
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Pick Your Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                <Input
                  ref={pickupRef}
                  type="text"
                  placeholder="Enter pickup location"
                  value={bookingData.pickup}
                  onChange={(e) => updateBookingData("pickup", e.target.value)}
                  required
                />
                {bookingData.pickupLat && bookingData.pickupLng && (
                  <div className="text-xs text-gray-500 mt-1">
                    Lat: {bookingData.pickupLat}, Lng: {bookingData.pickupLng}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop Location *</label>
                <Input
                  ref={dropRef}
                  type="text"
                  placeholder="Enter drop location"
                  value={bookingData.destination}
                  onChange={(e) => updateBookingData("destination", e.target.value)}
                  required
                />
                {bookingData.dropLat && bookingData.dropLng && (
                  <div className="text-xs text-gray-500 mt-1">
                    Lat: {bookingData.dropLat}, Lng: {bookingData.dropLng}
                  </div>
                )}
              </div>
            </div>
            
            {bookingData.serviceType === "outstation" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date & Time *</label>
                  <input
                    className="border p-2 rounded w-full"
                    type="date"
                    value={bookingData.pickupDate}
                    onChange={(e) => updateBookingData("pickupDate", e.target.value)}
                  />
                  <input
                    className="border p-2 rounded w-full mt-1"
                    type="time"
                    value={bookingData.pickupTime}
                    onChange={(e) => updateBookingData("pickupTime", e.target.value)}
                  />
                </div>
                {bookingData.tripType === "roundtrip" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return Date & Time *</label>
                    <input
                      className="border p-2 rounded w-full"
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) => updateBookingData("returnDate", e.target.value)}
                    />
                    <input
                      className="border p-2 rounded w-full mt-1"
                      type="time"
                      value={bookingData.returnTime}
                      onChange={(e) => updateBookingData("returnTime", e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            
            {bookingData.serviceType === "outstation" && bookingData.tripType === "roundtrip" && (
              <div className="mt-2 text-sm text-blue-800">
                Estimated Total Time: <b>{formatTimeHours(lockedTripHours || totalTripHours)} ({formatTimeMins(lockedTripMinutes || totalTripMinutes)})</b>
              </div>
            )}
            
            {(!bookingData.pickup || !bookingData.destination || !bookingData.pickupLat || !bookingData.dropLat) && (
              <div className="text-xs text-red-500 mt-2">Please select locations from the suggestions. Both pickup and drop must be valid.</div>
            )}
          </CardContent>
        </Card>

        {!showBookingForm ? (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your {getServiceDisplayName()}</h1>
              <p className="text-gray-600">Choose your vehicle to get started</p>
              <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mt-4">
                <span className="text-blue-700 font-medium">Service: {getServiceDisplayName()}</span>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">From:</span> {bookingData.pickup || "—"} &nbsp; • &nbsp;
                <span className="font-medium">To:</span> {bookingData.destination || "—"} &nbsp; • &nbsp;
                <span className="font-medium">Distance:</span> {
                  calculatingDistance 
                    ? "Calculating..." 
                    : isLocked 
                      ? <span className="inline-flex items-center text-green-700 font-semibold">
                          <Lock className="w-3 h-3 mr-1" />
                          {formatDistance(lockedDistanceKm)}
                        </span>
                      : formatDistance(distanceKm)
                }
                {bookingData.serviceType === "flexi" && (
                  <>
                    &nbsp; • &nbsp;
                    <span className="font-medium">Duration:</span> {
                      isLocked 
                        ? <span className="inline-flex items-center text-green-700 font-semibold">
                            <Lock className="w-3 h-3 mr-1" />
                            {formatTimeMins(lockedTripMinutes)}
                          </span>
                        : formatTimeMins(totalTripMinutes)
                    }
                  </>
                )}
                {distanceError && <div className="text-xs text-red-600 mt-1">{distanceError}</div>}
              </div>

              {isLocked && (
                <div className="mt-2 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-xs text-green-800">
                  <Lock className="w-3 h-3 mr-1" />
                  Price locked - same fare guaranteed at checkout
                </div>
              )}

              <div className="mt-3 text-xl font-bold text-blue-900">
                {pricesLoading[bookingData.vehicleType]
                  ? "Calculating..."
                  : prices[bookingData.vehicleType]
                    ? prices[bookingData.vehicleType]
                    : "---"}
              </div>
              
              {bookingData.vehicleType && fareBreakdowns[bookingData.vehicleType] && (
                <div className="mt-6 p-5 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 max-w-md mx-auto shadow-md">
                  <h4 className="font-semibold text-blue-900 mb-3 border-b border-blue-300 pb-2">Fare Calculation Breakdown</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside text-blue-900 font-medium">
                    {Object.entries(fareBreakdowns[bookingData.vehicleType]).map(([key, value]) => (
                      <li key={key}>
                        <span className="capitalize">{key.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>:{" "}
                        <span className="font-normal">
                          {typeof value === "number"
                            ? value.toLocaleString("en-IN", { maximumFractionDigits: 2 })
                            : String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {bookingData.serviceType === "rental" && bookingData.rentalPlan && (
                <Card className="p-6 mb-4 mt-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Actual Usage (For Extra Charges)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Actual Hours Used</label>
                        <Input
                          type="number"
                          min={rentalPlanHoursMap[bookingData.rentalPlan] || 4}
                          value={actualHours}
                          onChange={(e) => setActualHours(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Actual Distance (km)</label>
                        <Input
                          type="number"
                          min={rentalPlanKmsMap[bookingData.rentalPlan] || 40}
                          value={actualDistance}
                          onChange={(e) => setActualDistance(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {bookingData.serviceType === "rental" && (
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">RENTAL PLANS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {rentalPlans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => updateBookingData("rentalPlan", plan.id)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            bookingData.rentalPlan === plan.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="font-semibold text-lg">{plan.name}</div>
                          <div className="text-sm text-gray-600">{plan.duration}</div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">VEHICLE TYPE</h3>
                  <div className="space-y-3">
                    {vehicleTypes.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={() => updateBookingData("vehicleType", vehicle.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          bookingData.vehicleType === vehicle.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} className="w-20 h-14 object-fill" />
                          <div className="text-left">
                            <div className="font-semibold">{vehicle.name}</div>
                            <div className="text-sm text-gray-600">{vehicle.capacity}</div>
                            <div className="text-xs text-gray-500">{vehicle.features?.join(" • ")}</div>
                          </div>
                        </div>
                        <div className="ml-4 text-right min-w-[120px]">
                          {pricesLoading[vehicle.id] ? (
                            <div className="text-sm text-gray-600">Calculating...</div>
                          ) : prices[vehicle.id] ? (
                            <div className="text-lg font-semibold">{prices[vehicle.id]}</div>
                          ) : (
                            <div className="text-lg font-semibold">
                              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(vehicle.basePrice)}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            {isLocked ? `${lockedDistanceKm?.toFixed(2)} km` : distanceKm ? `${distanceKm.toFixed(2)} km` : "Price based on route"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Button onClick={handleBookNow} disabled={isBookNowDisabled} className="w-full bg-blue-500 text-white hover:bg-blue-600 py-4 text-lg font-semibold">
                Book Now
              </Button>
            </div>
          </div>
        ) : (
          <div ref={bookingFormRef} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your {getServiceDisplayName()} Booking</h2>
              <p className="text-gray-600">Fill in the details to confirm your booking</p>
              
              {isLocked && (
                <div className="mt-4 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-800">
                  <Lock className="w-4 h-4 mr-2" />
                  Your fare is locked at {prices[bookingData.vehicleType]} for {formatDistance(lockedDistanceKm)}
                </div>
              )}
            </div>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-4">Who are you booking for?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateBookingData("bookingFor", "self")}
                    className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${bookingData.bookingFor === "self" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"}`}
                  >
                    <UserCheck className="w-5 h-5" />
                    <span>For Myself</span>
                  </button>
                  <button
                    onClick={() => updateBookingData("bookingFor", "other")}
                    className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${bookingData.bookingFor === "other" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"}`}
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>For Someone Else</span>
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input type="text" placeholder="Enter your full name" value={bookingData.customerName}
                      onChange={(e) => updateBookingData("customerName", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input type="tel" placeholder="Enter 10-digit mobile number" value={bookingData.customerPhone}
                      onChange={(e) => updateBookingData("customerPhone", e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input type="email" placeholder="your.email@example.com" value={bookingData.customerEmail}
                    onChange={(e) => updateBookingData("customerEmail", e.target.value)} />
                </div>
              </CardContent>
            </Card>
            
            {bookingData.bookingFor === "other" && (
              <Card className="p-6">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-lg font-semibold">Passenger Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passenger Name *</label>
                      <Input type="text" placeholder="Enter passenger's full name" value={bookingData.otherPersonName}
                        onChange={(e) => updateBookingData("otherPersonName", e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passenger Phone *</label>
                      <Input type="tel" placeholder="Enter 10-digit mobile number" value={bookingData.otherPersonPhone}
                        onChange={(e) => updateBookingData("otherPersonPhone", e.target.value)} required />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-4">Apply Coupon Code</h3>
                <div className="flex space-x-2">
                  <Input type="text" placeholder="Enter coupon code" value={bookingData.couponCode}
                    onChange={(e) => updateBookingData("couponCode", e.target.value)} className="flex-1" />
                  <Button onClick={applyCoupon} variant="outline" className="bg-transparent">
                    <Tag className="w-4 h-4 mr-2" /> Apply
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-600">Try: FIRST10, SAVE20, WELCOME15</div>
              </CardContent>
            </Card>
            
            <div className="flex space-x-4">
              <Button onClick={() => setShowBookingForm(false)} variant="outline" className="flex-1 bg-transparent">Back</Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function loadGoogleMapsScript() {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Window undefined"));
    if ((window as any).google && (window as any).google.maps) return resolve();
    const existing = document.getElementById("gmaps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.id = "gmaps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}