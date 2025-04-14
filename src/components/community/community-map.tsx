import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon } from 'leaflet'
import { Users2, HeartPulse, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import 'leaflet/dist/leaflet.css'

interface Location {
  lat: number
  lng: number
}

interface ResponseTeam {
  id: string
  name: string
  type: string
  description: string
  location: string
  coordinates: Location
  members: number
  status: string
  icon: any
  color: string
}

interface CommunityUpdate {
  id: string
  title: string
  description: string
  location: string
  coordinates: Location
  timeAgo: string
  responses: number
  status: string
  type: string
  icon: any
  color: string
}

// Dummy data with coordinates
const responseTeams: ResponseTeam[] = [
  {
    id: '1',
    name: "Emergency Medical Team",
    type: "Medical",
    description: "Trained medical professionals providing emergency care",
    location: "Downtown Medical Center",
    coordinates: { lat: 20.2961, lng: 85.8245 },
    members: 12,
    status: "Active",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  },
  {
    id: '2',
    name: "Search & Rescue Unit",
    type: "Rescue",
    description: "Specialized team for search and rescue operations",
    location: "Fire Station #3",
    coordinates: { lat: 20.3161, lng: 85.8445 },
    members: 8,
    status: "Active",
    icon: ShieldAlert,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: '3',
    name: "Community Support Group",
    type: "Support",
    description: "Volunteers providing food, water, and supplies",
    location: "Community Center",
    coordinates: { lat: 20.2861, lng: 85.8345 },
    members: 15,
    status: "Active",
    icon: Users2,
    color: "bg-green-100 text-green-600"
  }
]

const communityUpdates: CommunityUpdate[] = [
  {
    id: '1',
    title: "Volunteers Needed",
    description: "Looking for volunteers to help distribute supplies",
    location: "Community Center, Downtown",
    coordinates: { lat: 20.2761, lng: 85.8145 },
    timeAgo: "2 hours ago",
    responses: 8,
    status: "Open",
    type: "volunteer",
    icon: Users2,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: '2',
    title: "Medical Supplies Available",
    description: "First aid kits and basic medical supplies available",
    coordinates: { lat: 20.3061, lng: 85.8545 },
    location: "Downtown Medical Center",
    timeAgo: "4 hours ago",
    responses: 12,
    status: "Open",
    type: "supplies",
    icon: HeartPulse,
    color: "bg-red-100 text-red-600"
  }
]

// Create custom markers for different types
const createMarkerIcon = (type: string) => {
  let color = ''
  let svg = ''

  switch (type) {
    case 'Medical':
      color = '#DC2626' // red-600
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M22 12h-4m-2 0h-4m-2 0H6m-4 0h4m8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        </svg>
      `
      break
    case 'Rescue':
      color = '#2563EB' // blue-600
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      `
      break
    case 'volunteer':
      color = '#9333EA' // purple-600
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      `
      break
    default:
      color = '#16A34A' // green-600
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      `
  }

  return divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      ">
        ${svg}
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  })
}

export function CommunityMap() {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden border">
      <MapContainer
        center={[20.2961, 85.8245]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Response Teams Markers */}
        {responseTeams.map((team) => (
          <Marker
            key={team.id}
            position={[team.coordinates.lat, team.coordinates.lng]}
            icon={createMarkerIcon(team.type)}
          >
            <Popup>
              <Card className="border-0 shadow-none">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={team.color}>
                      {team.type}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      {team.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{team.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{team.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users2 className="h-4 w-4" />
                    <span>{team.members} members</span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Contact Team
                  </Button>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}

        {/* Community Updates Markers */}
        {communityUpdates.map((update) => (
          <Marker
            key={update.id}
            position={[update.coordinates.lat, update.coordinates.lng]}
            icon={createMarkerIcon(update.type)}
          >
            <Popup>
              <Card className="border-0 shadow-none">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={update.color}>
                      {update.type}
                    </Badge>
                    <span className="text-sm text-gray-500">{update.timeAgo}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users2 className="h-4 w-4" />
                    <span>{update.responses} responses</span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Respond
                  </Button>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
} 