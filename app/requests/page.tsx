"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ResourceCard } from "@/components/resource-card";
import { MapView } from "@/components/map-view";
import { Resource } from "@/types";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import ChatbotBubble from "@/components/chatBubble";

export function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchResources = () => {
    const storedResources = JSON.parse(localStorage.getItem("resources") || "[]");

    // Deduplicate resources by `id`
    const uniqueResources = storedResources.reduce((acc: Resource[], resource: Resource) => {
      if (!acc.find((r) => r.id === resource.id)) {
        acc.push(resource);
      }
      return acc;
    }, []);

    setResources(uniqueResources);
  };

  useEffect(() => {
    // Fetch resources from localStorage on component mount
    fetchResources();
    setLoading(false);
  }, []);

  const handleRequest = (resourceId: string, quantity: number) => {
    const updatedResources = resources.map((resource) => {
      if (resource.id === resourceId) {
        if (resource.quantity >= quantity) {
          // Subtract the requested quantity
          return {
            ...resource,
            quantity: resource.quantity - quantity,
          };
        } else {
          alert(`Not enough resources available. Available: ${resource.quantity}`);
          return resource;
        }
      }
      return resource;
    });

    // Update localStorage and refresh the state
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    fetchResources(); // Refresh state after updating localStorage
  };

  const filteredResources = resources.filter((resource) => {
    const matchesQuery =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
  
    const hasQuantity = resource.quantity > 0; // Ensure the quantity is greater than 0
  
    return matchesQuery && hasQuantity;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xl"
        />
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <Map className="h-4 w-4" />
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {showMap && (
        <div className="mb-6">
          <MapView resources={filteredResources} />
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
              <ResourceCard resource={resource} />
              <div className="mt-2">
                <Button
                  onClick={() => {
                    const requestedQuantity = parseInt(prompt("Enter quantity to request:") || "0", 10);
                    if (requestedQuantity > 0) {
                      handleRequest(resource.id, requestedQuantity);
                    } else {
                      alert("Invalid quantity entered.");
                    }
                  }}
                  className="mt-2"
                >
                  Request Resource
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <ChatbotBubble />
    </div>
  );
}

export default ResourceSearch;
