"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Plus,
  ArrowLeft,
  Trash2,
  Edit,
  Shield,
  Calendar,
  DollarSign,
  Receipt,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      name: "Visa ending in 4242",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      name: "Mastercard ending in 8888",
      last4: "8888",
      brand: "mastercard",
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false,
    },
  ])

  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      tripId: "TR001",
      amount: 180,
      date: "2024-01-15",
      time: "9:55 AM",
      method: "Visa •••• 4242",
      status: "completed",
      driver: "Rajesh Kumar",
      route: "Andheri West → BKC",
    },
    {
      id: "TXN002",
      tripId: "TR002",
      amount: 120,
      date: "2024-01-14",
      time: "9:10 PM",
      method: "Cash",
      status: "completed",
      driver: "Amit Sharma",
      route: "Phoenix Mall → Home",
    },
    {
      id: "TXN003",
      tripId: "TR003",
      amount: 350,
      date: "2024-01-10",
      time: "12:15 AM",
      method: "Visa •••• 4242",
      status: "completed",
      driver: "Suresh Patel",
      route: "Airport → Hotel Taj",
    },
    {
      id: "TXN004",
      tripId: "TR004",
      amount: 80,
      date: "2024-01-08",
      time: "2:20 PM",
      method: "Visa •••• 4242",
      status: "refunded",
      driver: "Vikram Singh",
      route: "Bandra Station → Linking Road",
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const totalSpent = transactions.filter((t) => t.status === "completed").reduce((sum, txn) => sum + txn.amount, 0)
  const thisMonthSpent = transactions
    .filter((t) => {
      const txnDate = new Date(t.date)
      const now = new Date()
      return (
        txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear() && t.status === "completed"
      )
    })
    .reduce((sum, txn) => sum + txn.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      default:
        return "💳"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-lime-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">in</span>
            </div>
            <span className="text-xl font-bold">Drive</span>
          </div>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments & Billing</h1>
            <p className="text-gray-600">Manage your payment methods and view transaction history</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalSpent}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">₹{thisMonthSpent}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Payment Methods</p>
                  <p className="text-2xl font-bold">{paymentMethods.length}</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Payment Methods</span>
                  <Button
                    size="sm"
                    onClick={() => setShowAddCard(true)}
                    className="bg-lime-400 text-black hover:bg-lime-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg ${
                      method.isDefault ? "border-lime-400 bg-lime-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getBrandIcon(method.brand)}</span>
                        <span className="font-medium">{method.name}</span>
                      </div>
                      {method.isDefault && <Badge className="bg-lime-100 text-lime-800">Default</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add Cash Option */}
                <div className="p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">💵</span>
                    <span className="font-medium">Cash Payment</span>
                  </div>
                  <p className="text-sm text-gray-600">Pay directly to your driver</p>
                </div>

                {showAddCard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg"
                  >
                    <h4 className="font-medium mb-3">Add New Card</h4>
                    <div className="space-y-3">
                      <Input
                        placeholder="Card Number"
                        value={newCard.number}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, number: e.target.value }))}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="MM/YY"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard((prev) => ({ ...prev, expiry: e.target.value }))}
                        />
                        <Input
                          placeholder="CVV"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                      <Input
                        placeholder="Cardholder Name"
                        value={newCard.name}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, name: e.target.value }))}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-lime-400 text-black hover:bg-lime-500">
                          Add Card
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddCard(false)}
                          className="bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="p-6 mt-6">
              <CardContent className="p-0">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Secure Payments</h4>
                    <p className="text-sm text-green-600 mt-1">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="w-5 h-5" />
                  <span>Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-lime-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{transaction.tripId}</p>
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.route}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>
                            {transaction.date} at {transaction.time}
                          </span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                          <span>•</span>
                          <span>Driver: {transaction.driver}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.status === "refunded" ? "text-blue-600" : "text-green-600"
                        }`}
                      >
                        {transaction.status === "refunded" ? "+" : ""}₹{transaction.amount}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Receipt
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
