"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart, Home, PlusCircle, Search } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const pathname = usePathname()
  const { user, signIn, signOut } = useAuth()
  
  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/"
    },
    {
      href: "/search",
      label: "Find Resources",
      icon: Search,
      active: pathname === "/search"
    },
    {
      href: "/add",
      label: "Add Resource",
      icon: PlusCircle,
      active: pathname === "/add"
    },
    {
      href: "/requests",
      label: "Requests",
      icon: Heart,
      active: pathname === "/requests"
    }
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="font-bold text-2xl mr-8">
          CommunityConnect
        </Link>
        <div className="flex items-center space-x-4 flex-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              asChild
            >
              <Link href={route.href} className="flex items-center gap-2">
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button
            variant="default"
            onClick={user ? signOut : signIn}
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
    </nav>
  )
}