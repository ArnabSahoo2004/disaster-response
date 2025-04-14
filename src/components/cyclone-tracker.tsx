import React, { useState } from 'react'
import { AlertTriangle, Clock, MapPin, Wind, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/lib/language-context'

interface CycloneAlert {
  name: string
  status: 'warning' | 'watch' | 'active'
  windSpeed: number
  landfallTime: string
  location: string
  category: string
  affectedDistricts: string[]
  safetyTips: string[]
}

const mockCycloneData: CycloneAlert = {
  name: "Cyclone Yaas",
  status: "warning",
  windSpeed: 120,
  landfallTime: "24 hours",
  location: "Bay of Bengal",
  category: "Very Severe Cyclonic Storm",
  affectedDistricts: ["Bhadrak", "Balasore", "Kendrapara", "Jagatsinghpur", "Puri"],
  safetyTips: [
    "Stay updated with official weather bulletins",
    "Prepare emergency kit with essential supplies",
    "Identify nearest cyclone shelter",
    "Secure loose objects and reinforce windows",
    "Follow evacuation orders if issued"
  ]
}

export function CycloneTracker() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning':
        return 'bg-yellow-500'
      case 'watch':
        return 'bg-orange-500'
      case 'active':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          {t('cyclone_tracker.title')}
        </CardTitle>
        <Badge variant={mockCycloneData.status === 'warning' ? 'warning' : 'destructive'}>
          {t(`cyclone_tracker.${mockCycloneData.status}`)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {t('cyclone_tracker.wind_speed')}: {mockCycloneData.windSpeed} km/h
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {t('cyclone_tracker.landfall')}: {mockCycloneData.landfallTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {t('cyclone_tracker.location')}: {mockCycloneData.location}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {t('cyclone_tracker.category')}: {mockCycloneData.category}
            </span>
          </div>

          {isExpanded && (
            <div className="space-y-4 pt-4">
              <div>
                <h4 className="font-medium mb-2">{t('cyclone_tracker.affected_districts')}</h4>
                <div className="flex flex-wrap gap-2">
                  {mockCycloneData.affectedDistricts.map((district) => (
                    <Badge key={district} variant="secondary">
                      {district}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">{t('cyclone_tracker.safety_instructions')}</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {mockCycloneData.safetyTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  {t('cyclone_tracker.find_shelters')}
                </Button>
                <Button variant="outline" className="flex-1">
                  {t('cyclone_tracker.evacuation_routes')}
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full flex items-center justify-center space-x-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>{t('cyclone_tracker.show_less')}</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>{t('cyclone_tracker.show_more')}</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 