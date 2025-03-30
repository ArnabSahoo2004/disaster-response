import React from 'react'
import { AlertOctagon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmergencySOS() {
  return (
    <div className="fixed bottom-20 w-full z-[9999]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center relative group p-0"
            onClick={() => window.location.href = 'tel:911'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <span className="font-bold text-2xl tracking-wider relative animate-pulse">SOS</span>
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-white rounded-full animate-ping" />
          </Button>
        </div>
      </div>
    </div>
  )
} 