import React from 'react'
import { HomeIcon, MapIcon, BookOpenIcon, UserCircleIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    icon: HomeIcon,
    activeColor: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  { 
    name: "Map", 
    href: "/map", 
    icon: MapIcon,
    activeColor: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  { 
    name: "Resources", 
    href: "/resources", 
    icon: BookOpenIcon,
    activeColor: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  { 
    name: "Profile", 
    href: "/profile", 
    icon: UserCircleIcon,
    activeColor: "text-rose-500",
    bgColor: "bg-rose-50"
  },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 border-t shadow-lg backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ease-spring",
                  isActive 
                    ? cn("scale-110", item.activeColor) 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {isActive && (
                  <span className={cn(
                    "absolute inset-0 rounded-xl -z-10 transition-all duration-300",
                    item.bgColor,
                    "animate-in fade-in zoom-in"
                  )} />
                )}
                <item.icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive && "animate-bounce-subtle"
                  )} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={cn(
                  "text-xs font-medium mt-1 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-70"
                )}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 