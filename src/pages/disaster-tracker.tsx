import React, { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useLanguage } from '../lib/language-context'
import { AlertCircle, ArrowUpRight, Clock, MapPin, RefreshCw, Wind, AlertTriangle, Siren, Phone } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Icon, LatLngExpression } from 'leaflet'

type DisasterType = 'cyclone' | 'flood' | 'earthquake' | 'tsunami' | 'fire'
type AlertLevel = 'warning' | 'watch' | 'emergency' | 'severe'

interface DisasterData {
  type: DisasterType
  name: string
  latitude: number
  longitude: number
  alertLevel: AlertLevel
  expectedTime: string
  affectedAreas: string[]
  safetyMeasures: {
    immediate: string[]
    preparation: string[]
    aftermath: string[]
  }
  cyclonePath?: {
    pastPositions: LatLngExpression[]
    predictedPath: LatLngExpression[]
    intensity: number
    radius: number
  }
}

// Fix for Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
})

const alertIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Custom icon for the cyclone
const cycloneIcon = new Icon({
  iconUrl: '/images/cyclone.png',
  iconRetinaUrl: '/images/cyclone.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/images/marker-shadow.png',
  shadowSize: [41, 41],
})

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

function getAlertColor(level: AlertLevel): string {
  switch (level) {
    case 'warning':
      return '#FBBF24' // Yellow
    case 'watch':
      return '#FB923C' // Orange
    case 'emergency':
      return '#DC2626' // Red
    case 'severe':
      return '#7F1D1D' // Dark Red
    default:
      return '#DC2626'
  }
}

function getDisasterColor(type: DisasterType): string {
  switch (type) {
    case 'flood':
      return '#3B82F6' // blue-500
    case 'cyclone':
      return '#EF4444' // red-500
    case 'earthquake':
      return '#7F1D1D' // Dark Red
    case 'tsunami':
      return '#7F1D1D' // Dark Red
    case 'fire':
      return '#7F1D1D' // Dark Red
    default:
      return '#6B7280' // gray-500
  }
}

export default function DisasterTrackerPage() {
  const { t } = useLanguage()
  const [disasterData, setDisasterData] = useState<DisasterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        setLoading(true)
        // Mock disaster data
        const mockData: DisasterData = {
          type: 'cyclone',
          name: 'Cyclone Fani',
          latitude: 19.8028,
          longitude: 85.8417,
          alertLevel: 'severe',
          expectedTime: '2023-05-03T14:00:00Z',
          affectedAreas: [
            'Puri',
            'Bhubaneswar',
            'Cuttack',
            'Khordha',
            'Jagatsinghpur'
          ],
          safetyMeasures: {
            immediate: [
              'Move to higher ground immediately',
              'Avoid walking or driving through flood waters',
              'Follow evacuation orders without delay',
              'Disconnect electrical appliances',
              'Prepare emergency kit'
            ],
            preparation: [
              'Stock up on essential supplies',
              'Secure important documents',
              'Follow evacuation orders',
              'Keep emergency kit ready',
              'Charge all communication devices'
            ],
            aftermath: [
              'Wait for official all-clear signal',
              'Check for structural damage',
              'Document damage for insurance',
              'Be aware of contaminated water',
              'Help neighbors if safe to do so'
            ]
          },
          cyclonePath: {
            pastPositions: [
              [18.8028, 87.8417],
              [19.1028, 86.8417],
              [19.4028, 86.3417]
            ],
            predictedPath: [
              [19.8028, 85.8417],
              [20.2028, 85.3417],
              [20.6028, 84.8417],
              [21.0028, 84.3417]
            ],
            intensity: 175,
            radius: 50
          }
        }
        setDisasterData(mockData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch disaster data')
      } finally {
        setLoading(false)
      }
    }

    fetchDisasterData()
  }, [])

  // Convert radius from km to meters for the circle
  const radiusInMeters = disasterData?.cyclonePath ? disasterData.cyclonePath.radius * 1000 : 0

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Emergency Alert Banner */}
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <Siren className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">EMERGENCY ALERT</h2>
              <p className="text-sm">Natural Disaster Warning System</p>
            </div>
            <Button variant="outline" className="ml-auto border-white text-white hover:bg-red-700" onClick={() => window.location.href = "tel:112"}>
              <Phone className="h-4 w-4 mr-2" />
              Emergency Services
            </Button>
          </div>
        </div>

        {loading ? (
          <Alert className="bg-yellow-600 text-white border-none">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('loading')}</AlertTitle>
            <AlertDescription>{t('try_again')}</AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive" className="border-none">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('error_occurred')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : disasterData ? (
          <div className="grid gap-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="h-5 w-5" />
                    Alert Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge 
                      className="text-lg px-4 py-2" 
                      style={{
                        backgroundColor: getAlertColor(disasterData.alertLevel),
                        color: 'white'
                      }}
                    >
                      {disasterData.alertLevel.toUpperCase()}
                    </Badge>
                    <span className="text-2xl font-bold">{disasterData.type.toUpperCase()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-500">
                    <Clock className="h-5 w-5" />
                    Expected Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">{disasterData.expectedTime}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-500">
                    <MapPin className="h-5 w-5" />
                    Affected Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {disasterData.affectedAreas.slice(0, 3).map((area, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500">
                        {area}
                      </Badge>
                    ))}
                    {disasterData.affectedAreas.length > 3 && (
                      <Badge variant="outline" className="border-blue-500">
                        +{disasterData.affectedAreas.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cyclone Tracking Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] rounded-lg overflow-hidden">
                    <MapContainer
                      center={[disasterData.latitude, disasterData.longitude]}
                      zoom={7}
                      className="h-full w-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      {/* Current Position */}
                      <Marker 
                        position={[disasterData.latitude, disasterData.longitude]} 
                        icon={cycloneIcon}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold">{disasterData.name}</h3>
                            <p className="text-sm">Wind Speed: {disasterData.cyclonePath?.intensity} km/h</p>
                            <p className="text-sm">Expected: {new Date(disasterData.expectedTime).toLocaleString()}</p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Past Path */}
                      {disasterData.cyclonePath && (
                        <Polyline
                          positions={disasterData.cyclonePath.pastPositions}
                          color={getDisasterColor(disasterData.type)}
                          weight={3}
                          dashArray="5, 10"
                        />
                      )}

                      {/* Predicted Path */}
                      {disasterData.cyclonePath && (
                        <Polyline
                          positions={disasterData.cyclonePath.predictedPath}
                          color={getDisasterColor(disasterData.type)}
                          weight={3}
                          dashArray="10, 10"
                        />
                      )}

                      {/* Impact Radius */}
                      <Circle
                        center={[disasterData.latitude, disasterData.longitude]}
                        radius={radiusInMeters}
                        color={getDisasterColor(disasterData.type)}
                        fillColor={getDisasterColor(disasterData.type)}
                        fillOpacity={0.1}
                      />
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Safety Instructions */}
            <Card className="bg-gray-800 border-none text-white">
              <CardHeader>
                <CardTitle className="text-xl text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  IMMEDIATE ACTIONS REQUIRED
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-red-500 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      TAKE ACTION NOW
                    </h3>
                    <ul className="space-y-2">
                      {disasterData.safetyMeasures.immediate.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 mt-1 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-yellow-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      BE PREPARED
                    </h3>
                    <ul className="space-y-2">
                      {disasterData.safetyMeasures.preparation.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 mt-1 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-blue-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      AFTER EVENT
                    </h3>
                    <ul className="space-y-2">
                      {disasterData.safetyMeasures.aftermath.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 mt-1 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
} 