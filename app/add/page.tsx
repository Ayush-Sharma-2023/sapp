"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ChatbotBubble from "@/components/chatBubble";

export default function AddResourcePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // Debugging: Check Form Data
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const quantity = parseInt(formData.get("quantity") as string);

    console.log("Form Data", { title, description, category, quantity });

    if (!title || !description || !category || isNaN(quantity)) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const newResource = {
      id: Date.now().toString(), // Unique ID for resource
      title,
      description,
      category,
      quantity,
      location,
      createdAt: new Date(),
      status: "available",
    };

    try {
      const existingResources = JSON.parse(localStorage.getItem("resources") || "[]");
      console.log("Existing Resources before adding:", existingResources);

      existingResources.push(newResource);

      // Debugging: Ensure resource is being added to array
      console.log("Updated Resources:", existingResources);

      localStorage.setItem("resources", JSON.stringify(existingResources));

      toast({
        title: "Resource added successfully",
        description: "Your resource has been listed and is now available to the community.",
      });

      router.push("/search");
    } catch (error) {
      console.error("Error saving resource:", error);
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <label htmlFor="location">Location</label>
            <Input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading || !location}>
            {loading ? "Adding..." : "Add Resource"}
          </Button>
        </form>
      </CardContent>
      <ChatbotBubble />
    </Card>
  );
}
