// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react"
// import { Calendar } from "@/components/ui/calendar"
// import { format } from "date-fns"
// import { cn } from "@/lib/utils" 
// import { ClockTimePicker } from "@/components/ui/clock-time-picker"
// import { useRouter } from "next/navigation"


// export default function BookingInterface() {
//     const router = useRouter()

//     // State Management
//     const [selectedService, setSelectedService] = useState("flexi")
//     const [selectedTripType, setSelectedTripType] = useState("oneway")
//     const [pickupLocation, setPickupLocation] = useState("")
//     const [dropLocation, setDropLocation] = useState("")
//     const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date())
//     const [pickupTime, setPickupTime] = useState("")
//     const [returnDate, setReturnDate] = useState<Date | undefined>()
//     const [returnTime, setReturnTime] = useState("")
//     const [assureRide, setAssureRide] = useState(false)
//     const [errors, setErrors] = useState<{ [key: string]: string }>({})

//     // Auto-suggest state
//     const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([])
//     const [dropSuggestions, setDropSuggestions] = useState<string[]>([])
//     const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
//     const [showDropSuggestions, setShowDropSuggestions] = useState(false)
//     const pickupRef = useRef<HTMLDivElement>(null)
//     const dropRef = useRef<HTMLDivElement>(null)

//     // --- Auto-suggest Logic ---
    
//     // Close suggestions when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
//                 setShowPickupSuggestions(false)
//             }
//             if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
//                 setShowDropSuggestions(false)
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     // Fetch location suggestions (API call)
// //     const fetchLocationSuggestions = async (query: string): Promise<string[]> => {
// //     const response = await fetch(`/api/places?query=${query}`)
// //     const data = await response.json()
// //     return data.predictions.map(p => p.description)
// // }
//     const fetchLocationSuggestions = async (query: string): Promise<string[]> => {
//         if (!query || query.length < 2) return []
        
//         // Mock suggestions - Replace with actual Google Places API or your backend API
//         const mockLocations = [
//             "Mumbai Airport, Mumbai",
//             "Mumbai Central Railway Station",
//             "Bandra West, Mumbai",
//             "Andheri East, Mumbai",
//             "Navi Mumbai",
//             "Pune Airport, Pune",
//             "Pune Railway Station",
//             "Delhi Airport, Delhi",
//             "Bangalore Airport, Bangalore",
//             "Chennai Airport, Chennai"
//         ]
        
//         return mockLocations.filter(loc => 
//             loc.toLowerCase().includes(query.toLowerCase())
//         ).slice(0, 5)
//     }

//     // Handle pickup location input
//     const handlePickupChange = async (value: string) => {
//         setPickupLocation(value)
//         if (value.length >= 2) {
//             const suggestions = await fetchLocationSuggestions(value)
//             setPickupSuggestions(suggestions)
//             setShowPickupSuggestions(true)
//         } else {
//             setPickupSuggestions([])
//             setShowPickupSuggestions(false)
//         }
//     }

//     // Handle drop location input
//     const handleDropChange = async (value: string) => {
//         setDropLocation(value)
//         if (value.length >= 2) {
//             const suggestions = await fetchLocationSuggestions(value)
//             setDropSuggestions(suggestions)
//             setShowDropSuggestions(true)
//         } else {
//             setDropSuggestions([])
//             setShowDropSuggestions(false)
//         }
//     }

//     // Select pickup suggestion
//     const selectPickupSuggestion = (suggestion: string) => {
//         setPickupLocation(suggestion)
//         setShowPickupSuggestions(false)
//     }

//     // Select drop suggestion
//     const selectDropSuggestion = (suggestion: string) => {
//         setDropLocation(suggestion)
//         setShowDropSuggestions(false)
//     }

//     // --- Time and Date Logic ---

//     // Set default pickup date and time on initial render
//     useEffect(() => {
//         const now = new Date()
//         const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

//         setPickupDate(oneHourLater)
//         setPickupTime(format(oneHourLater, "HH:mm"))
//     }, [])

//     const getMinTimeForDate = (selectedDate: Date | undefined) => {
//         if (!selectedDate) return "00:00"

//         const today = new Date()
//         today.setHours(0, 0, 0, 0) // Normalize today's date

//         const selDate = new Date(selectedDate)
//         selDate.setHours(0, 0, 0, 0) // Normalize selected date

