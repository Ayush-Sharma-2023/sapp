"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
      icon: () => <span className="h-4 w-4 bg-gray-400 inline-block rounded-full" /> // Placeholder icon
    },
    {
      href: "/search",
      label: "Find Resources",
      active: pathname === "/search",
      icon: () => <span className="h-4 w-4 bg-gray-400 inline-block rounded-full" /> // Placeholder icon
    },
    {
      href: "/add",
      label: "Add Resource",
      active: pathname === "/add",
      icon: () => <span className="h-4 w-4 bg-gray-400 inline-block rounded-full" /> // Placeholder icon
    },
    {
      href: "/requests",
      label: "Requests",
      active: pathname === "/requests",
      icon: () => <span className="h-4 w-4 bg-gray-400 inline-block rounded-full" /> // Placeholder icon
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
            <button
              key={route.href}
              className={`btn ${
                route.active ? "btn-default" : "btn-ghost"
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
          {/* Replace ModeToggle with a placeholder */}
          <button className="btn btn-default" onClick={() => alert("Mode toggle not implemented")}>
            Toggle Theme
          </button>
          <button
            className="btn btn-default"
            onClick={user ? signOut : signIn}
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
    </nav>
  )
}
