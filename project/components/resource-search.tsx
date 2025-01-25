"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ResourceCard } from "@/components/resource-card";
import { MapView } from "@/components/map-view";
import { Resource } from "@/types";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

export function ResourceSearch({ selectedCategory }) {
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
    // Fetch initial resources from localStorage
    fetchResources();
    setLoading(false);

    // Listen for localStorage changes from other components
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "resources") {
        fetchResources();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesQuery =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;

    return matchesQuery && matchesCategory;
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
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </div>
    </div>
  );
}
