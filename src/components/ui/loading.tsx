import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  className?: string
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn(
      "fixed inset-0 bg-white/90 backdrop-blur-sm z-50",
      "flex items-center justify-center",
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping" />
          <div className="relative bg-blue-600 text-white p-4 rounded-full animate-pulse">
            <AlertCircle className="h-8 w-8" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-900 animate-pulse">
            Loading...
          </h3>
          <p className="text-gray-600 text-sm">
            Please wait while we prepare your content
          </p>
        </div>
      </div>
    </div>
  )
} 