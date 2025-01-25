"use client"
import { Navbar } from "@/components/Navbar"
import { useState } from "react"

// Resource interface
interface Resource {
  id: number
  title: string
  description: string
  category: string
  quantity: number
  location: { address: string; latitude: number; longitude: number }
  userId: string
  createdAt: Date
  status: string
}

export default function AddResourcePage() {
  const [loading, setLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([]) // Manage resources in state
  const [location, setLocation] = useState<{ address: string; latitude: number; longitude: number }>({
    address: "123 Community Center",
    latitude: 0,
    longitude: 0,
  })

  const user = { uid: "12345" } // Placeholder for user authentication

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !location) return

    setLoading(true)
    const formData = new FormData(e.currentTarget)

    const newResource: Resource = {
      id: resources.length + 1, // Generate a unique ID
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      quantity: parseInt(formData.get("quantity") as string),
      location,
      userId: user.uid,
      createdAt: new Date(),
      status: "available",
    }

    // Add the new resource to the state
    setResources((prev) => [...prev, newResource])

    alert("Resource added successfully!")
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold">Add New Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" required className="border p-2 rounded w-full" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" required className="border p-2 rounded w-full" />
            </div>

            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required className="border p-2 rounded w-full">
                <option value="">Select category</option>
                <option value="medical">Medical Supplies</option>
                <option value="food">Food & Water</option>
                <option value="hygiene">Hygiene Products</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" name="quantity" type="number" min="1" required className="border p-2 rounded w-full" />
            </div>

            <div className="space-y-2">
              <label>Location</label>
              <div className="h-40 bg-gray-200 flex items-center justify-center rounded">
                <p>{location.address}</p>
              </div>
            </div>

            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              {loading ? "Adding..." : "Add Resource"}
            </button>
          </form>
        </div>

        {/* Display the list of resources */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold">Available Resources</h3>
          {resources.length === 0 ? (
            <p>No resources added yet.</p>
          ) : (
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li key={resource.id} className="border p-4 rounded">
                  <h4 className="text-lg font-bold">{resource.title}</h4>
                  <p>{resource.description}</p>
                  <p>
                    Category: <strong>{resource.category}</strong>
                  </p>
                  <p>
                    Quantity: <strong>{resource.quantity}</strong>
                  </p>
                  <p>
                    Location: <strong>{resource.location.address}</strong>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded ${
                        resource.status === "available" ? "bg-green-200" : "bg-gray-200"
                      }`}
                    >
                      {resource.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
