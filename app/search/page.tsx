/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Navbar } from "@/components/Navbar"
import { useState, useEffect } from "react"

export function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<any[]>([])
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    status: "available",
  })

  // Fetch resources from the API
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/resources")
        const data = await res.json()
        setResources(data)
      } catch (error) {
        console.error("Failed to fetch resources:", error)
      }
      setLoading(false)
    }

    fetchResources()
  }, [])

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newResource, id: Date.now() }),
      })
      const data = await res.json()
      setResources((prev) => [...prev, data.data])
      setNewResource({ title: "", description: "", status: "available" })
    } catch (error) {
      console.error("Failed to add resource:", error)
    }
  }

  const filteredResources = resources.filter(
    (resource) =>
      resource.status === "available" &&
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <>
      <Navbar />
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xl border p-2 rounded"
          />
          <button
            onClick={() => setShowMap(!showMap)}
            className="border px-4 py-2 rounded flex items-center gap-2"
          >
            <span className="material-icons">map</span>
            {showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>

        {showMap && (
          <div className="mb-6">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <p>Map Placeholder</p>
            </div>
          </div>
        )}

        <form onSubmit={handleAddResource} className="flex gap-4">
          <input
            type="text"
            placeholder="Resource title"
            value={newResource.title}
            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Resource description"
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={newResource.status}
            onChange={(e) => setNewResource({ ...newResource, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Resource
          </button>
        </form>

        <div className="grid gap-4 mt-4">
          {loading ? (
            <p>Loading resources...</p>
          ) : filteredResources.length === 0 ? (
            <p>No resources found.</p>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="border p-4 rounded">
                <h3 className="text-lg font-bold">{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ResourceSearch
