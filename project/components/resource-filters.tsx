"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Package2, Pill, Coffee, ShieldPlus, Shirt } from "lucide-react"

const categories = [
  { id: "all", label: "All Categories", icon: Package2 },
  { id: "medical", label: "Medical Supplies", icon: Pill },
  { id: "food", label: "Food & Water", icon: Coffee },
  { id: "hygiene", label: "Hygiene Products", icon: ShieldPlus },
  { id: "clothing", label: "Clothing", icon: Shirt },
]

export function ResourceFilters() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all">
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
              defaultValue={[5]}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              Within 5 miles
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-status" />
              <Label htmlFor="all-status">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="available" id="available" />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reserved" id="reserved" />
              <Label htmlFor="reserved">Reserved</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}