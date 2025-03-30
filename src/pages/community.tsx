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
  CheckCircle
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

const responseTeams = [
  {
    name: "Emergency Medical Team",
    type: "Medical",
    description: "Trained medical professionals providing emergency care",
    location: "Downtown Medical Center",
    distance: "0.5 miles",
    members: 12,
    status: "Active",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  },
  {
    name: "Search & Rescue Unit",
    type: "Rescue",
    description: "Specialized team for search and rescue operations",
    location: "Fire Station #3",
    distance: "1.2 miles",
    members: 8,
    status: "Active",
    icon: ShieldAlert,
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Community Support Group",
    type: "Support",
    description: "Volunteers providing food, water, and supplies",
    location: "Community Center",
    distance: "0.8 miles",
    members: 15,
    status: "Active",
    icon: Users2,
    color: "bg-green-100 text-green-600"
  }
]

const communityUpdates = [
  {
    title: "Volunteers Needed",
    description: "Looking for volunteers to help distribute supplies at the Community Center",
    location: "Community Center, Downtown",
    timeAgo: "2 hours ago",
    responses: 8,
    status: "Open",
    type: "volunteer",
    icon: Users2,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Medical Supplies Available",
    description: "First aid kits and basic medical supplies available at the Medical Center",
    location: "Downtown Medical Center",
    timeAgo: "4 hours ago",
    responses: 12,
    status: "Open",
    type: "supplies",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Emergency Shelter Open",
    description: "Temporary shelter with basic amenities available at the High School",
    location: "High School Gymnasium",
    timeAgo: "1 hour ago",
    responses: 15,
    status: "Open",
    type: "shelter",
    icon: ShieldAlert,
    color: "bg-blue-100 text-blue-600"
  }
]

export function CommunityPage() {
  const [showPostForm, setShowPostForm] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedTeamType, setSelectedTeamType] = useState<string>("all")
  const [selectedUpdateType, setSelectedUpdateType] = useState<string>("all")

  const filteredTeams = responseTeams.filter(team => 
    selectedTeamType === "all" || team.type.toLowerCase() === selectedTeamType.toLowerCase()
  )

  const filteredUpdates = communityUpdates.filter(update => 
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Post Community Update</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Enter update title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Describe your update" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="Enter location" />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select update type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">Volunteer Need</SelectItem>
                      <SelectItem value="supplies">Supplies Available</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Post Update</Button>
              </div>
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
          
          <TabsContent value="teams">
            {showMap ? (
              <Card className="h-[500px]">
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Interactive map coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredTeams.map((team) => (
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
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Contact Team
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
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
              </div>
            )}
          </TabsContent>

          <TabsContent value="updates">
            {showMap ? (
              <Card className="h-[500px]">
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Interactive map coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredUpdates.map((update) => (
                  <Card key={update.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${update.color}`}>
                          {React.createElement(update.icon, { className: "h-6 w-6" })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{update.title}</h3>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {update.timeAgo}
                            </span>
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
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Respond
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Community Chat */}
        {showChat && (
          <Dialog open={showChat} onOpenChange={setShowChat}>
            <DialogContent className="max-w-2xl h-[600px]">
              <DialogHeader>
                <DialogTitle>Community Chat</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {/* Chat messages would go here */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-600">Chat functionality coming soon...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." />
                  <Button>Send</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
} 