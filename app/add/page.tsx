"use client"

import { Navbar } from "@/components/Navbar"
import { useState } from "react"

// Resource interface
interface Resource {
  id: string
  title: string
  description: string
  location: { address: string }
  status: string
  quantity: number
  createdAt: Date
}

const placeholderResources: Resource[] = [
  {
    id: "1",
    title: "Sample Resource 1",
    description: "Description for Sample Resource 1",
    location: { address: "123 Placeholder St" },
    status: "available",
    quantity: 10,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Sample Resource 2",
    description: "Description for Sample Resource 2",
    location: { address: "456 Example Ave" },
    status: "unavailable",
    quantity: 0,
    createdAt: new Date(),
  },
]

export function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<Resource[]>(placeholderResources)
  const [showMap, setShowMap] = useState(false)

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddResource = (newResource: Resource) => {
    setResources((prev) => [...prev, newResource])
  }

  return (
    <>
      <Navbar />
      <div className="space-y-4 bg-gray-950 min-h-screen p-6 text-gray-200">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded w-full max-w-xl bg-gray-800 text-gray-200 focus:ring focus:ring-gray-700"
          />
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 border rounded flex items-center gap-2 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring focus:ring-gray-500"
          >
            <span>🗺️</span>
            {showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>

        {showMap && (
          <div className="mb-6">
            <div className="h-64 bg-gray-800 flex items-center justify-center text-gray-300 border border-gray-700 rounded">
              <p>Map Placeholder</p>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {filteredResources.length === 0 ? (
            <p className="text-gray-300">No resources found.</p>
          ) : (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-gray-900 text-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">📍 {resource.location.address}</span>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                      resource.status === "available" ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    {resource.status}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-300 leading-relaxed">{resource.description}</p>
                  <div className="mt-4 flex items-center gap-6">
                    <span className="px-3 py-1 border rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                      📦 {resource.quantity} available
                    </span>
                    <span className="text-sm text-gray-400">
                      Posted {resource.createdAt.toDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-gray-700 text-white px-6 py-2 rounded-lg w-full hover:bg-gray-600 focus:ring focus:ring-gray-500">
                    Request Resource
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ResourceSearch
