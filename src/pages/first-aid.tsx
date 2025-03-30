import React from 'react'
import { 
  HeartPulse, 
  Phone, 
  Search,
  AlertCircle,
  Thermometer,
  Pill,
  Heart,
  Bone,
  Flame,
  Droplets,
  Bug
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmergencySOS } from "@/components/emergency-sos"

const emergencyContacts = [
  { name: "Emergency Services", number: "911", color: "bg-red-100 text-red-600" },
  { name: "Poison Control", number: "1-800-222-1222", color: "bg-purple-100 text-purple-600" },
  { name: "Medical Helpline", number: "1-800-MEDICAL", color: "bg-blue-100 text-blue-600" },
]

const firstAidGuides = [
  {
    title: "CPR & Choking",
    description: "Learn basic life support procedures",
    icon: HeartPulse,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    href: "/first-aid/cpr"
  },
  {
    title: "Bleeding & Wounds",
    description: "Wound care and bleeding control",
    icon: Droplets,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    href: "/first-aid/wounds"
  },
  {
    title: "Burns & Scalds",
    description: "Treatment for different burn types",
    icon: Flame,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    href: "/first-aid/burns"
  },
  {
    title: "Fractures & Sprains",
    description: "Bone and joint injury care",
    icon: Bone,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    href: "/first-aid/fractures"
  },
  {
    title: "Allergic Reactions",
    description: "Managing severe allergies",
    icon: Bug,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    href: "/first-aid/allergies"
  },
  {
    title: "Heat & Cold",
    description: "Temperature-related emergencies",
    icon: Thermometer,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    href: "/first-aid/temperature"
  },
]

export function FirstAidPage() {
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <HeartPulse className="h-8 w-8 text-red-600" />
              First Aid Guidelines
            </h1>
            <p className="text-gray-600">Quick access to emergency medical procedures and guidelines</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Search procedures..." 
                className="pl-9 w-[250px]"
              />
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts
            </Button>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {emergencyContacts.map((contact) => (
            <Card 
              key={contact.name} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = `tel:${contact.number.replace(/\D/g, '')}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${contact.color}`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-lg font-bold">{contact.number}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* First Aid Guides Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">First Aid Procedures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstAidGuides.map((guide) => (
              <Link 
                key={guide.title} 
                to={guide.href}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`${guide.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(guide.icon, { className: "h-6 w-6" })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
                        <p className="text-gray-600 text-sm">{guide.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-yellow-800">Important Notice</h3>
                <p className="text-yellow-800">
                  This guide is not a substitute for professional medical care. In case of serious injury or medical emergency, 
                  always call emergency services immediately. These guidelines are for basic first aid only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 