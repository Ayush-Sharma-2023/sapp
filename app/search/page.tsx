/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"

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
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Resource 1",
      description: "Description for resource 1",
      status: "available",
    },
    {
      id: 2,
      title: "Resource 2",
      description: "Description for resource 2",
      status: "available",
    },
    {
      id: 3,
      title: "Resource 3",
      description: "Description for resource 3",
      status: "unavailable",
    },
  ])
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(false)

  const filteredResources = resources.filter(resource =>
    resource.status === "available" && (
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
  <>
    <Navbar />
  
    <div className="space-y-4">
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

      <div className="grid gap-4">
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
