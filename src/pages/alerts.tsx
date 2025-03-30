import React from 'react'
import { ArrowLeft, Bell, MapPin, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const alerts = [
  {
    id: 1,
    type: "Weather",
    title: "Flash Flood Warning",
    description: "Flash flood warning in your area",
    time: "10 minutes ago",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    id: 2,
    type: "Update",
    title: "Water Supply Update",
    description: "Water restoration in progress at Downtown area",
    time: "2 hours ago",
    icon: MapPin,
    color: "blue",
  },
  {
    id: 3,
    type: "Emergency",
    title: "Emergency Shelter",
    description: "New shelter opened at Community Center",
    time: "4 hours ago",
    icon: Bell,
    color: "red",
  },
]

export function AlertsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Alerts</h1>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 bg-${alert.color}-100 rounded-lg`}>
                  <alert.icon className={`h-5 w-5 text-${alert.color}-600`} />
                </div>
                <div>
                  <span className={`text-xs font-medium text-${alert.color}-600`}>
                    {alert.type}
                  </span>
                  <h3 className="font-medium mt-1">{alert.title}</h3>
                  <p className="text-sm text-gray-500">{alert.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 