//         if (selDate.getTime() === today.getTime()) {
//             const now = new Date()
//             const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
//             return format(oneHourLater, "HH:mm")
//         }
//         return "00:00"
//     }

//     // Adjust pickup time if the selected date changes to today and time is in the past
//     useEffect(() => {
//         if (!pickupDate) return

//         const minTime = getMinTimeForDate(pickupDate)
//         if (pickupTime < minTime) {
//             setPickupTime(minTime)
//         }
//     }, [pickupDate])

//     // --- Validation and Submission ---

//     const validateForm = () => {
//         const newErrors: { [key: string]: string } = {}

//         if (!pickupLocation.trim()) {
//             newErrors.pickupLocation = "Pickup location is required."
//         }
//         if (!dropLocation.trim()) {
//             newErrors.dropLocation = "Drop location is required."
//         }
//         if (!pickupDate) {
//             newErrors.pickupDate = "Pickup date is required."
//         }
//         if (!pickupTime) {
//             newErrors.pickupTime = "Pickup time is required."
//         }

//         if (selectedService === "outstation" && selectedTripType === "roundtrip") {
//             if (!returnDate) {
//                 newErrors.returnDate = "Return date is required."
//             }
//             if (!returnTime) {
//                 newErrors.returnTime = "Return time is required."
//             }

//             if (pickupDate && pickupTime && returnDate && returnTime) {
//                 const pickupDateTime = new Date(pickupDate)
//                 const [pHour, pMin] = pickupTime.split(':').map(Number)
//                 pickupDateTime.setHours(pHour, pMin)

//                 const returnDateTime = new Date(returnDate)
//                 const [rHour, rMin] = returnTime.split(':').map(Number)
//                 returnDateTime.setHours(rHour, rMin)

//                 if (returnDateTime <= pickupDateTime) {
//                     newErrors.returnDate = "Return date and time must be after pickup."
//                 }
//             }
//         }

//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     const handleProceed = () => {
//         const params = new URLSearchParams({
//             service: selectedService,
//             tripType: selectedTripType,
//             pickup: pickupLocation,
//             drop: dropLocation,
//             pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "",
//             pickupTime: pickupTime,
//             ...(selectedService === "outstation" &&
//                 selectedTripType === "roundtrip" && {
//                 returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
//                 returnTime: returnTime,
//             }),
//             assureRide: assureRide.toString(),
//         })

//         router.push(`/book?${params.toString()}`)
//     }

//     const services = [
//         { id: "flexi", name: "Flexi" },
//         { id: "rental", name: "Rental" },
//         { id: "outstation", name: "Outstation" },
//     ]

//     const tripTypes = [
//         { id: "oneway", name: "One Way" },
//         { id: "roundtrip", name: "Round Trip" },
//     ]

//     return (
//         <div className="bg-white/90 w-full p-6 
                
//                 flex-grow 
//                 lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
//             {/* Location Inputs */}
//             <div className="space-y-4 mb-6">
//                 <div ref={pickupRef} className="relative">
//                     <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                         </div>
//                         <Input
//                             value={pickupLocation}
//                             onChange={(e) => handlePickupChange(e.target.value)}
//                             onFocus={() => pickupSuggestions.length > 0 && setShowPickupSuggestions(true)}
//                             className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//                             placeholder="Enter Pickup Location"
//                         />
//                         <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                             <MapPin className="w-5 h-5 text-gray-400" />
//                         </button>
//                     </div>
//                     {showPickupSuggestions && pickupSuggestions.length > 0 && (
//                         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                             {pickupSuggestions.map((suggestion, index) => (
//                                 <div
//                                     key={index}
//                                     onClick={() => selectPickupSuggestion(suggestion)}
//                                     className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 border-b last:border-b-0"
//                                 >
//                                     <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                                     <span className="text-sm text-gray-700">{suggestion}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
//                 </div>
//                 <div ref={dropRef} className="relative">
//                     <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                         </div>
//                         <Input
//                             value={dropLocation}
//                             onChange={(e) => handleDropChange(e.target.value)}
//                             onFocus={() => dropSuggestions.length > 0 && setShowDropSuggestions(true)}
//                             className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//                             placeholder="Enter Drop Location"
//                         />
//                         <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                             <MapPin className="w-5 h-5 text-gray-400" />
//                         </button>
//                     </div>
//                     {showDropSuggestions && dropSuggestions.length > 0 && (
//                         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                             {dropSuggestions.map((suggestion, index) => (
//                                 <div
//                                     key={index}
//                                     onClick={() => selectDropSuggestion(suggestion)}
//                                     className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 border-b last:border-b-0"
//                                 >
//                                     <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                                     <span className="text-sm text-gray-700">{suggestion}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {errors.dropLocation && <p className="text-red-500 text-xs mt-1">{errors.dropLocation}</p>}
//                 </div>
//             </div>

