"use client"
import { Navbar } from "@/components/Navbar"

import { useState } from "react"

export default function AddResourcePage() {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<{ address: string; latitude: number; longitude: number } | null>(null)
  const user = { uid: "12345" } // Placeholder for user authentication

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !location) return

    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      // Simulate adding a resource
      console.log("Resource added:", {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        quantity: parseInt(formData.get("quantity") as string),
        location,
        userId: user.uid,
        createdAt: new Date(),
        status: "available"
      })

      alert("Resource added successfully")
    } catch (error) {
      alert("Failed to add resource. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="border p-4 rounded">
        <p>Please sign in to add resources.</p>
      </div>
    )
  }

  return (
    <>
    <Navbar />
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
            <p>Location Placeholder</p>
          </div>
        </div>

        <button type="submit" disabled={loading || !location} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </form>
    </div>
    </>
  )
}
