"use client"

import { useEffect, useRef } from "react"
import { Resource } from "@/types"

interface MapViewProps {
  resources: Resource[]
  onMarkerClick?: (resource: Resource) => void
}

export function MapView({ resources, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || typeof google === "undefined") return

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    })

    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          mapInstanceRef.current?.setCenter(userLocation)
        },
        () => {
          console.log("Error getting user location")
        }
      )
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    // Add new markers
    resources.forEach(resource => {
      const marker = new google.maps.Marker({
        position: {
          lat: resource.location.latitude,
          lng: resource.location.longitude
        },
        map: mapInstanceRef.current,
        title: resource.title
      })

      if (onMarkerClick) {
        marker.addListener("click", () => onMarkerClick(resource))
      }

      markersRef.current.push(marker)
    })
  }, [resources, onMarkerClick])

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />
}