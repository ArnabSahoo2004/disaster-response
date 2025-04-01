import React, { useState } from 'react'
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Shield,
  Bell,
  Settings,
  Clock,
  Heart,
  LogOut,
  Edit,
  ChevronRight,
  MapPinned,
  History,
  AlertCircle
} from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export function ProfilePage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [locationSharing, setLocationSharing] = useState(true)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true)

  const recentActivity = [
    {
      type: "alert",
      title: "Verified Water Supply Update",
      time: "2 hours ago",
      icon: AlertCircle,
      color: "text-blue-600 bg-blue-100"
    },
    {
      type: "location",
      title: "Added Safe Location: Home",
      time: "1 day ago",
      icon: MapPinned,
      color: "text-green-600 bg-green-100"
    },
    {
      type: "emergency",
      title: "Updated Emergency Contact",
      time: "3 days ago",
      icon: Shield,
      color: "text-red-600 bg-red-100"
    }
  ]

  const savedLocations = [
    {
      name: "Home",
      address: "B-12, Sector 62, Noida, Uttar Pradesh - 201301",
      type: "Primary"
    },
    {
      name: "Office",
      address: "Tech Park, Sector 144, Noida",
      type: "Secondary"
    },
    {
      name: "Max Super Speciality Hospital",
      address: "Sector 19, Noida",
      type: "Emergency"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
            <button className="text-red-600 hover:text-red-700 flex items-center">
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatars/rajesh.jpg" alt="Rajesh Kumar" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">Rajesh Kumar</h1>
                    <Badge variant="outline" className="bg-blue-50">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      B-12, Sector 62, Noida, Uttar Pradesh - 201301
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      +91 98765 43210
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      rajesh.kumar@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Priya Sharma (Wife)</p>
                    <p className="text-gray-600">+91 98765 12345</p>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Amit Patel</p>
                    <p className="text-gray-600">+91 98765 98765</p>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Locations */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Locations</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="text-gray-600">B-12, Sector 62, Noida</p>
                    </div>
                  </div>
                  <Badge>Primary</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-gray-600">Tech Park, Sector 144, Noida</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Max Super Speciality Hospital</p>
                      <p className="text-gray-600">Sector 19, Noida</p>
                    </div>
                  </div>
                  <Badge variant="outline">Emergency</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Settings & Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Emergency Alerts</p>
                      <p className="text-gray-600">Receive alerts for nearby emergencies</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location Sharing</p>
                      <p className="text-gray-600">Share location with emergency contacts</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 