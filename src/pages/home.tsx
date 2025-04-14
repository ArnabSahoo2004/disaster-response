import React, { useState } from 'react'
import { 
  Bell, 
  AlertCircle, 
  AlertTriangle,
  Navigation, 
  HeartPulse,
  ShieldAlert,
  Users2,
  MapPin,
  PlusCircle,
  MessageCircle,
  Check,
  X,
  Phone,
  Siren,
  Ambulance,
  Building2,
  HeartPulse as Heart,
  Share2,
  ThumbsUp,
  AlertOctagon,
  ExternalLink,
  Flag,
  PackageOpen,
  ListPlus,
  CloudRain,
  Sun,
  Wind,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmergencySOS } from "@/components/emergency-sos"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Footer } from "@/components/footer"
import { ThemeSwitcher, type WeatherScenario } from '@/components/theme-switcher'
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast"

const navigationItems = [
  { name: "Features", href: "/features" },
  { name: "Use cases", href: "/use-cases" },
  { name: "Academy", href: "/academy" },
  { name: "Pricing", href: "/pricing" },
]

const quickAccessItems = [
  {
    name: "Safe Routes",
    description: "Find evacuation routes and safe paths",
    icon: Navigation,
    href: "/safe-routes",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "First Aid",
    description: "Emergency medical guidelines",
    icon: HeartPulse,
    href: "/first-aid",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Resources",
    description: "Emergency supplies and locations",
    icon: ShieldAlert,
    href: "/resources",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Community",
    description: "Connect with local response teams",
    icon: Users2,
    href: "/community",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    bgColor: "bg-purple-50",
  },
]

// Add notifications data
const notifications = [
  {
    id: 1,
    title: "New Emergency Alert",
    message: "Flash flood warning issued for your area",
    time: "2 mins ago",
    type: "alert",
    unread: true,
  },
  {
    id: 2,
    title: "Community Update",
    message: "New shelter opened at Community Center",
    time: "15 mins ago",
    type: "info",
    unread: true,
  },
  {
    id: 3,
    title: "Resource Update",
    message: "Water supply restored in Downtown area",
    time: "1 hour ago",
    type: "success",
    unread: false,
  }
]

// Define scenarios for theme notifications
const scenarios = {
  default: {
    label: 'Normal',
    description: 'Standard monitoring mode activated',
    icon: Sun,
    color: 'bg-background',
    textColor: 'text-foreground',
    borderColor: 'border-border'
  },
  flood: {
    label: 'Flood Alert',
    description: 'Heavy rainfall and flooding conditions detected',
    icon: CloudRain,
    color: 'bg-blue-100',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-500'
  },
  heatwave: {
    label: 'Heatwave Warning',
    description: 'Extreme temperature conditions detected',
    icon: Sun,
    color: 'bg-orange-100',
    textColor: 'text-orange-900',
    borderColor: 'border-orange-500'
  },
  cyclone: {
    label: 'Cyclone Warning',
    description: 'Severe cyclonic conditions approaching',
    icon: Wind,
    color: 'bg-red-100',
    textColor: 'text-red-900',
    borderColor: 'border-red-500'
  }
}

const scenarioStyles = {
  default: {
    background: 'bg-background',
    pattern: '',
    headerBg: 'bg-white',
    cardBg: 'bg-white',
  },
  flood: {
    background: 'bg-blue-50',
    pattern: 'bg-[url("/patterns/flood.svg")] bg-repeat opacity-10',
    headerBg: 'bg-blue-500/10 backdrop-blur-sm',
    cardBg: 'bg-white/80 backdrop-blur-sm',
  },
  heatwave: {
    background: 'bg-orange-50',
    pattern: 'bg-[url("/patterns/heatwave.svg")] bg-repeat opacity-10',
    headerBg: 'bg-orange-500/10 backdrop-blur-sm',
    cardBg: 'bg-white/80 backdrop-blur-sm',
  },
  cyclone: {
    background: 'bg-purple-50',
    pattern: 'bg-[url("/patterns/cyclone.svg")] bg-repeat opacity-10',
    headerBg: 'bg-purple-500/10 backdrop-blur-sm',
    cardBg: 'bg-white/80 backdrop-blur-sm',
  },
}

