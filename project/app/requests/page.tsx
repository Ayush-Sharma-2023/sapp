"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ResourceCard } from "@/components/resource-card"
import { MapView } from "@/components/map-view"
import { Resource } from "@/types"
import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"
import exp from "node:constants"

export function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<Resource[]>([])
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch resources from localStorage
    const storedResources = JSON.parse(localStorage.getItem("resources") || "[]")
    setResources(storedResources)
    setLoading(false)
  }, [])

  const handleRequest = (resourceId: string, quantity: number) => {
    setResources((prevResources) => {
      return prevResources.map((resource) => {
        if (resource.id === resourceId) {
          if (resource.quantity >= quantity) {
            // Subtract the requested quantity
            const updatedResource = {
              ...resource,
              quantity: resource.quantity - quantity,
            }

            // Update localStorage
            const updatedResources = prevResources.map((res) =>
              res.id === resourceId ? updatedResource : res
            )
            localStorage.setItem("resources", JSON.stringify(updatedResources))
            return updatedResource
          } else {
            alert(`Not enough resources available. Available: ${resource.quantity}`)
          }
        }
        return resource
      })
    })
  }

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xl"
        />
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <Map className="h-4 w-4" />
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {showMap && (
        <div className="mb-6">
          <MapView resources={filteredResources} />
        </div>
      )}

      <div className="grid gap-4">
        {loading ? (
          <p>Loading resources...</p>
        ) : filteredResources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          filteredResources.map((resource) => (
            <div key={resource.id} className="border p-4 rounded">
              <ResourceCard resource={resource} />
              <div className="mt-2">
                <Button
                  onClick={() => {
                    const requestedQuantity = parseInt(prompt("Enter quantity to request:") || "0", 10)
                    if (requestedQuantity > 0) {
                      handleRequest(resource.id, requestedQuantity)
                    } else {
                      alert("Invalid quantity entered.")
                    }
                  }}
                  className="mt-2"
                >
                  Request Resource
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ResourceSearch