//             {/* Service Selection */}
//             <div className="flex flex-wrap gap-2 mb-6">
//                 {services.map((service) => (
//                     <Button
//                         key={service.id}
//                         variant={selectedService === service.id ? "default" : "outline"}
//                         onClick={() => setSelectedService(service.id)}
//                         className="flex-grow"
//                     >
//                         {service.name}
//                     </Button>
//                 ))}
//             </div>

//             {/* Outstation Trip Type Selection */}
//             {selectedService === "outstation" && (
//                 <div className="flex flex-wrap gap-2 mb-6">
//                     {tripTypes.map((type) => (
//                         <Button
//                             key={type.id}
//                             variant={selectedTripType === type.id ? "default" : "outline"}
//                             onClick={() => setSelectedTripType(type.id)}
//                             className="flex-grow"
//                         >
//                             {type.name}
//                         </Button>
//                     ))}
//                 </div>
//             )}

//             {/* Date, Time, and Return Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//                 {/* Pickup Time */}
//                 <div>
//                     <label className="block text-xs text-gray-500 mb-1">PICKUP TIME</label>
//                     <ClockTimePicker
//                         value={pickupTime}
//                         onChange={setPickupTime}
//                         minTime={getMinTimeForDate(pickupDate)}
//                     />
//                     {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
//                 </div>
//                 {/* Pickup Date */}
//                 <div>
//                     <label className="block text-xs text-gray-500 mb-1">PICKUP DATE</label>
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 variant={"outline"}
//                                 className={cn(
//                                     "w-full justify-start text-left font-normal",
//                                     !pickupDate && "text-muted-foreground"
//                                 )}
//                             >
//                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                 {pickupDate ? format(pickupDate, "MMM d, yyyy") : <span>Pick a date</span>}
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                             <Calendar
//                                 mode="single"
//                                 selected={pickupDate}
//                                 onSelect={setPickupDate}
//                                 disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
//                                 initialFocus
//                             />
//                         </PopoverContent>
//                     </Popover>
//                     {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
//                 </div>

//                 {/* Return Date and Time for Round Trip */}
//                 {selectedService === "outstation" && selectedTripType === "roundtrip" && (
//                     <>
//                         <div>
//                             <label className="block text-xs text-gray-500 mb-1">RETURN TIME</label>
//                             <ClockTimePicker
//                                 value={returnTime}
//                                 onChange={setReturnTime}
//                             />
//                             {errors.returnTime && <p className="text-red-500 text-xs mt-1">{errors.returnTime}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-xs text-gray-500 mb-1">RETURN DATE</label>
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant={"outline"}
//                                         className={cn(
//                                             "w-full justify-start text-left font-normal",
//                                             !returnDate && "text-muted-foreground"
//                                         )}
//                                     >
//                                         <CalendarIcon className="mr-2 h-4 w-4" />
//                                         {returnDate ? format(returnDate, "MMM d, yyyy") : <span>Pick a date</span>}
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0">
//                                     <Calendar
//                                         mode="single"
//                                         selected={returnDate}
//                                         onSelect={setReturnDate}
//                                         disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
//                                         initialFocus
//                                     />
//                                 </PopoverContent>
//                             </Popover>
//                             {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Assure Ride Option */}
//             <div className="flex items-center space-x-3 mb-6">
//                 <button
//                     onClick={() => setAssureRide(!assureRide)}
//                     className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${assureRide ? "bg-blue-500 border-blue-500" : "border-gray-300 hover:border-blue-400"
//                         }`}
//                 >
//                     {assureRide && <CheckCircle className="w-3 h-3 text-white" />}
//                 </button>
//                 <span className="text-sm text-gray-700">Ride Cover for Rs 20.00  per ride</span>
//             </div>

