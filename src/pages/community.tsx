import React, { useState } from 'react'
import { 
  Users2, 
  Phone, 
  MapPin, 
  MessageCircle,
  ShieldAlert,
  HeartPulse,
  Search,
  Filter,
  PlusCircle,
  Clock,
  CheckCircle2,
  X,
  Map,
  MessageSquare,
  UserPlus,
  CheckCircle,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmergencySOS } from "@/components/emergency-sos"
import { CommunityMap } from '@/components/community/community-map'
import { CommunityChat } from '@/components/community/community-chat'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

interface ResponseTeam {
  name: string
  type: string
  description: string
  location: string
  distance: string
  members: number
  status: string
  icon: any
  color: string
  coordinates: { lat: number; lng: number }
  phone: string
}

const responseTeams: ResponseTeam[] = [
  {
    name: "Emergency Medical Team",
    type: "Medical",
    description: "Trained medical professionals providing emergency care",
    location: "Capital Hospital, Unit-6, Bhubaneswar",
    distance: "1.2 km",
    members: 12,
    status: "Active",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600",
    coordinates: { lat: 20.2961, lng: 85.8315 },
    phone: "0674-2391983"
  },
  {
    name: "ODRAF Team",
    type: "Rescue",
    description: "Odisha Disaster Rapid Action Force - specialized rescue operations",
    location: "Fire Station, Baramunda, Bhubaneswar",
    distance: "2.5 km",
    members: 8,
    status: "Active",
    icon: ShieldAlert,
    color: "bg-blue-100 text-blue-600",
    coordinates: { lat: 20.2712, lng: 85.7849 },
    phone: "0674-2397906"
  },
  {
    name: "OSDMA Support Group",
    type: "Support",
    description: "Odisha State Disaster Management Authority volunteers",
    location: "Rajiv Bhawan, Bhubaneswar",
    distance: "0.8 km",
    members: 15,
    status: "Active",
    icon: Users2,
    color: "bg-green-100 text-green-600",
    coordinates: { lat: 20.2961, lng: 85.8245 },
    phone: "0674-2395398"
  }
]

interface CommunityUpdate {
  id: string
  title: string
  description: string
  location: string
  coordinates: { lat: number; lng: number }
  type: string
  timeAgo: string
  responses: number
  status: string
  verified: boolean
  icon: any
  color: string
  userCreated?: boolean
}

const communityUpdates: CommunityUpdate[] = [
  {
    id: "1",
    title: "Volunteers Needed",
    description: "Need volunteers for flood relief efforts in Puri district. Please bring water and food supplies if possible.",
    location: "Gopabandhu Stadium, Puri",
    coordinates: { lat: 19.8135, lng: 85.8312 },
    type: "volunteer",
    timeAgo: "2 hours ago",
    responses: 5,
    status: "Open",
    verified: true,
    icon: Users2,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "2", 
    title: "Medical Supplies Available",
    description: "First aid kits and basic medications available for affected areas in Cuttack.",
    location: "SCB Medical College, Cuttack",
    coordinates: { lat: 20.4686, lng: 85.8792 },
    type: "supplies",
    timeAgo: "1 hour ago",
    responses: 3,
    status: "Open",
    verified: true,
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  },
  {
    id: "3",
    title: "Emergency Shelter Open",
    description: "Temporary shelter available at Kalinga Stadium with food and basic amenities. Can accommodate up to 500 people.",
    location: "Kalinga Stadium, Bhubaneswar",
    coordinates: { lat: 20.2961, lng: 85.8245 },
    type: "shelter",
    timeAgo: "30 minutes ago",
    responses: 8,
    status: "Open",
    verified: true,
    icon: ShieldAlert,
    color: "bg-blue-100 text-blue-600"
  }
]

// Update form data interface
interface UpdateFormData {
  title: string;
  description: string;
  location: string;
  type: string;
  coordinates: { lat: number; lng: number };
}

