import React from 'react'
import { Home, Map, Bell, User, BookOpen } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Map", href: "/map", icon: Map },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
      <div className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3",
                isActive ? "text-primary" : "text-gray-500"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 