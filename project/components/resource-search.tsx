"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ResourceCard } from "@/components/resource-card"
import { MapView } from "@/components/map-view"
import { Resource } from "@/types"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"

export function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<Resource[]>([])
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, "resources"),
      where("status", "==", "available"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resources = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[]

      setResources(resources)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

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
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </div>
    </div>
  )
}