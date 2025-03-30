import React from 'react'
import { ArrowLeft, Flame, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const burnSteps = [
  {
    step: 1,
    title: "Ensure Safety",
    description: "Remove the person from the source of the burn. Remove any smoldering clothing unless stuck to the skin.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Cool the Burn",
    description: "Run cool (not cold) water over the burn for 10-20 minutes. Do not use ice or very cold water.",
    icon: Flame
  },
  {
    step: 3,
    title: "Remove Constrictive Items",
    description: "Remove jewelry or tight items from affected areas before swelling occurs.",
    icon: AlertCircle
  },
  {
    step: 4,
    title: "Cover the Burn",
    description: "Cover with sterile, non-stick gauze or clean cloth. Do not break blisters.",
    icon: Flame
  },
  {
    step: 5,
    title: "Keep Warm",
    description: "Keep the person warm to prevent hypothermia, especially for large burns.",
    icon: Flame
  },
  {
    step: 6,
    title: "Seek Medical Help",
    description: "Call emergency services for severe burns or if the person shows signs of shock.",
    icon: AlertCircle
  }
]

export function BurnsPage() {
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
        <h1 className="text-lg font-semibold">Burns & Scalds</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              For severe burns, chemical burns, or electrical burns, call 911 immediately. 
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
            <h2 className="text-xl font-bold mb-4">Burn Treatment Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Proper burn care is crucial to prevent infection and promote healing. 
              Different types of burns require different approaches.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Types of Burns</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>First-degree (superficial) - Red, painful, dry</li>
                <li>Second-degree (partial thickness) - Blisters, severe pain</li>
                <li>Third-degree (full thickness) - White or blackened, charred</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {burnSteps.map((step) => (
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
              <li>Never apply ice directly to burns</li>
              <li>Do not use cotton balls or fluffy materials</li>
              <li>Keep the person warm to prevent shock</li>
              <li>Monitor for signs of infection</li>
              <li>Seek medical attention for large or severe burns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 