export function CommunityPage() {
  const { toast } = useToast()
  const [showPostForm, setShowPostForm] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedTeamType, setSelectedTeamType] = useState<string>("all")
  const [selectedUpdateType, setSelectedUpdateType] = useState<string>("all")
  const [updates, setUpdates] = useState<CommunityUpdate[]>(communityUpdates)
  
  // Update form state with coordinates
  const [formData, setFormData] = useState<UpdateFormData>({
    title: "",
    description: "",
    location: "",
    type: "volunteer",
    coordinates: { lat: 20.2961, lng: 85.8245 } // Default to Bhubaneswar coordinates
  })

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDelete = (updateId: string) => {
    setUpdates(prev => prev.filter(update => update.id !== updateId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new update
    const newUpdate = {
      id: Date.now().toString(),
      ...formData,
      timeAgo: "Just now",
      responses: 0,
      status: "Open",
      verified: false,
      icon: formData.type === "volunteer" ? Users2 : 
            formData.type === "supplies" ? HeartPulse : 
            formData.type === "shelter" ? ShieldAlert : Users2,
      color: formData.type === "volunteer" ? "bg-purple-100 text-purple-600" :
             formData.type === "supplies" ? "bg-red-100 text-red-600" :
             formData.type === "shelter" ? "bg-blue-100 text-blue-600" :
             "bg-purple-100 text-purple-600",
      userCreated: true
    }

    // Add to updates list
    setUpdates(prev => [newUpdate, ...prev])

    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      type: "volunteer",
      coordinates: { lat: 20.2961, lng: 85.8245 }
    })
    setShowPostForm(false)
  }

  const handleVerify = (id: string) => {
    setUpdates(prev => prev.map(update => {
      if (update.id === id) {
        return { ...update, verified: !update.verified }
      }
      return update
    }))
    toast({
      title: "Update Status Changed",
      description: "The update verification status has been toggled."
    })
  }

  const handleRespond = (id: string) => {
    setUpdates(prev => prev.map(update => {
      if (update.id === id) {
        return { ...update, responses: update.responses + 1 }
      }
      return update
    }))
    toast({
      title: "Response Recorded",
      description: "Thank you for responding to this update."
    })
  }

  const handleGetDirections = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    window.open(url, '_blank')
  }

  const handleContactTeam = (phone: string) => {
    window.location.href = `tel:${phone}`
    toast({
      title: "Contacting Team",
      description: `Calling ${phone}...`,
      duration: 3000,
    })
  }

  const handleGetTeamDirections = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    window.open(url, '_blank')
    toast({
      title: "Opening Directions",
      description: "Directions opened in Google Maps",
      duration: 3000,
    })
  }

  const handleJoinTeam = (teamName: string) => {
    console.log("Joining team:", teamName) // Debug log
    toast({
      title: "Team Joined Successfully",
      description: `You have joined ${teamName}. The team coordinator will contact you shortly.`,
      duration: 5000,
    })
  }

  const filteredTeams = responseTeams.filter(team => 
    selectedTeamType === "all" || team.type.toLowerCase() === selectedTeamType.toLowerCase()
  )

  const filteredUpdates = updates.filter(update => 
    selectedUpdateType === "all" || update.type?.toLowerCase() === selectedUpdateType.toLowerCase()
  )

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
            <Users2 className="h-8 w-8 text-purple-600" />
            Community Hub
          </h1>
          <p className="text-gray-600">Connect with local response teams and community members</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input 
              placeholder="Search teams or updates..." 
              className="pl-9"
            />
          </div>
          <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Team Type</Label>
                  <Select value={selectedTeamType} onValueChange={setSelectedTeamType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="rescue">Rescue</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Update Type</Label>
                  <Select value={selectedUpdateType} onValueChange={setSelectedUpdateType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select update type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Updates</SelectItem>
                      <SelectItem value="volunteer">Volunteer Needs</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showPostForm} onOpenChange={setShowPostForm}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <PlusCircle className="h-4 w-4" />
                Post Update
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0">
              <div className="px-6 py-4 border-b">
                <DialogTitle>Post Community Update</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Share important information with your community. Be clear and specific.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="e.g., Urgent: Volunteers needed for flood relief"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    placeholder="Provide detailed information about your update..."
                    className="mt-1.5 min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <Input 
                    value={formData.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    placeholder="e.g., Community Center, 123 Main St"
                    className="mt-1.5"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Update Type</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => handleFormChange("type", value)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">
                        <div className="flex items-center gap-2">
                          <Users2 className="h-4 w-4 text-purple-600" />
                          Volunteer Need
                        </div>
                      </SelectItem>
                      <SelectItem value="supplies">
                        <div className="flex items-center gap-2">
                          <HeartPulse className="h-4 w-4 text-red-600" />
                          Supplies Available
                        </div>
                      </SelectItem>
                      <SelectItem value="shelter">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-blue-600" />
                          Shelter
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-6" 
                  disabled={!formData.title || !formData.description || !formData.location}
                >
                  Post Update
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* View Toggle */}
        <div className="mb-8 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowMap(!showMap)}
          >
            <Map className="h-4 w-4" />
            {showMap ? "List View" : "Map View"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-4 w-4" />
            Community Chat
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="teams" className="space-y-4">
          <TabsList>
            <TabsTrigger value="teams">Response Teams</TabsTrigger>
            <TabsTrigger value="updates">Community Updates</TabsTrigger>
          </TabsList>

          {/* Map View */}
          {showMap && (
            <div className="mb-6">
              <CommunityMap />
            </div>
          )}

          {/* Teams Tab Content */}
          <TabsContent value="teams" className="space-y-4">
            {filteredTeams.map((team, index) => (
              <Card key={team.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${team.color}`}>
                      {React.createElement(team.icon, { className: "h-6 w-6" })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{team.name}</h3>
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          {team.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{team.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {team.location}
                        </span>
                        <span className="text-gray-600">{team.distance}</span>
                        <span className="text-purple-600">
                          👥 {team.members} members
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleContactTeam(team.phone)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Team
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleGetTeamDirections(team.coordinates)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                          onClick={() => handleJoinTeam(team.name)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Join Team
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Updates Tab Content */}
          <TabsContent value="updates" className="space-y-4">
            {filteredUpdates.map((update) => (
              <Card key={update.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${update.color}`}>
                      {React.createElement(update.icon, { className: "h-6 w-6" })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{update.title}</h3>
                          {update.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {update.timeAgo}
                          </span>
                          {update.userCreated && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                              onClick={() => handleDelete(update.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{update.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {update.location}
                        </span>
                        <span className="text-green-600">
                          ✅ {update.responses} responses
                        </span>
                        <span className="text-blue-600">
                          {update.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleRespond(update.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Respond ({update.responses})
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleGetDirections(update.coordinates)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={cn(
                            "flex-1",
                            update.verified 
                              ? "bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                              : "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                          )}
                          onClick={() => handleVerify(update.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {update.verified ? 'Unverify' : 'Verify'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Community Chat */}
        {showChat && (
          <Dialog open={showChat} onOpenChange={setShowChat}>
            <DialogContent className="max-w-3xl h-[90vh] p-0 gap-0">
              <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle className="text-xl">Community Chat</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <CommunityChat />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      {/* Add Toaster component at the end */}
      <Toaster />
    </div>
  )
} 