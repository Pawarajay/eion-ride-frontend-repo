"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Gift,
  Zap,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(250)
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [addAmount, setAddAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState(0)

  const quickAmounts = [100, 200, 500, 1000, 2000]

  const transactions = [
    {
      id: "W001",
      type: "credit",
      amount: 100,
      description: "Wallet top-up",
      date: "2024-01-15",
      time: "10:30 AM",
      method: "Visa •••• 4242",
    },
    {
      id: "W002",
      type: "debit",
      amount: 180,
      description: "Trip payment - TR001",
      date: "2024-01-15",
      time: "9:55 AM",
      tripId: "TR001",
    },
    {
      id: "W003",
      type: "credit",
      amount: 50,
      description: "Referral bonus",
      date: "2024-01-14",
      time: "2:15 PM",
      bonus: true,
    },
    {
      id: "W004",
      type: "debit",
      amount: 120,
      description: "Trip payment - TR002",
      date: "2024-01-14",
      time: "9:10 PM",
      tripId: "TR002",
    },
    {
      id: "W005",
      type: "credit",
      amount: 200,
      description: "Wallet top-up",
      date: "2024-01-12",
      time: "11:45 AM",
      method: "UPI",
    },
  ]

  const handleAddMoney = () => {
    const amount = selectedAmount || Number.parseInt(addAmount)
    if (amount > 0) {
      setWalletBalance((prev) => prev + amount)
      setShowAddMoney(false)
      setAddAmount("")
      setSelectedAmount(0)
    }
  }

  const getTransactionIcon = (transaction: any) => {
    if (transaction.type === "credit") {
      return transaction.bonus ? (
        <Gift className="w-5 h-5 text-purple-600" />
      ) : (
        <ArrowDownLeft className="w-5 h-5 text-green-600" />
      )
    }
    return <ArrowUpRight className="w-5 h-5 text-red-600" />
  }

  const getTransactionColor = (transaction: any) => {
    if (transaction.type === "credit") {
      return transaction.bonus ? "text-purple-600" : "text-green-600"
    }
    return "text-red-600"
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

          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Statement
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eion Rides Wallet</h1>
          <p className="text-gray-600">Manage your wallet balance and transactions</p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="p-6 bg-gradient-to-r from-lime-400 to-lime-500 text-black">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="w-6 h-6" />
                  <span className="text-lg font-medium">Wallet Balance</span>
                </div>
                <p className="text-3xl font-bold">₹{walletBalance}</p>
                <p className="text-sm opacity-80 mt-1">Available for rides</p>
              </div>
              <Button onClick={() => setShowAddMoney(true)} className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Money
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <CardContent className="p-0 flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold">₹450</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0 flex items-center space-x-3">
              <Zap className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Saved</p>
                <p className="text-xl font-bold">₹1,250</p>
                <p className="text-xs text-blue-600">From discounts & offers</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0 flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Avg. Monthly</p>
                <p className="text-xl font-bold">₹380</p>
                <p className="text-xs text-purple-600">Wallet usage</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
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
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getTransactionIcon(transaction)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>
                            {transaction.date} at {transaction.time}
                          </span>
                          {transaction.method && (
                            <>
                              <span>•</span>
                              <span>{transaction.method}</span>
                            </>
                          )}
                          {transaction.tripId && (
                            <>
                              <span>•</span>
                              <Link href={`/track/${transaction.tripId}`} className="text-lime-600 hover:underline">
                                {transaction.tripId}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getTransactionColor(transaction)}`}>
                        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                      </p>
                      {transaction.bonus && <Badge className="bg-purple-100 text-purple-800 mt-1">Bonus</Badge>}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Wallet Features */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Wallet Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Instant Payments</h4>
                    <p className="text-sm text-gray-600">No payment delays during rides</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gift className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Exclusive Offers</h4>
                    <p className="text-sm text-gray-600">Special discounts for wallet users</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cashback Rewards</h4>
                    <p className="text-sm text-gray-600">Earn cashback on every ride</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Auto Top-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Automatically add money when balance is low</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Setup Auto Top-up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Add Money to Wallet</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select</label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedAmount(amount)
                          setAddAmount("")
                        }}
                        className={
                          selectedAmount === amount ? "bg-lime-400 text-black hover:bg-lime-500" : "bg-transparent"
                        }
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={addAmount}
                    onChange={(e) => {
                      setAddAmount(e.target.value)
                      setSelectedAmount(0)
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Visa •••• 4242</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddMoney} className="flex-1 bg-lime-400 text-black hover:bg-lime-500">
                    Add ₹{selectedAmount || addAmount || 0}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddMoney(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
