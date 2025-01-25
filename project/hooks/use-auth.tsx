"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Replace Firebase with your custom authentication mechanism
// Mock user data
interface AuthContextType {
  user: { id: string; name: string } | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On app load, check for existing session (for example, using a token in localStorage or cookies)
    const savedUser = JSON.parse(localStorage.getItem("user") || "null")
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  // Handle sign-in using a custom API
  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Replace with your own API endpoint
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Sign-in failed")
      }

      const data = await response.json()
      // Save the user data in localStorage (or cookies, session)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      setLoading(true)

      // Optional: Call an API to invalidate the session or token
      await fetch("/api/sign-out", { method: "POST" })

      // Remove user from localStorage
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
