import React from 'react'
import { ArrowLeft, HeartPulse, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const cprSteps = [
  {
    step: 1,
    title: "Check the Scene",
    description: "Ensure the area is safe for both you and the victim. Look for any hazards.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Check Responsiveness",
    description: "Gently tap the person's shoulder and shout 'Are you okay?'",
    icon: HeartPulse
  },
  {
    step: 3,
    title: "Call Emergency Services",
    description: "If unresponsive, call 911 immediately or ask someone to call.",
    icon: AlertCircle
  },
  {
    step: 4,
    title: "Check Breathing",
    description: "Look, listen, and feel for breathing for no more than 10 seconds.",
    icon: HeartPulse
  },
  {
    step: 5,
    title: "Begin Chest Compressions",
    description: "Place hands in center of chest, push hard and fast (100-120 compressions per minute).",
    icon: HeartPulse
  },
  {
    step: 6,
    title: "Give Rescue Breaths",
    description: "Tilt head back, lift chin, give 2 breaths (1 second each).",
    icon: HeartPulse
  },
  {
    step: 7,
    title: "Continue CPR",
    description: "Alternate between 30 compressions and 2 breaths until help arrives.",
    icon: HeartPulse
  }
]

export function CPRPage() {
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
        <h1 className="text-lg font-semibold">CPR & Choking</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              If you are not trained in CPR, emergency dispatchers can guide you through the process. 
              Call 911 immediately for assistance.
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
            <h2 className="text-xl font-bold mb-4">CPR Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Cardiopulmonary resuscitation (CPR) is a lifesaving technique that can help keep blood flowing 
              to the brain and other vital organs when someone's heart stops beating.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">When to Perform CPR</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Person is unresponsive</li>
                <li>Not breathing normally</li>
                <li>No pulse or signs of life</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {cprSteps.map((step) => (
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
              <li>CPR should be started as soon as possible</li>
              <li>Continue until emergency medical services arrive</li>
              <li>If you're not trained, focus on chest compressions only</li>
              <li>Take turns with another person if available</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 