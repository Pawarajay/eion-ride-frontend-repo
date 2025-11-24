// File: app/admin/bookings/BookingsClientPage.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Car, 
  Calendar, 
  Clock, 
  DollarSign,
  Search,
  Inbox
} from 'lucide-react';
import type { Booking } from './page'; // Import the type from the server component

export function BookingsClientPage({ bookings }: { bookings: Booking[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerPhone.includes(searchTerm) ||
    booking.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServiceBadgeColor = (serviceType: string) => {
    switch (serviceType) {
      case "rental": return "bg-green-100 text-green-800";
      case "outstation": return "bg-purple-100 text-purple-800";
      case "flexi": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon" className="bg-white/80 h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Bookings</h1>
              <p className="text-gray-600">Found {filteredBookings.length} of {bookings.length} total bookings.</p>
            </div>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by name, phone, location..."
              className="pl-10 bg-white/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl hover:border-blue-300 transition-all border">
                  <CardHeader className="flex flex-row items-start justify-between pb-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                      <p className="text-sm text-gray-500 flex items-center gap-2"><Phone className="w-3 h-3"/>{booking.customerPhone}</p>
                      {booking.customerEmail && <p className="text-sm text-gray-500 flex items-center gap-2"><Mail className="w-3 h-3"/>{booking.customerEmail}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Badge className={`text-xs ${getServiceBadgeColor(booking.serviceType)}`}>{booking.serviceType}</Badge>
                        <p className="text-xl font-bold text-green-600 flex items-center"><DollarSign className="w-4 h-4 mr-1"/>{booking.fare}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 border-t">
                    <div className="text-sm space-y-2">
                        <p className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" /> <span><strong>From:</strong> {booking.pickup}</span></p>
                        <p className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" /> <span><strong>To:</strong> {booking.destination}</span></p>
                        <p className="flex items-center gap-3"><Car className="w-4 h-4 text-gray-500 flex-shrink-0" /> <span><strong>Vehicle:</strong> {booking.vehicleType}</span></p>
                        <p className="flex items-center gap-3"><Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" /> <span><strong>Date:</strong> {new Date(booking.pickupDate).toLocaleDateString()}</span></p>
                        <p className="flex items-center gap-3"><Clock className="w-4 h-4 text-gray-500 flex-shrink-0" /> <span><strong>Time:</strong> {booking.pickupTime}</span></p>
                    </div>
                    <p className="text-xs text-gray-400 text-right pt-2 border-t">Booked on {new Date(booking.timestamp).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/80 rounded-xl border"
           >
            <Inbox className="w-16 h-16 mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">No Bookings Found</h2>
            <p className="mt-2 text-gray-500">
                {searchTerm ? "Try adjusting your search query." : "There are no customer bookings yet."}
            </p>
           </motion.div>
        )}
      </div>
    </div>
  );
}