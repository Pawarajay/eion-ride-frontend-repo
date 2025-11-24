"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: "customer" | "driver" | "admin"
  isVerified: boolean
  twoFactorEnabled: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: any) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  verifyOTP: (otp: string) => Promise<boolean>
  sendOTP: (phone: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Validate token and get user data
          // This would be an API call in a real app
          const userData = JSON.parse(localStorage.getItem("user_data") || "null")
          setUser(userData)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockUser: User = {
        id: "1",
        name: credentials.email || credentials.username || credentials.phone,
        email: credentials.email || "user@example.com",
        phone: credentials.phone,
        role: "customer",
        isVerified: true,
        twoFactorEnabled: false,
      }

      setUser(mockUser)
      localStorage.setItem("auth_token", "mock_token")
      localStorage.setItem("user_data", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newUser: User = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        role: "customer",
        isVerified: false,
        twoFactorEnabled: false,
      }

      setUser(newUser)
      localStorage.setItem("auth_token", "mock_token")
      localStorage.setItem("user_data", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return otp === "123456" // Mock verification
  }

  const sendOTP = async (phone: string) => {
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const resetPassword = async (email: string) => {
    // Simulate password reset
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    verifyOTP,
    sendOTP,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
