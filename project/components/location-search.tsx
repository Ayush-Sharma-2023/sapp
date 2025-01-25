"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface LocationSearchProps {
  onSelect: (location: { address: string; latitude: number; longitude: number }) => void
}

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const [loading, setLoading] = useState(false)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof google === "undefined" || !inputRef.current) return

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" }
    })

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace()
      
      if (place?.geometry?.location) {
        onSelect({
          address: place.formatted_address || "",
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        })
      }
    })
  }, [onSelect])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Enter address..."
        className="pr-10"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  )
}