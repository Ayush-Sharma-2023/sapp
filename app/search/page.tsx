"use client"

import { useState } from "react"

interface Resource {
  id: number
  title: string
  description: string
  location: { address: string }
  status: string
  quantity: number
  createdAt: Date
}

export default function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      title: "Resource 1",
      description: "Description for resource 1",
      location: { address: "Location 1" },
      status: "available",
      quantity: 5,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Resource 2",
      description: "Description for resource 2",
      location: { address: "Location 2" },
      status: "unavailable",
      quantity: 3,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Resource 3",
      description: "Description for resource 3",
      location: { address: "Location 3" },
      status: "available",
      quantity: 8,
      createdAt: new Date(),
    },
  ])

  const filteredResources = resources.filter(
    (resource) =>
      resource.status === "available" &&
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg border rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="grid gap-6">
        {filteredResources.length === 0 ? (
          <p className="text-gray-500">No resources found.</p>
        ) : (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{resource.title}</h3>
          <p className="text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">📍 {resource.location.address}</span>
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
            resource.status === "available" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {resource.status}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700 leading-relaxed">{resource.description}</p>
        <div className="mt-4 flex items-center gap-6">
          <span className="px-3 py-1 border rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            📦 {resource.quantity} available
          </span>
          <span className="text-sm text-gray-500">
            Posted {resource.createdAt.toDateString()}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 focus:ring focus:ring-blue-300">
          Request Resource
        </button>
      </div>
    </div>
  )
}
