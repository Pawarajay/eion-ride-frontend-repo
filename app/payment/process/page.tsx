"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Wallet, Smartphone, Shield, CheckCircle, Clock, Lock, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentProcessPage() {
  const searchParams = useSearchParams()
  const tripId = searchParams.get("tripId") || "TR001"
  const amount = Number.parseFloat(searchParams.get("amount") || "180")

  const [selectedMethod, setSelectedMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [tip, setTip] = useState(0)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="w-5 h-5" />,
      description: "PhonePe, GPay, Paytm",
    },
    {
      id: "wallet",
      name: "Eion Rides Wallet",
      icon: <Wallet className="w-5 h-5" />,
      description: "Balance: ₹250",
    },
    {
      id: "cash",
      name: "Cash",
      icon: <span className="text-lg">💵</span>,
      description: "Pay driver directly",
    },
  ]

  const tipOptions = [0, 10, 20, 30, 50]

  const totalAmount = amount + tip - discount

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setProcessing(false)
    setPaymentComplete(true)
  }

  const applyPromoCode = () => {
    if (promoCode === "SAVE20") {
      setDiscount(20)
    } else if (promoCode === "FIRST10") {
      setDiscount(10)
    }
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment of ₹{totalAmount} has been processed successfully.</p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-lime-400 text-black hover:bg-lime-500">
              <Link href={`/track/${tripId}`}>Track Your Ride</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/book" className="flex items-center text-gray-600 hover:text-lime-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Booking
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">in</span>
            </div>
            <span className="text-xl font-bold">Drive</span>
          </div>

          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600">Secure Payment</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Choose Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "border-lime-400 bg-lime-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {method.icon}
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedMethod === method.id ? "border-lime-400 bg-lime-400" : "border-gray-300"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Card Details Form */}
                {selectedMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <h4 className="font-medium mb-4">Card Details</h4>
                    <div className="space-y-4">
                      <Input
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                        />
                        <Input
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                      <Input
                        placeholder="Cardholder Name"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  </motion.div>
                )}

                {/* UPI Details */}
                {selectedMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <h4 className="font-medium mb-4">UPI ID</h4>
                    <Input placeholder="Enter your UPI ID (e.g., user@paytm)" />
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Tip Section */}
            <Card className="p-6 mt-6">
              <CardHeader>
                <CardTitle>Add Tip for Driver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  {tipOptions.map((tipAmount) => (
                    <Button
                      key={tipAmount}
                      variant={tip === tipAmount ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTip(tipAmount)}
                      className={tip === tipAmount ? "bg-lime-400 text-black hover:bg-lime-500" : "bg-transparent"}
                    >
                      {tipAmount === 0 ? "No Tip" : `₹${tipAmount}`}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTip(Math.max(0, tip - 5))}
                    className="bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={tip}
                    onChange={(e) => setTip(Number.parseInt(e.target.value) || 0)}
                    className="text-center"
                    min="0"
                  />
                  <Button variant="outline" size="sm" onClick={() => setTip(tip + 5)} className="bg-transparent">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="p-6 mt-6">
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} className="bg-lime-400 text-black hover:bg-lime-500">
                    Apply
                  </Button>
                </div>
                {discount > 0 && <div className="mt-2 text-green-600 text-sm">Discount applied: -₹{discount}</div>}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Trip ID:</span>
                  <span className="font-medium">{tripId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Fare:</span>
                  <span>₹{amount}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Driver Tip:</span>
                    <span>₹{tip}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-lime-400 text-black hover:bg-lime-500 disabled:opacity-50"
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Pay ₹${totalAmount}`
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center mt-4">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
