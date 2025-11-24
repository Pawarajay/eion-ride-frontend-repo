"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react" // Phone icon from Lucide
import { FaWhatsapp } from "react-icons/fa" // WhatsApp icon from React Icons


export default function WhatsAppButton() {
  // Replace with your actual WhatsApp number (without + or spaces)
  const whatsappno = "918452890907" // Your number without + or spaces
  const whatsappMessage = "Hi, I'd like to inquire about your services."
  const phoneNumber = "+916232107555"

  // Handler for the Phone Call button
  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  // Handler for the WhatsApp button
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappno}?text=${encodeURIComponent(
      whatsappMessage
    )}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    // This container now uses Flexbox to stack the buttons vertically
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      {/* Phone Call Button */}
      <Button
        onClick={handlePhoneClick}
        aria-label="Call us"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        size="lg"
      >
        <Phone className="h-7 w-7" />
      </Button>

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        size="lg"
      >
        {/* Using the real WhatsApp icon */}
        <FaWhatsapp className="h-8 w-8" />
      </Button>
    </div>
  )
}
