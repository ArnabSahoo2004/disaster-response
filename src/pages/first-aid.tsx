import React from 'react'
import { 
  HeartPulse, 
  Phone, 
  Search,
  AlertCircle,
  Thermometer,
  Pill,
  Heart,
  Bone,
  Flame,
  Droplets,
  Bug,
  Timer,
  Languages,
  Brain,
  Siren,
  Baby,
  Shield,
  Waves
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmergencySOS } from "@/components/emergency-sos"
import { useLanguage } from "@/lib/language-context"
import type { TranslationKey } from "@/lib/language-context"

interface QuickAction {
  title: TranslationKey
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  steps: TranslationKey[]
}

interface FirstAidGuide {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  href: string
}

interface EmergencyContact {
  name: TranslationKey
  number: string
  color: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const emergencyContacts: EmergencyContact[] = [
  { 
    name: "emergency_services" as TranslationKey, 
    number: "112", 
    color: "bg-red-100 text-red-600", 
    icon: Siren,
    description: "Single emergency number for all emergencies"
  },
  { 
    name: "ambulance" as TranslationKey, 
    number: "108", 
    color: "bg-purple-100 text-purple-600", 
    icon: HeartPulse,
    description: "Emergency medical services"
  },
  { 
    name: "women_helpline" as TranslationKey, 
    number: "181", 
    color: "bg-pink-100 text-pink-600", 
    icon: Shield,
    description: "Women's safety and support"
  },
  { 
    name: "fire_services" as TranslationKey, 
    number: "101", 
    color: "bg-orange-100 text-orange-600", 
    icon: Flame,
    description: "Fire and rescue services"
  },
  { 
    name: "child_helpline" as TranslationKey, 
    number: "1098", 
    color: "bg-blue-100 text-blue-600", 
    icon: Baby,
    description: "Child protection services"
  },
  { 
    name: "police" as TranslationKey, 
    number: "100", 
    color: "bg-indigo-100 text-indigo-600", 
    icon: Shield,
    description: "Police control room"
  },
  { 
    name: "osdma" as TranslationKey, 
    number: "0674-2395398", 
    color: "bg-yellow-100 text-yellow-600", 
    icon: AlertCircle,
    description: "Odisha State Disaster Management Authority"
  },
  { 
    name: "cyclone_helpline" as TranslationKey, 
    number: "0674-2395399", 
    color: "bg-cyan-100 text-cyan-600", 
    icon: AlertCircle,
    description: "Cyclone emergency helpline"
  },
  { 
    name: "flood_helpline" as TranslationKey, 
    number: "0674-2395400", 
    color: "bg-blue-100 text-blue-600", 
    icon: AlertCircle,
    description: "Flood emergency helpline"
  },
  { 
    name: "heatwave_helpline" as TranslationKey, 
    number: "0674-2395401", 
    color: "bg-orange-100 text-orange-600", 
    icon: AlertCircle,
    description: "Heatwave emergency helpline"
  }
]

const quickActions: QuickAction[] = [
  {
    title: 'heart_attack' as TranslationKey,
    icon: Heart,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    steps: ['call_emergency', 'keep_calm', 'check_breathing', 'start_cpr'] as TranslationKey[]
  },
  {
    title: "stroke",
    icon: Brain,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    steps: ["call_emergency", "keep_calm", "check_breathing", "do_not_panic"] as TranslationKey[]
  },
  {
    title: "severe_bleeding",
    icon: Droplets,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    steps: ["apply_pressure", "elevate_wound", "call_emergency", "seek_medical"] as TranslationKey[]
  },
  {
    title: "snake_bite",
    icon: Bug,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    steps: ["keep_calm", "call_emergency", "do_not_panic", "seek_medical"] as TranslationKey[]
  },
  {
    title: "drowning",
    icon: Waves,
    color: "bg-cyan-500",
    bgColor: "bg-cyan-50",
    steps: ["call_emergency", "check_breathing", "start_cpr", "seek_medical"] as TranslationKey[]
  },
]

const firstAidGuides: FirstAidGuide[] = [
  {
    title: "CPR & Choking",
    description: "Learn basic life support procedures",
    icon: HeartPulse,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    href: "/first-aid/cpr"
  },
  {
    title: "Bleeding & Wounds",
    description: "Wound care and bleeding control",
    icon: Droplets,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    href: "/first-aid/wounds"
  },
  {
    title: "Burns & Scalds",
    description: "Treatment for different burn types",
    icon: Flame,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    href: "/first-aid/burns"
  },
  {
    title: "Fractures & Sprains",
    description: "Bone and joint injury care",
    icon: Bone,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    href: "/first-aid/fractures"
  },
  {
    title: "Allergic Reactions",
    description: "Managing severe allergies",
    icon: Bug,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    href: "/first-aid/allergies"
  },
  {
    title: "Heat & Cold",
    description: "Temperature-related emergencies",
    icon: Thermometer,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    href: "/first-aid/temperature"
  },
]

export function FirstAidPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-background pb-12">
      <EmergencySOS />
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">{t("emergency_call")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setLanguage(language === 'en' ? 'or' : 'en')}
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === 'en' ? 'ଓଡ଼ିଆ' : 'English'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => window.location.href = 'tel:112'}
            >
              {t("call_now")}
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <HeartPulse className="h-8 w-8 text-red-600" />
              {t("emergency_services")}
            </h1>
            <p className="text-gray-600">{t("quick_actions")}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Search procedures..." 
                className="pl-9 w-[250px]"
              />
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contacts
            </Button>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {emergencyContacts.map((contact) => (
            <Card 
              key={contact.name} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = `tel:${contact.number}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${contact.color}`}>
                    {React.createElement(contact.icon, { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <p className="font-medium">{t(contact.name)}</p>
                    <p className="text-lg font-bold">{contact.number}</p>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">{t("quick_actions")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Card 
                key={action.title}
                className={`${action.bgColor} border-none hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${action.color} p-3 rounded-xl text-white`}>
                      {React.createElement(action.icon, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t(action.title)}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Timer className="h-4 w-4 mr-1" />
                        {t("quick_actions")}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {action.steps.map((step, index) => (
                      <div key={step} className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-gray-500">{index + 1}.</span>
                        <span>{t(step)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* First Aid Guides Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">First Aid Procedures</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstAidGuides.map((guide) => (
              <Link 
                key={guide.title} 
                to={guide.href}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`${guide.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(guide.icon, { className: "h-6 w-6" })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
                        <p className="text-gray-600 text-sm">{guide.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-yellow-800">{t("important_notice")}</h3>
                <p className="text-yellow-800">
                  {t("medical_disclaimer")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 