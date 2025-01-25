"use client"

import { Resource } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Package } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription className="mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {resource.location.address}
              </span>
            </CardDescription>
          </div>
          <Badge variant={resource.status === 'available' ? 'default' : 'secondary'}>
            {resource.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            {resource.quantity} available
          </Badge>
          <span className="text-sm text-muted-foreground">
            Posted {formatDistanceToNow(resource.createdAt, { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Request Resource</Button>
      </CardFooter>
    </Card>
  )
}