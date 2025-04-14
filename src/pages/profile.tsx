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
  AlertCircle,
  Trash
} from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function ProfilePage() {
  const navigate = useNavigate()
  const { toast } = useToast()
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

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing is not yet implemented.",
      duration: 3000,
    })
  }

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`
    toast({
      title: "Calling",
      description: `Calling ${phone}...`,
      duration: 3000,
    })
  }

  const handleEditLocation = (locationName: string) => {
    toast({
      title: "Edit Location",
      description: `Editing ${locationName} is not yet implemented.`,
      duration: 3000,
    })
  }

  const handleDeleteLocation = (locationName: string) => {
    toast({
      title: "Delete Location",
      description: `${locationName} has been deleted.`,
      duration: 3000,
    })
  }

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
                  <button 
                    className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
                    onClick={handleEditProfile}
                  >
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
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => handleCallContact("+91 98765 12345")}
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Amit Patel</p>
                    <p className="text-gray-600">+91 98765 98765</p>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80"
                    onClick={() => handleCallContact("+91 98765 98765")}
                  >
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
                  <div className="flex items-center gap-2">
                    <button 
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleEditLocation("Home")}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteLocation("Home")}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-gray-600">Tech Park, Sector 144, Noida</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleEditLocation("Office")}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteLocation("Office")}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
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
                  <div className="flex items-center gap-2">
                    <button 
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleEditLocation("Max Super Speciality Hospital")}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteLocation("Max Super Speciality Hospital")}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Notifications</p>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Location Sharing</p>
                  <Switch 
                    checked={locationSharing} 
                    onCheckedChange={setLocationSharing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Emergency Alerts</p>
                  <Switch 
                    checked={emergencyAlerts} 
                    onCheckedChange={setEmergencyAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${activity.color}`}>
                      {React.createElement(activity.icon, { className: "h-5 w-5" })}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-gray-600 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  )
} 