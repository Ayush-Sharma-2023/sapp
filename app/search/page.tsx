"use client"

interface Resource {
  title: string
  description: string
  location: { address: string }
  status: string
  quantity: number
  createdAt: Date
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-gray-900 text-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
          <p className="text-sm text-gray-400 mt-2">
            <span className="flex items-center gap-1">
              📍 {resource.location.address}
            </span>
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
  )
}
