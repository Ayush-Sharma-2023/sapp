"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, Users, HeartHandshake, MapPin } from "lucide-react";
import Link from "next/link";
import NewsList from "@/components/NewsList";  // Import NewsList component
import ChatbotBubble from "@/components/chatBubble";

export default function Home() {
  const features = [
    {
      icon: Package2,
      title: "Resource Listings",
      description: "List and discover essential resources in your community",
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find resources near you with integrated mapping",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Connect with neighbors to share and request resources",
    },
    {
      icon: HeartHandshake,
      title: "Help Others",
      description: "Volunteer and respond to community requests",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Community Resource Management</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connecting communities with essential resources during emergencies. Share, find, and request resources in your local area.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/search">Find Resources</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/add">Share Resources</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="h-10 w-10 text-primary mb-2" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
      
      {/* Add Chatbot Section */}

      <ChatbotBubble />
\

      {/* Add News Section */}
      <section className="py-12">
        <NewsList />
      </section>
    </div>
  );
}
