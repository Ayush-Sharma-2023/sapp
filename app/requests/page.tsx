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
    <div className="border rounded p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{resource.title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">📍 {resource.location.address}</span>
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            resource.status === "available" ? "bg-green-200" : "bg-gray-200"
          }`}
        >
          {resource.status}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">{resource.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="px-2 py-1 border rounded text-sm">📦 {resource.quantity} available</span>
          <span className="text-sm text-gray-500">Posted {resource.createdAt.toDateString()}</span>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Request Resource</button>
      </div>
    </div>
  )
}

export default function Page() {
  const sampleResource: Resource = {
    title: "Water Bottles",
    description: "A batch of clean water bottles for emergency use.",
    location: { address: "123 Community Center, Cityville" },
    status: "available",
    quantity: 50,
    createdAt: new Date(),
  }

  return (
    <div className="p-8">
      <ResourceCard resource={sampleResource} />
    </div>
  )
}
