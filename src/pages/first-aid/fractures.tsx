import React from 'react'
import { ArrowLeft, Bone, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fractureSteps = [
  {
    step: 1,
    title: "Ensure Safety",
    description: "Check the scene for hazards and ensure the person is in a safe position.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Check for Emergency",
    description: "Look for signs of severe bleeding, open fractures, or loss of circulation.",
    icon: AlertCircle
  },
  {
    step: 3,
    title: "Immobilize the Injury",
    description: "Support the injured area in the position found. Do not try to straighten or realign.",
    icon: Bone
  },
  {
    step: 4,
    title: "Apply Cold Pack",
    description: "Apply ice or cold pack wrapped in cloth to reduce swelling and pain.",
    icon: Bone
  },
  {
    step: 5,
    title: "Elevate if Possible",
    description: "Raise the injured area above the heart to reduce swelling.",
    icon: Bone
  },
  {
    step: 6,
    title: "Seek Medical Help",
    description: "Call emergency services for severe injuries or if you suspect a fracture.",
    icon: AlertCircle
  }
]

export function FracturesPage() {
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
        <h1 className="text-lg font-semibold">Fractures & Sprains</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              For severe fractures, open fractures, or suspected spinal injuries, call 911 immediately. 
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
            <h2 className="text-xl font-bold mb-4">Fracture & Sprain Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Proper handling of fractures and sprains is crucial to prevent further injury 
              and promote proper healing.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Signs of a Fracture</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Severe pain and swelling</li>
                <li>Deformity or abnormal positioning</li>
                <li>Bruising or discoloration</li>
                <li>Inability to move the area</li>
                <li>Bone protruding through skin (open fracture)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {fractureSteps.map((step) => (
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
              <li>Do not try to straighten or realign the injury</li>
              <li>Keep the person warm to prevent shock</li>
              <li>Monitor for signs of circulation loss</li>
              <li>Seek medical attention for all suspected fractures</li>
              <li>Do not give food or drink in case surgery is needed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 