//             {/* Proceed Button */}
//             <Button
//                 onClick={handleProceed}
//                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white 
//              py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl 
//              flex items-center justify-center group transition-all"
//             >
//                 <span className="whitespace-nowrap">Book My Ride</span>

//                 <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
//             </Button>
//         </div>
//     )
// }



//testing code
"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClockTimePicker } from "@/components/ui/clock-time-picker";
import { useRouter } from "next/navigation";

// --- GOOGLE AUTOCOMPLETE FOR PLACE --
function setupPlaceAutocomplete(ref: React.RefObject<HTMLInputElement>, onSelect: (address: string, lat: number, lng: number) => void) {
  useEffect(() => {
    if (!ref.current) return;
    const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    async function loadScript() {
      if (!(window as any).google || !(window as any).google.maps) {
        if (!document.getElementById("gmaps-js")) {
          const script = document.createElement("script");
          script.id = "gmaps-js";
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          script.onload = setup;
        } else {
          document.getElementById("gmaps-js")?.addEventListener("load", setup);
        }
      } else {
        setup();
      }
    }
    function setup() {
      const google = (window as any).google;
      if (ref.current && !(ref.current as any).autocompleteAttached) {
        const autocomplete = new google.maps.places.Autocomplete(ref.current, { componentRestrictions: { country: "in" } });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            onSelect(place.formatted_address || place.name, place.geometry.location.lat(), place.geometry.location.lng());
          }
        });
        (ref.current as any).autocompleteAttached = true;
      }
    }
    loadScript();
    // No cleanup needed for one-time setup
    // eslint-disable-next-line
  }, []);
}

