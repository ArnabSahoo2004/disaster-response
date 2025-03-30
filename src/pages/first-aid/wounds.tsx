import React from 'react'
import { ArrowLeft, Droplets, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const woundSteps = [
  {
    step: 1,
    title: "Ensure Safety",
    description: "Protect yourself with gloves or clean material before touching the wound.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Expose the Wound",
    description: "Remove or cut away clothing to expose the wound. Do not remove embedded objects.",
    icon: Droplets
  },
  {
    step: 3,
    title: "Control Bleeding",
    description: "Apply direct pressure to the wound using sterile gauze or clean cloth.",
    icon: Droplets
  },
  {
    step: 4,
    title: "Elevate the Injury",
    description: "If possible, raise the injured area above the heart to reduce bleeding.",
    icon: Droplets
  },
  {
    step: 5,
    title: "Apply Pressure Bandage",
    description: "Wrap the wound firmly with a sterile bandage or clean cloth.",
    icon: Droplets
  },
  {
    step: 6,
    title: "Monitor the Person",
    description: "Check for signs of shock and maintain pressure until help arrives.",
    icon: AlertCircle
  }
]

export function WoundsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-4 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Bleeding & Wounds</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              For severe bleeding or deep wounds, call 911 immediately. 
              Emergency responders can provide guidance while they arrive.
            </p>
            <Button 
              className="mt-2 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 911 Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Bleeding Control Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Proper wound care and bleeding control are essential first aid skills that can help 
              prevent infection and save lives in emergency situations.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Types of Bleeding</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Capillary bleeding (minor cuts and scrapes)</li>
                <li>Venous bleeding (steady flow of dark red blood)</li>
                <li>Arterial bleeding (bright red blood, pulsing)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {woundSteps.map((step) => (
            <Card key={step.step}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    {React.createElement(step.icon, { className: "h-6 w-6 text-red-600" })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                        Step {step.step}
                      </span>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Important Notes</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Always wear protective gloves if available</li>
              <li>Do not remove embedded objects</li>
              <li>Keep the person warm to prevent shock</li>
              <li>Monitor for signs of infection</li>
              <li>Seek medical attention for deep wounds</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 