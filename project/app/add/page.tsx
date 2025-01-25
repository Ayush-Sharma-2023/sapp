"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "@/hooks/use-auth"
import { LocationSearch } from "@/components/location-search"

export default function AddResourcePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<{ address: string; latitude: number; longitude: number } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !location) return

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await addDoc(collection(db, "resources"), {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        quantity: parseInt(formData.get("quantity") as string),
        location,
        userId: user.uid,
        createdAt: new Date(),
        status: "available"
      })

      toast({
        title: "Resource added successfully",
        description: "Your resource has been listed and is now available to the community."
      })

      router.push("/search")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please sign in to add resources.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea id="description" name="description" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical Supplies</SelectItem>
                <SelectItem value="food">Food & Water</SelectItem>
                <SelectItem value="hygiene">Hygiene Products</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity">Quantity</label>
            <Input id="quantity" name="quantity" type="number" min="1" required />
          </div>

          <div className="space-y-2">
            <label>Location</label>
            <LocationSearch onSelect={setLocation} />
          </div>

          <Button type="submit" disabled={loading || !location}>
            {loading ? "Adding..." : "Add Resource"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}