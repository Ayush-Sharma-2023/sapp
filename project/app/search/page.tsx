"use client"
import { useState } from "react";
import { ResourceSearch } from "@/components/resource-search";
import { ResourceFilters } from "@/components/resource-filters";

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <ResourceFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="md:col-span-3">
        <ResourceSearch selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
