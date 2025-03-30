import React from 'react'
import { ArrowLeft, Thermometer, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const temperatureSteps = [
  {
    step: 1,
    title: "Identify the Condition",
    description: "Check for signs of heat exhaustion, heat stroke, hypothermia, or frostbite.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Move to Appropriate Environment",
    description: "Move to a cool, shaded area for heat-related issues or warm, dry area for cold-related issues.",
    icon: Thermometer
  },
  {
    step: 3,
    title: "Remove Excess Clothing",
    description: "Remove heavy or wet clothing to help regulate body temperature.",
    icon: Thermometer
  },
  {
    step: 4,
    title: "Provide Appropriate Care",
    description: "For heat issues: cool with water, fan, or cool compresses. For cold issues: warm gradually with blankets.",
    icon: Thermometer
  },
  {
    step: 5,
    title: "Hydrate if Conscious",
    description: "Provide water for heat issues or warm fluids for cold issues if the person is conscious.",
    icon: Thermometer
  },
  {
    step: 6,
    title: "Seek Medical Help",
    description: "Call emergency services for severe cases or if symptoms worsen.",
    icon: AlertCircle
  }
]

export function TemperaturePage() {
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
        <h1 className="text-lg font-semibold">Heat & Cold Emergencies</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              For severe heat stroke, hypothermia, or frostbite, call 911 immediately. 
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
            <h2 className="text-xl font-bold mb-4">Temperature Emergency Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Extreme temperatures can cause serious health issues. Quick action is essential 
              to prevent complications.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Warning Signs</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Heat stroke: High body temperature, confusion, loss of consciousness</li>
                <li>Heat exhaustion: Heavy sweating, weakness, nausea</li>
                <li>Hypothermia: Shivering, confusion, slow breathing</li>
                <li>Frostbite: Numbness, white or grayish-yellow skin</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {temperatureSteps.map((step) => (
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
              <li>Never give fluids to unconscious people</li>
              <li>Warm or cool gradually to prevent shock</li>
              <li>Monitor breathing and consciousness</li>
              <li>Seek medical attention for severe cases</li>
              <li>Prevent further exposure to extreme temperatures</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 