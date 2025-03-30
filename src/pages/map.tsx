import React from 'react'
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function MapPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Safe Routes</h1>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-56px)] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Map will be implemented here</p>
      </div>
    </div>
  )
} 