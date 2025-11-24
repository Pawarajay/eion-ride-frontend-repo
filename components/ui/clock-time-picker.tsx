// src/components/ui/time-picker.tsx

"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TimePickerProps {
  value: string // Still expects 24-hour format, e.g., "14:30"
  onChange: (time: string) => void // Still emits 24-hour format
  minTime?: string // e.g., "09:00"
}

// Helper to format 24-hour time to 12-hour AM/PM for display
const formatTo12Hour = (time: string): string => {
  if (!time) return "Pick a time"
  const [hour, minute] = time.split(":").map(Number)
  const period = hour >= 12 ? "PM" : "AM"
  const adjustedHour = hour % 12 || 12 // Convert 0 or 12 to 12
  return `${String(adjustedHour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )} ${period}`
}

export function ClockTimePicker({ value, onChange, minTime = "00:00" }: TimePickerProps) {
  const hourRef = React.useRef<HTMLDivElement>(null)
  const minuteRef = React.useRef<HTMLDivElement>(null)

  // Parse the incoming 24-hour time value
  const [hour24, minute] = value.split(":").map(Number)
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = hour24 % 12 || 12

  React.useEffect(() => {
    // Scroll to the selected hour and minute when the popover opens
    if (hourRef.current) {
        const selectedHourElement = hourRef.current.querySelector(`[data-hour="${hour12}"]`)
        if (selectedHourElement) {
            selectedHourElement.scrollIntoView({ block: "center" })
        }
    }
    if (minuteRef.current) {
        const selectedMinuteElement = minuteRef.current.querySelector(`[data-minute="${minute}"]`)
        if (selectedMinuteElement) {
            selectedMinuteElement.scrollIntoView({ block: "center" })
        }
    }
  }, [hour12, minute])
  
  const handleTimeChange = (newHour12: number | null, newMinute: number | null, newPeriod: "AM" | "PM" | null) => {
    const currentPeriod = period
    const finalPeriod = newPeriod || currentPeriod

    const currentHour12 = hour12
    const finalHour12 = newHour12 !== null ? newHour12 : currentHour12

    const finalMinute = newMinute !== null ? newMinute : minute

    // Convert back to 24-hour format to call onChange
    let finalHour24 = 0
    if (finalPeriod === 'AM') {
        finalHour24 = finalHour12 === 12 ? 0 : finalHour12 // 12 AM is 00 hours
    } else { // PM
        finalHour24 = finalHour12 === 12 ? 12 : finalHour12 + 12 // 12 PM is 12 hours
    }
    
    const formattedTime = `${String(finalHour24).padStart(2, "0")}:${String(finalMinute).padStart(2, "0")}`
    onChange(formattedTime)
  }

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5) // 5-minute increments

  const [minHour24, minMinute] = minTime.split(":").map(Number)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formatTo12Hour(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex p-2">
          {/* Hours Column */}
          <div ref={hourRef} className="h-48 w-20 overflow-y-auto pr-2 border-r">
            {hours.map((h) => {
                let prospectiveHour24 = period === 'AM' ? (h === 12 ? 0 : h) : (h === 12 ? 12 : h + 12)
                const isDisabled = prospectiveHour24 < minHour24

              return (
                <Button
                  key={h}
                  variant={h === hour12 ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => handleTimeChange(h, null, null)}
                  disabled={isDisabled}
                  data-hour={h}
                >
                  {String(h).padStart(2, "0")}
                </Button>
              )
            })}
          </div>
          {/* Minutes Column */}
          <div ref={minuteRef} className="h-48 w-20 overflow-y-auto px-2 border-r">
            {minutes.map((m) => {
              const isDisabled = hour24 === minHour24 && m < minMinute
              return (
                <Button
                  key={m}
                  variant={m === minute ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => handleTimeChange(null, m, null)}
                  disabled={isDisabled}
                  data-minute={m}
                >
                  {String(m).padStart(2, "0")}
                </Button>
              )
            })}
          </div>
          {/* AM/PM Column */}
          <div className="h-48 w-20 overflow-y-auto pl-2 flex flex-col">
            <Button 
              variant={period === 'AM' ? 'default' : 'ghost'} 
              size='sm' 
              onClick={() => handleTimeChange(null, null, 'AM')}
              disabled={minHour24 >= 12}
            >
                AM
            </Button>
            <Button 
              variant={period === 'PM' ? 'default' : 'ghost'} 
              size='sm' 
              onClick={() => handleTimeChange(null, null, 'PM')}
            >
                PM
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}