export function HomePage() {
  const { toast } = useToast()
  const [unreadCount, setUnreadCount] = useState(2)
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [resourceType, setResourceType] = useState("medical")
  const [urgencyLevel, setUrgencyLevel] = useState("medium")
  const [currentScenario, setCurrentScenario] = useState<WeatherScenario>('default')
  const styles = scenarioStyles[currentScenario]
  const navigate = useNavigate()

  const markAsRead = (id: number) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    )
    setUnreadCount(0)
  }

  const clearNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(notification => notification.id !== id))
    const removedNotification = notificationsList.find(n => n.id === id)
    if (removedNotification?.unread) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  const emergencyServices = [
    {
      id: 1,
      name: "Police",
      number: "911",
      icon: ShieldAlert,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      name: "Fire",
      number: "911",
      icon: Siren,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: 3,
      name: "Ambulance",
      number: "911",
      icon: Ambulance,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      name: "Hospital",
      number: "415-555-0123",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: 5,
      name: "Crisis Hotline",
      number: "800-273-8255",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    }
  ]

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const handleShare = (message: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'DisasterResponse Update',
        text: message,
        url: window.location.href,
      })
    }
  }

  const handleVerify = (id: number) => {
    // Add verification logic here
    console.log('Verifying update:', id)
  }

  const handleReport = (id: number) => {
    // Add report logic here
    console.log('Reporting update:', id)
  }

  const handleThemeChange = (newScenario: WeatherScenario) => {
    setCurrentScenario(newScenario)
    
    // Show theme change notification
    toast({
      title: `${scenarios[newScenario].label} Mode Activated`,
      description: scenarios[newScenario].description,
      variant: newScenario === 'default' ? 'default' : 'destructive',
      className: `
        ${scenarios[newScenario].color} 
        ${scenarios[newScenario].textColor}
        border-2 ${scenarios[newScenario].borderColor}
      `,
    })
  }

  return (
    <div 
      className={`
        min-h-screen 
        ${styles.background} 
        transition-all duration-700 ease-in-out
      `}
    >
      {/* Background Pattern with enhanced transition */}
      <div 
        className={`
          fixed inset-0 pointer-events-none 
          ${styles.pattern} 
          transition-all duration-700 ease-in-out
          opacity-0 scale-95
          ${currentScenario !== 'default' ? 'opacity-100 scale-100' : ''}
        `} 
        aria-hidden="true"
      />

      <EmergencySOS />
      
      {/* Header with enhanced transition */}
      <header 
        className={`
          sticky top-0 z-50 
          ${styles.headerBg} 
          border-b 
          transition-all duration-500
          backdrop-blur-sm
        `}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex h-14 sm:h-16 lg:h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600 transition-all duration-200" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-200">DisasterResponse</span>
          </Link>

          {/* Emergency Menu */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 lg:gap-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-red-50 hover:bg-red-100 border-red-200 text-red-600 hover:text-red-700 font-bold gap-2 h-9 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-6"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  EMERGENCY
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {emergencyServices.map((service) => (
                  <DropdownMenuItem
                    key={service.id}
                    onClick={() => handleEmergencyCall(service.number)}
                    className="py-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={cn("p-1.5 rounded-lg", service.bgColor)}>
                        <service.icon className={cn("h-4 w-4", service.color)} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.number}</p>
                      </div>
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-6">
              {/* Theme Switcher */}
              <ThemeSwitcher
                currentScenario={currentScenario}
                onScenarioChange={handleThemeChange}
              />

              <div className="flex items-center gap-1.5 sm:gap-3">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 lg:h-11 lg:w-11 transition-all duration-200">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <h2 className="text-sm lg:text-base font-semibold leading-tight">John Doe</h2>
                  <p className="text-xs lg:text-sm text-gray-500 leading-tight">San Francisco, CA</p>
                </div>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 transition-all duration-200" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 h-8"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                  <div className="divide-y max-h-[400px] overflow-y-auto">
                    {notificationsList.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notificationsList.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn(
                            "p-4 hover:bg-gray-50 transition-colors relative group",
                            notification.unread && "bg-blue-50/50"
                          )}
                        >
                          <div className="flex items-start gap-3 pr-6">
                            <div className={cn(
                              "p-2 rounded-lg shrink-0",
                              notification.type === 'alert' && "bg-red-100",
                              notification.type === 'info' && "bg-blue-100",
                              notification.type === 'success' && "bg-green-100"
                            )}>
                              {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                              {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                              {notification.type === 'success' && <Check className="h-4 w-4 text-green-600" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {notification.unread && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-blue-600 hover:text-blue-700"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-gray-500"
                              onClick={() => clearNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-bold px-3 sm:px-4 lg:px-8 h-8 sm:h-10 lg:h-14 shadow-lg hover:scale-105 transition-all duration-200 items-center">
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-1.5 sm:mr-2" />
                <span className="hidden lg:inline">Report Incident</span>
                <span className="lg:hidden">Report</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-6 pb-16">
        {/* Weather Alert */}
        <div className="relative mb-8 group">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-red-500/30 rounded-xl blur-2xl animate-glow" />
          
          {/* Alert Card */}
          <Card className="relative border-[3px] animate-pulse-border bg-gradient-to-r from-yellow-50 via-red-50/50 to-red-100 overflow-hidden transform transition-transform hover:scale-[1.01] duration-300">            
            <CardHeader className="py-4">
              <CardTitle className="text-red-800 flex items-center gap-3 text-2xl">
                <div className="p-2.5 bg-red-100 rounded-lg animate-alert-bounce">
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                </div>
                <div className="flex items-center gap-3">
                  URGENT: Weather Alert
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-red-700">
                <p className="font-bold text-xl">Flash flood warning in your area</p>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-red-100 rounded-full text-sm font-bold animate-pulse-slow">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  Active Alert
                </div>
              </div>
              <p className="mt-3 text-red-600/90 text-lg">
                ⚠️ Please stay vigilant and avoid low-lying areas. Follow safety guidelines immediately.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessItems.map((item) => (
              <div key={item.name} className="relative group h-full">
                {/* Outer Glow Effect */}
                <div className={`
                  absolute -inset-1 
                  opacity-0 group-hover:opacity-70 
                  transition-all duration-300 
                  ${item.color} blur-xl
                  rounded-[20px]
                  group-hover:scale-105
                `} />
                
                <Link
                  to={item.href}
                  className={`
                    relative 
                    p-6 rounded-xl 
                    flex flex-col items-center text-center 
                    transition-all duration-300 
                    hover:shadow-xl 
                    hover:-translate-y-1 
                    ${item.bgColor}
                    z-10
                    h-full
                  `}
                >
                  {/* Content */}
                  <div className="flex flex-col items-center h-full">
                    {/* Icon Container */}
                    <div className={`
                      ${item.color} ${item.hoverColor} 
                      p-4 rounded-xl mb-4 
                      text-white 
                      shadow-md 
                      transition-all duration-300
                      group-hover:shadow-lg
                      group-hover:scale-110
                      group-hover:animate-icon-bounce
                      shrink-0
                    `}>
                      {React.createElement(item.icon, { className: "h-8 w-8" })}
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex flex-col flex-grow justify-between">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-900 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Request Button - Moved here */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Need Resources?</h2>
            <span className="text-gray-600">Quick request form for emergency supplies</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer border-blue-100 hover:border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-blue-100 rounded-xl group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                      <PackageOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">Request Emergency Resources</h3>
                      <p className="text-gray-600">Submit your request for supplies, shelter, or assistance</p>
                    </div>
                    <div className="shrink-0">
                      <div className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-all duration-300">
                        <PlusCircle className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request Emergency Resources</DialogTitle>
                <DialogDescription>
                  Submit your resource request. We'll connect you with available supplies and assistance.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Resource Type</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                  >
                    <option value="medical">Medical Supplies</option>
                    <option value="food">Food & Water</option>
                    <option value="shelter">Shelter</option>
                    <option value="clothing">Clothing</option>
                    <option value="transport">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Urgency Level</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                  >
                    <option value="high">High - Immediate Need</option>
                    <option value="medium">Medium - Need within 24 hours</option>
                    <option value="low">Low - Need within 72 hours</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Describe what you need and your situation..."
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      className="flex-1 p-2 border rounded-md"
                      placeholder="Enter your location"
                    />
                    <Button 
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {
                    // Handle submission
                    console.log("Resource request submitted");
                  }}
                >
                  <ListPlus className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Nearby Safety Points */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Nearby Safety Points</h2>
            <Button variant="outline" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View All Locations
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="md:col-span-2 bg-gray-100 rounded-xl overflow-hidden shadow-md">
              <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Safety Points Map</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  Expand Map
                </Button>
              </div>
              <div className="h-[300px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Interactive map coming soon
                </p>
              </div>
            </div>

            {/* Nearby Locations List */}
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="px-4 py-3 border-b">
                <h3 className="font-semibold">Nearest Locations</h3>
              </div>
              <div className="divide-y">
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg shrink-0">
                      <ShieldAlert className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Center</h4>
                      <p className="text-sm text-gray-600 mb-1">123 Main Street</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          0.8 miles away
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-600">Open Now</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                      <HeartPulse className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Emergency Medical Center</h4>
                      <p className="text-sm text-gray-600 mb-1">456 Health Ave</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          1.2 miles away
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-600">24/7 Open</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                      <Users2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Evacuation Center</h4>
                      <p className="text-sm text-gray-600 mb-1">789 Safety Road</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          1.5 miles away
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-600">Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Recent Updates</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-700 font-medium">Live Updates</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <PlusCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Report Incident
              </Button>
              <Button variant="outline" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All Updates
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {/* Community Report Card */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group hover:shadow-md transition-all duration-300 border-green-100 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-green-100 rounded-xl group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                        <MessageCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg text-gray-900">Supply Water Available</h3>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Community Report</span>
                          </div>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            30 mins ago
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Clean water supply available at City Park water station. Bring your own containers. Volunteers helping with distribution.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-green-600 font-medium">✅ Verified by 12 people</span>
                          <span className="text-sm text-gray-500">📍 City Park, Central Area</span>
                          <span className="text-sm text-blue-600">💧 Good Supply</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-green-100 rounded-xl">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl mb-2">Supply Water Available</DialogTitle>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Community Report</span>
                        <span className="text-xs text-gray-500">30 mins ago</span>
                        <span className="text-xs text-green-600 font-medium">✅ Verified by 12 people</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <p className="text-gray-600">
                      Clean water supply available at City Park water station. Bring your own containers. 
                      Volunteers are on site helping with distribution. The supply is expected to last for the next 48 hours.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900 font-medium">City Park Water Station</span>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          Get Directions
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">123 Park Avenue, Central Area, San Francisco, CA 94102</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Status Information</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 text-sm font-medium">💧 Supply Level</span>
                        <p className="text-gray-900 font-semibold">Good Supply</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-green-600 text-sm font-medium">👥 Queue Time</span>
                        <p className="text-gray-900 font-semibold">~15 minutes</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-purple-600 text-sm font-medium">⏰ Hours</span>
                        <p className="text-gray-900 font-semibold">24/7</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Additional Information</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Bring your own water containers</li>
                      <li>• Maximum 5 gallons per household</li>
                      <li>• Volunteers available for elderly assistance</li>
                      <li>• Water quality tested and approved</li>
                    </ul>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center gap-2 mt-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleVerify(1)}>
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReport(1)}>
                      <Flag className="h-4 w-4 mr-1" />
                      Report Issue
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("Water supply available at City Park")}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Full Details
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Water Supply Update Card */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-blue-100 rounded-xl group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                        <Navigation className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">Water Supply Update</h3>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            2 hours ago
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Water restoration in progress at Downtown area. Crews are working to restore service to affected neighborhoods.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-blue-600 font-medium">🚰 Service Status: In Progress</span>
                          <span className="text-sm text-gray-500">📍 Downtown Area</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-blue-100 rounded-xl">
                      <Navigation className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl mb-2">Water Supply Update</DialogTitle>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Official Update</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Situation Update</h4>
                    <p className="text-gray-600">
                      Water restoration work is currently in progress in the Downtown area. Our crews are actively working to restore service to all affected neighborhoods. Expected completion time is within 6-8 hours.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Affected Areas</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm text-gray-600">• Main Street to 5th Avenue</p>
                      <p className="text-sm text-gray-600">• Downtown Business District</p>
                      <p className="text-sm text-gray-600">• Residential Zone B</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Service Status</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <span className="text-yellow-600 text-sm font-medium">🚰 Status</span>
                        <p className="text-gray-900 font-semibold">In Progress</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 text-sm font-medium">⏱️ ETA</span>
                        <p className="text-gray-900 font-semibold">6-8 hours</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-green-600 text-sm font-medium">📊 Progress</span>
                        <p className="text-gray-900 font-semibold">65% Complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center gap-2 mt-6">
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReport(2)}>
                    <AlertOctagon className="h-4 w-4 mr-1" />
                    Report Issue
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("Water restoration in progress at Downtown area")}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Support
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Emergency Shelter Card */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-red-100 rounded-xl group-hover:scale-110 group-hover:bg-red-200 transition-all duration-300">
                        <Bell className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">Emergency Shelter</h3>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            4 hours ago
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          New emergency shelter opened at Community Center. Providing accommodation, food, and basic supplies.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-green-600 font-medium">✅ Status: Open</span>
                          <span className="text-sm text-gray-500">📍 123 Main Street</span>
                          <span className="text-sm text-blue-600">🏠 Capacity: 200 people</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-red-100 rounded-xl">
                      <Bell className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl mb-2">Emergency Shelter</DialogTitle>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Emergency Service</span>
                        <span className="text-xs text-gray-500">4 hours ago</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shelter Information</h4>
                    <p className="text-gray-600">
                      Emergency shelter facility is now open at the Community Center. We are providing temporary accommodation,
                      meals, and essential supplies for those affected by the current situation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Location & Access</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900 font-medium">Community Center</span>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          Get Directions
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">123 Main Street, Central District</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Facility Status</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-green-600 text-sm font-medium">✅ Status</span>
                        <p className="text-gray-900 font-semibold">Open</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 text-sm font-medium">🏠 Capacity</span>
                        <p className="text-gray-900 font-semibold">200 people</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-purple-600 text-sm font-medium">⏰ Hours</span>
                        <p className="text-gray-900 font-semibold">24/7</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Available Services</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Temporary accommodation</li>
                      <li>• Hot meals and drinking water</li>
                      <li>• Basic medical assistance</li>
                      <li>• Charging stations for devices</li>
                      <li>• Information and support desk</li>
                    </ul>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center gap-2 mt-6">
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReport(3)}>
                    <AlertOctagon className="h-4 w-4 mr-1" />
                    Report Issue
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("Emergency shelter open at Community Center")}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Shelter
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Road Closure Alert Card */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-yellow-100 rounded-xl group-hover:scale-110 group-hover:bg-yellow-200 transition-all duration-300">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">Road Closure Alert</h3>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            5 hours ago
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Highway 101 closed due to flooding between exits 25-30. Use alternate routes.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-yellow-600 font-medium">⚠️ Status: Closed</span>
                          <span className="text-sm text-gray-500">📍 Highway 101</span>
                          <span className="text-sm text-blue-600">🕒 Est. Duration: 6 hours</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 bg-yellow-100 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-xl mb-2">Road Closure Alert</DialogTitle>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">Traffic Alert</span>
                        <span className="text-xs text-gray-500">5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Closure Details</h4>
                    <p className="text-gray-600">
                      Highway 101 is currently closed due to flooding between exits 25-30. Emergency crews are working
                      to clear the water. Please use alternate routes and avoid the area.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Affected Area</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900 font-medium">Highway 101</span>
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          View Map
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">Between Exit 25 (North Bridge) and Exit 30 (South Valley)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Closure Status</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <span className="text-yellow-600 text-sm font-medium">⚠️ Status</span>
                        <p className="text-gray-900 font-semibold">Closed</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 text-sm font-medium">🕒 Duration</span>
                        <p className="text-gray-900 font-semibold">~6 hours</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-purple-600 text-sm font-medium">🚧 Type</span>
                        <p className="text-gray-900 font-semibold">Full Closure</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Alternate Routes</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-sm mb-1">Northbound Traffic</p>
                        <p className="text-sm text-gray-600">Take Route 82 to Bypass Road, then reconnect at Exit 31</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-sm mb-1">Southbound Traffic</p>
                        <p className="text-sm text-gray-600">Exit at 24, use Valley Road to reconnect at Exit 31</p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center gap-2 mt-6">
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleReport(4)}>
                    <AlertOctagon className="h-4 w-4 mr-1" />
                    Report Issue
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("Highway 101 closed between exits 25-30 due to flooding")}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Navigation className="h-4 w-4 mr-1" />
                      Get Directions
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
} 