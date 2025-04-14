import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, ZoomControl } from 'react-leaflet'
import { LatLngExpression, LatLngTuple } from 'leaflet'
import L from 'leaflet'

const startIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})

const endIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})

const higherGroundIcon = L.icon({
  iconUrl: 'https://www.shutterstock.com/image-vector/location-map-pin-icon-symbol-vector-2476814193',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})

const routes = [
  {
    start: [20.2961, 85.8245] as LatLngTuple,
    end: [20.3015, 85.8295] as LatLngTuple,
    description: "Route to Capital Hospital",
    color: "#007bff",
    distance: "2 km",
    time: "5 mins"
  },
  {
    start: [20.2961, 85.8245] as LatLngTuple,
    end: [20.3100, 85.8360] as LatLngTuple,
    description: "Route to Higher Ground",
    color: "#28a745",
    distance: "3 km",
    time: "10 mins"
  },
  {
    start: [20.2961, 85.8245] as LatLngTuple,
    end: [20.3150, 85.8450] as LatLngTuple,
    description: "Route to Safe Zone",
    color: "#dc3545",
    distance: "4 km",
    time: "15 mins"
  }
]

export function SafeRoutesPage() {
  const [routesData, setRoutesData] = useState<LatLngExpression[][]>([])

  useEffect(() => {
    const fetchRoutes = async () => {
      const allRoutes = await Promise.all(routes.map(async (route) => {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c45839980de149db868f927fbb807e3e&start=${route.start[1]},${route.start[0]}&end=${route.end[1]},${route.end[0]}`
        )
        const data = await response.json()
        return data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])
      }))
      setRoutesData(allRoutes)
    }
    fetchRoutes()
  }, [])

  return (
    <div className="min-h-screen">
      <MapContainer center={[20.2961, 85.8245]} zoom={13} className="leaflet-container" zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <ZoomControl position="topright" />
        {routesData.map((route, index) => (
          <Polyline key={index} positions={route} color={routes[index].color} weight={5} opacity={0.7}>
            <Popup>
              <strong>{routes[index].description}</strong><br />
              Distance: {routes[index].distance}<br />
              Estimated Time: {routes[index].time}
            </Popup>
          </Polyline>
        ))}
        {routes.map((route, index) => (
          <Marker key={`start-${index}`} position={route.start} icon={startIcon}>
            <Popup>Start: {route.description}</Popup>
          </Marker>
        ))}
        {routes.map((route, index) => (
          <Marker key={`end-${index}`} position={route.end} icon={index === 1 ? higherGroundIcon : endIcon}>
            <Popup>End: {route.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
} 