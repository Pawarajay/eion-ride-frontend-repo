// File: app/api/save-booking/route.ts

import { NextResponse } from 'next/server';
import path from 'path';
import axios from 'axios';
import fs from 'fs/promises'; // Use the promise-based version of fs

export async function POST(req: Request) {
  try {
    const bookingData = await req.json();

    // The path to your JSON file
    const filePath = path.join(process.cwd(), 'data', 'bookings.json');

    let bookings = [];
    try {
      // Read the existing bookings file
      const fileContent = await fs.readFile(filePath, 'utf-8');
      bookings = JSON.parse(fileContent);
    } catch (error) {
      // If the file doesn't exist or is empty, we start with an empty array
      console.log('bookings.json not found or empty, creating a new array.');
    }

    // Add a unique ID and timestamp to the new booking
    const newBooking = {
      id: Date.now().toString(), // A simple unique ID
      timestamp: new Date().toISOString(),
      ...bookingData,
    };
    
    // Add the new booking to the top of the list
    bookings.unshift(newBooking);

    let response = await axios.post('https://n8n.vasifytech.com/webhook/eionrides/bookings', newBooking, {headers: {"Content-Type": "application/json", "Authorization": "Bearer Veldq24KCO4HF4NW"}})

    // Write the updated list back to the file
    await fs.writeFile(filePath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ message: 'Booking confirmed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving booking:', error);
    return NextResponse.json({ message: 'Failed to process booking.' }, { status: 500 });
  }
}