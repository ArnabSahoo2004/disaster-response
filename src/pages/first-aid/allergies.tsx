import React from 'react'
import { ArrowLeft, Bug, AlertCircle, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const allergySteps = [
  {
    step: 1,
    title: "Identify the Reaction",
    description: "Look for signs of allergic reaction: hives, swelling, difficulty breathing, or anaphylaxis.",
    icon: AlertCircle
  },
  {
    step: 2,
    title: "Check for Epinephrine",
    description: "If the person has an epinephrine auto-injector (EpiPen), help them use it immediately.",
    icon: Bug
  },
  {
    step: 3,
    title: "Call Emergency Services",
    description: "Call 911 immediately for severe reactions or if the person has trouble breathing.",
    icon: AlertCircle
  },
  {
    step: 4,
    title: "Position the Person",
    description: "Help them sit up if breathing is difficult, or lay them flat if they feel faint.",
    icon: Bug
  },
  {
    step: 5,
    title: "Remove Trigger",
    description: "If possible, remove the allergen (e.g., remove stinger, stop food ingestion).",
    icon: Bug
  },
  {
    step: 6,
    title: "Monitor Closely",
    description: "Watch for worsening symptoms and be ready to provide additional epinephrine if needed.",
    icon: AlertCircle
  }
]

export function AllergiesPage() {
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
        <h1 className="text-lg font-semibold">Allergic Reactions</h1>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
          <div className="flex-1">
            <h2 className="font-semibold text-red-800">Emergency Notice</h2>
            <p className="text-red-700 text-sm">
              For severe allergic reactions or anaphylaxis, call 911 immediately. 
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
            <h2 className="text-xl font-bold mb-4">Allergic Reaction Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Allergic reactions can range from mild to life-threatening. Quick action is crucial 
              for severe reactions.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Signs of Severe Reaction</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Difficulty breathing or wheezing</li>
                <li>Swelling of face, lips, or tongue</li>
                <li>Severe hives or rash</li>
                <li>Dizziness or fainting</li>
                <li>Nausea or vomiting</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {allergySteps.map((step) => (
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
              <li>Always carry prescribed epinephrine auto-injector</li>
              <li>Know your triggers and avoid them</li>
              <li>Wear medical alert jewelry</li>
              <li>Inform others about your allergies</li>
              <li>Seek medical attention after using epinephrine</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 