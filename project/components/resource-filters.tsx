"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Package2, Pill, Coffee, ShieldPlus, Shirt } from "lucide-react";

const categories = [
  { id: "all", label: "All Categories", icon: Package2 },
  { id: "medical", label: "Medical Supplies", icon: Pill },
  { id: "food", label: "Food & Water", icon: Coffee },
  { id: "hygiene", label: "Hygiene Products", icon: ShieldPlus },
  { id: "clothing", label: "Clothing", icon: Shirt },
];

export function ResourceFilters({ selectedCategory, setSelectedCategory }) {
  // State to track the slider value
  const [distance, setDistance] = useState(1); // Default is 1 km

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              defaultValue={[1]} // Default value is 1 km
              min={1} // Minimum value
              max={50} // Maximum value
              step={1} // Step value
              className="w-full"
              onValueChange={(value) => setDistance(value[0])} // Update the distance state
            />
            <div className="text-sm text-muted-foreground">
              Within {distance} {distance === 1 ? "km" : "kms"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
