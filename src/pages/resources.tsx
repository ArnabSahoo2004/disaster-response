import React from 'react'
import { 
  Phone, 
  Globe, 
  MapPin, 
  Users2, 
  HeartPulse,
  ShieldAlert,
  PlusCircle,
  Search,
  Filter,
  Droplets,
  Utensils,
  Home,
  Stethoscope,
  MessageCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmergencySOS } from "@/components/emergency-sos"

const resourceTypes = [
  { name: "Water", icon: Droplets, color: "bg-blue-100 text-blue-600" },
  { name: "Food", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { name: "Shelter", icon: Home, color: "bg-green-100 text-green-600" },
  { name: "Medical", icon: Stethoscope, color: "bg-red-100 text-red-600" },
  { name: "Other", icon: MessageCircle, color: "bg-purple-100 text-purple-600" },
]

const availableResources = [
  {
    type: "Water",
    title: "Clean Water Available",
    description: "Bottled water and water purification tablets available",
    location: "Community Center, Downtown",
    distance: "0.5 miles",
    reportedBy: "John Doe",
    timeAgo: "2 hours ago",
    verifiedCount: 12,
    icon: Droplets,
    color: "bg-blue-100 text-blue-600"
  },
  {
    type: "Food",
    title: "Emergency Food Supplies",
    description: "Non-perishable food items and MREs available",
    location: "Red Cross Shelter, West Side",
    distance: "1.2 miles",
    reportedBy: "Sarah Smith",
    timeAgo: "4 hours ago",
    verifiedCount: 8,
    icon: Utensils,
    color: "bg-orange-100 text-orange-600"
  },
  {
    type: "Shelter",
    title: "Emergency Shelter",
    description: "Temporary shelter with basic amenities",
    location: "High School Gymnasium",
    distance: "0.8 miles",
    reportedBy: "Mike Johnson",
    timeAgo: "1 hour ago",
    verifiedCount: 15,
    icon: Home,
    color: "bg-green-100 text-green-600"
  },
  {
    type: "Medical",
    title: "First Aid Supplies",
    description: "Basic medical supplies and first aid kits",
    location: "Local Clinic, North Area",
    distance: "1.5 miles",
    reportedBy: "Dr. Emily Brown",
    timeAgo: "3 hours ago",
    verifiedCount: 6,
    icon: Stethoscope,
    color: "bg-red-100 text-red-600"
  }
]

export function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <EmergencySOS />
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Emergency? Call 911 Immediately</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => window.location.href = 'tel:911'}
          >
            Call Now
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-blue-600" />
            Available Resources
          </h1>
          <p className="text-gray-600">Find or report available resources in your area</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input 
              placeholder="Search resources..." 
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <PlusCircle className="h-4 w-4" />
            Report Resource
          </Button>
        </div>

        {/* Resource Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Resource Types</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {resourceTypes.map((type) => (
              <Button
                key={type.name}
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <div className={`p-2 rounded-lg ${type.color}`}>
                  {React.createElement(type.icon, { className: "h-6 w-6" })}
                </div>
                <span>{type.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Available Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Resources</h2>
          <div className="grid gap-4">
            {availableResources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${resource.color}`}>
                      {React.createElement(resource.icon, { className: "h-6 w-6" })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {resource.timeAgo}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {resource.location}
                        </span>
                        <span className="text-gray-600">{resource.distance}</span>
                        <span className="text-green-600 font-medium">
                          ✅ Verified by {resource.verifiedCount} people
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Provider
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 