// --- MAIN COMPONENT --
export default function BookingInterface() {
  const router = useRouter();

  // State Management
  const [selectedService, setSelectedService] = useState("flexi");
  const [selectedTripType, setSelectedTripType] = useState("oneway");

  const [pickupLocation, setPickupLocation] = useState(""); // text
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);

  const [dropLocation, setDropLocation] = useState(""); // text
  const [dropLat, setDropLat] = useState<number | null>(null);
  const [dropLng, setDropLng] = useState<number | null>(null);

  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [returnTime, setReturnTime] = useState("");
  const [assureRide, setAssureRide] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Autocomplete refs
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);

  // Attach Google Autocomplete once
  setupPlaceAutocomplete(pickupInputRef, (address, lat, lng) => {
    setPickupLocation(address);
    setPickupLat(lat);
    setPickupLng(lng);
  });
  setupPlaceAutocomplete(dropInputRef, (address, lat, lng) => {
    setDropLocation(address);
    setDropLat(lat);
    setDropLng(lng);
  });

  // --- Set default pickup date/time ---
  useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    setPickupDate(oneHourLater);
    setPickupTime(format(oneHourLater, "HH:mm"));
  }, []);

  const getMinTimeForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return "00:00";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selDate = new Date(selectedDate);
    selDate.setHours(0, 0, 0, 0);
    if (selDate.getTime() === today.getTime()) {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      return format(oneHourLater, "HH:mm");
    }
    return "00:00";
  };

  useEffect(() => {
    if (!pickupDate) return;
    const minTime = getMinTimeForDate(pickupDate);
    if (pickupTime < minTime) setPickupTime(minTime);
  }, [pickupDate]);

  // --- Validation and Submission ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!pickupLocation.trim() || !pickupLat || !pickupLng) {
      newErrors.pickupLocation = "Select pickup from suggestions.";
    }
    if (!dropLocation.trim() || !dropLat || !dropLng) {
      newErrors.dropLocation = "Select drop from suggestions.";
    }
    if (!pickupDate) {
      newErrors.pickupDate = "Pickup date is required.";
    }
    if (!pickupTime) {
      newErrors.pickupTime = "Pickup time is required.";
    }
    if (selectedService === "outstation" && selectedTripType === "roundtrip") {
      if (!returnDate) {
        newErrors.returnDate = "Return date is required.";
      }
      if (!returnTime) {
        newErrors.returnTime = "Return time is required.";
      }
      if (pickupDate && pickupTime && returnDate && returnTime) {
        const pickupDateTime = new Date(pickupDate);
        const [pHour, pMin] = pickupTime.split(":").map(Number);
        pickupDateTime.setHours(pHour, pMin);

        const returnDateTime = new Date(returnDate);
        const [rHour, rMin] = returnTime.split(":").map(Number);
        returnDateTime.setHours(rHour, rMin);

        if (returnDateTime <= pickupDateTime) {
          newErrors.returnDate = "Return date and time must be after pickup.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Booking page navigation ---
  const handleProceed = () => {
    if (!validateForm()) return;
    const params = new URLSearchParams({
      service: selectedService,
      tripType: selectedTripType,
      pickup: pickupLocation,
      pickupLat: pickupLat?.toString() || "",
      pickupLng: pickupLng?.toString() || "",
      drop: dropLocation,
      dropLat: dropLat?.toString() || "",
      dropLng: dropLng?.toString() || "",
      pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "",
      pickupTime: pickupTime,
      ...(selectedService === "outstation" &&
        selectedTripType === "roundtrip" && {
        returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
        returnTime: returnTime
      }),
      assureRide: assureRide.toString(),
    });
    router.push(`/book?${params.toString()}`);
  };

  const services = [
    { id: "flexi", name: "Flexi" },
    { id: "rental", name: "Rental" },
    { id: "outstation", name: "Outstation" },
  ];
  const tripTypes = [
    { id: "oneway", name: "One Way" },
    { id: "roundtrip", name: "Round Trip" },
  ];

  return (
    <div className="bg-white/90 w-full p-6 flex-grow lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
      <div className="space-y-4 mb-6">

        {/* Pickup */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <Input
            ref={pickupInputRef}
            value={pickupLocation}
            onChange={e => setPickupLocation(e.target.value)}
            className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter Pickup Location "
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <MapPin className="w-5 h-5 text-gray-400" />
          </button>
          {pickupLat && pickupLng && (
            <div className="text-xs text-gray-500 mt-1">
              Lat: {pickupLat}, Lng: {pickupLng}
            </div>
          )}
          {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
        </div>
        {/* Drop */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <Input
            ref={dropInputRef}
            value={dropLocation}
            onChange={e => setDropLocation(e.target.value)}
            className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter Drop Location "
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <MapPin className="w-5 h-5 text-gray-400" />
          </button>
          {dropLat && dropLng && (
            <div className="text-xs text-gray-500 mt-1">
              Lat: {dropLat}, Lng: {dropLng}
            </div>
          )}
          {errors.dropLocation && <p className="text-red-500 text-xs mt-1">{errors.dropLocation}</p>}
        </div>
      </div>
      {/* Service Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {services.map((service) => (
          <Button
            key={service.id}
            variant={selectedService === service.id ? "default" : "outline"}
            onClick={() => setSelectedService(service.id)}
            className="flex-grow"
          >
            {service.name}
          </Button>
        ))}
      </div>
      {/* Outstation Trip Type Selection */}
      {selectedService === "outstation" && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tripTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedTripType === type.id ? "default" : "outline"}
              onClick={() => setSelectedTripType(type.id)}
              className="flex-grow"
            >
              {type.name}
            </Button>
          ))}
        </div>
      )}
      {/* Date, Time, and Return Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Pickup Time */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">PICKUP TIME</label>
          <ClockTimePicker
            value={pickupTime}
            onChange={setPickupTime}
            minTime={getMinTimeForDate(pickupDate)}
          />
          {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
        </div>
        {/* Pickup Date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">PICKUP DATE</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "MMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
        </div>
        {/* Return Date and Time for Round Trip */}
        {selectedService === "outstation" && selectedTripType === "roundtrip" && (
          <>
            <div>
              <label className="block text-xs text-gray-500 mb-1">RETURN TIME</label>
              <ClockTimePicker
                value={returnTime}
                onChange={setReturnTime}
              />
              {errors.returnTime && <p className="text-red-500 text-xs mt-1">{errors.returnTime}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">RETURN DATE</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM d, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
            </div>
          </>
        )}
      </div>
      {/* Assure Ride Option */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          type="button"
          onClick={() => setAssureRide(!assureRide)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${assureRide ? "bg-blue-500 border-blue-500" : "border-gray-300 hover:border-blue-400"
            }`}
        >
          {assureRide && <CheckCircle className="w-3 h-3 text-white" />}
        </button>
        <span className="text-sm text-gray-700">Ride Cover for Rs 20.00  per ride</span>
      </div>
      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center group transition-all"
      >
        <span className="whitespace-nowrap">Book My Ride</span>
        <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

