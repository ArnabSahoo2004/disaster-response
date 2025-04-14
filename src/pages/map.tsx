import React from 'react'
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet'
import { LatLngTuple, Icon, divIcon } from 'leaflet'
import { ArrowLeft, Navigation, AlertTriangle, MapPin, Shield } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import 'leaflet/dist/leaflet.css'

interface Warning {
  id: number
  type: string
  location: LatLngTuple
  radius: number
  color: string
  severity: string
  description: string
  time: string
}

// Create custom icons for each warning type
const createWarningIcon = (type: string) => {
  let iconSvg = ''
  let color = ''

  switch (type) {
    case 'heatwave':
      color = '#EAB308' // yellow
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      `
      break
    case 'flood':
      color = '#3B82F6' // blue
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M2 15c6.667-6 13.333 0 20-6" />
          <path d="M2 20c6.667-6 13.333 0 20-6" />
          <path d="M2 10c6.667-6 13.333 0 20-6" />
        </svg>
      `
      break
    case 'thunderstorm':
      color = '#6B21A8' // purple
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      `
      break
  }

  return divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      ">
        ${iconSvg}
      </div>
    `,
    className: 'custom-warning-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  })
}

// Dummy warning data
const warnings: Warning[] = [
  {
    id: 1,
    type: 'heatwave',
    location: [20.2961, 85.8245],
    radius: 30000,
    color: '#EAB308', // yellow
    severity: 'Severe',
    description: 'Extreme temperature warning: 45°C',
    time: '12:00 PM - 4:00 PM'
  },
  {
    id: 2,
    type: 'flood',
    location: [20.4961, 85.8245],
    radius: 15000,
    color: '#3B82F6', // blue
    severity: 'High',
    description: 'Flash flood warning: Heavy rainfall',
    time: 'Next 24 hours'
  },
  {
    id: 3,
    type: 'thunderstorm',
    location: [20.3961, 86.0245],
    radius: 20000,
    color: '#6B21A8', // purple
    severity: 'Moderate',
    description: 'Thunderstorm with lightning',
    time: '6:00 PM - 9:00 PM'
  }
]

export function MapPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-[100dvh] relative">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm z-[1001]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Warning Map</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Find Shelter
          </Button>
          <Button variant="outline" size="sm">
            <Navigation className="h-4 w-4 mr-2" />
            Safe Routes
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[20.3961, 85.8245] as LatLngTuple}
          zoom={10}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {warnings.map((warning) => (
            <React.Fragment key={warning.id}>
              <Circle
                center={warning.location}
                radius={warning.radius}
                pathOptions={{
                  color: warning.color,
                  fillColor: warning.color,
                  fillOpacity: 0.2
                }}
              />
              <Marker
                position={warning.location}
                icon={createWarningIcon(warning.type)}
              >
                <Popup>
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        style={{ backgroundColor: warning.color }}
                        className="text-white"
                      >
                        {warning.severity}
                      </Badge>
                      <h3 className="font-semibold capitalize">{warning.type} Warning</h3>
                    </div>
                    <p className="text-sm mb-1">{warning.description}</p>
                    <p className="text-xs text-gray-600">Time: {warning.time}</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Quick Actions Overlay */}
        <div className="fixed bottom-[72px] left-4 right-4 z-[1000] max-w-md mx-auto inset-x-0">
          <div className="bg-white shadow-lg rounded-lg border">
            <div className="flex gap-2 overflow-x-auto p-3">
              <Button variant="outline" size="sm" className="whitespace-nowrap flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Hazard
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                Mark Safe Zone
              </Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap flex-1">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 