"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, List } from "lucide-react";

export function Navbar() {
  const pathname = usePathname()
  const user = false // Replace with actual user authentication logic
  const signIn = () => alert("Sign In function not implemented") // Placeholder
  const signOut = () => alert("Sign Out function not implemented") // Placeholder

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: Home, // Placeholder icon
    },
    {
      href: "/search",
      label: "Find Resources",
      active: pathname === "/search",
      icon: Search, // Placeholder icon
    },
    {
      href: "/add",
      label: "Add Resource",
      active: pathname === "/add",
      icon: PlusCircle// Placeholder icon
    },
    {
      href: "/requests",
      label: "Requests",
      active: pathname === "/requests",
      icon: List // Placeholder icon
    }
  ]

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="font-bold text-2xl text-white mr-8">
          CommunityConnect
        </Link>
        <div className="flex items-center space-x-4 flex-1">
          {routes.map((route) => (
            <button
              key={route.href}
              className={`px-4 py-2 rounded-lg transition ${
                route.active
                  ? "bg-teal-500 text-black"
                  : "bg-transparent text-white hover:bg-teal-500 hover:text-black"
              }`}
            >
              <Link href={route.href} className="flex items-center gap-2">
                <route.icon />
                {route.label}
              </Link>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-teal-500 hover:text-black transition"
            onClick={() => alert("Mode toggle not implemented")}
          >
            Toggle Theme
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-teal-500 text-black hover:bg-gray-700 hover:text-white transition"
            onClick={user ? signOut : signIn}
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  )
}
