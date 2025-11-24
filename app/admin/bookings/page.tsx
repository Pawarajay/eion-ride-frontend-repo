import path from 'path';
import fs from 'fs/promises';
import { BookingsClientPage } from './BookingsClientPage'; // We will create this next

// Define the type for a booking entry
export interface Booking {
  id: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickup: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  serviceType: string;
  tripType: string;
  vehicleType: string;
  fare: number;
}

// This server-side function gets the data from the file
async function getBookings(): Promise<Booking[]> {
  const filePath = path.join(process.cwd(), 'data', 'bookings.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read bookings.json:", error);
    return []; // Return an empty array if the file doesn't exist
  }
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  // We pass the server-fetched data to our client component
  return <BookingsClientPage bookings={bookings} />;
}