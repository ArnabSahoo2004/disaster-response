import React from 'react'
import { 
  Phone, 
  Globe, 
  MapPin, 
  Search,
  Filter,
  MessageCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmergencySOS } from "@/components/emergency-sos"
import { ReportResourceModal } from "@/components/report-resource-modal"
import { resourceTypes, mockResources } from "@/lib/data"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/lib/language-context"
import type { TranslationKey } from "@/lib/language-context"

export function ResourcesPage() {
  const [resources, setResources] = React.useState(mockResources)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedType, setSelectedType] = React.useState<TranslationKey | null>(null)
  const { t } = useLanguage()

  // Filter resources based on search query and selected type
  const filteredResources = React.useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === "" || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === null || resource.type === selectedType

      return matchesSearch && matchesType
    })
  }, [resources, searchQuery, selectedType])

  // Handle resource type selection
  const handleTypeSelect = (type: TranslationKey) => {
    setSelectedType(selectedType === type ? null : type)
  }

  // Handle new resource submission
  const handleResourceSubmit = (data: {
    type: TranslationKey;
    title: string;
    description: string;
    location: string;
  }) => {
    const resourceType = resourceTypes.find(t => t.name === data.type)
    if (!resourceType) return

    const newResource = {
      id: String(resources.length + 1),
      ...data,
      distance: "Calculating...",
      reportedBy: "You",
      timeAgo: "Just now",
      verifiedCount: 0,
      icon: resourceType.icon,
      color: resourceType.color,
      coordinates: { lat: 0, lng: 0 } // Would be set by geolocation in production
    }

    setResources(prev => [newResource, ...prev])
  }

  // Handle get directions
  const handleGetDirections = (resource: typeof resources[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.location)}`
    window.open(url, '_blank')
  }

  // Handle resource verification
  const handleVerify = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, verifiedCount: resource.verifiedCount + 1 }
        : resource
    ))
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <EmergencySOS />
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Emergency? Call 911 Immediately</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => window.location.href = 'tel:911'}
          >
            Call Now
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        <PageHeader
          title="available_resources"
          description="resource_types"
          icon={Globe}
          iconColor="text-blue-600"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder={t('search_placeholder')}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => {
                setSearchQuery("")
                setSelectedType(null)
              }}
            >
              <Filter className="h-4 w-4" />
              {t('clear_filters')}
            </Button>
            <ReportResourceModal onSubmit={handleResourceSubmit} />
          </div>
        </PageHeader>

        {/* Resource Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('resource_types')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {resourceTypes.map((type) => (
              <Button
                key={type.name}
                variant={selectedType === type.name ? "default" : "outline"}
                className={`flex flex-col items-center gap-2 h-auto py-4 ${
                  selectedType === type.name ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => handleTypeSelect(type.name)}
              >
                <div className={`p-2 rounded-lg ${
                  selectedType === type.name ? "bg-white/20" : type.color
                }`}>
                  {React.createElement(type.icon, { 
                    className: `h-6 w-6 ${selectedType === type.name ? "text-white" : ""}`
                  })}
                </div>
                <span>{t(type.name)}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Available Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {t('available_resources')}
            {filteredResources.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredResources.length} {t('found')})
              </span>
            )}
          </h2>
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>{t('no_resources_found')}</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType(null)
                }}
              >
                {t('clear_filters')}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((resource) => (
                <Card 
                  key={resource.id} 
                  id={`resource-${resource.id}`}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${resource.color}`}>
                        {React.createElement(resource.icon, { className: "h-6 w-6" })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <span className="text-sm text-gray-500">{resource.timeAgo}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {resource.location}
                          </span>
                          <span className="text-gray-600">{resource.distance}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 font-medium p-0 h-auto hover:text-green-700"
                            onClick={() => handleVerify(resource.id)}
                          >
                            ✅ {t('verified_by')} {resource.verifiedCount} {t('people')}
                          </Button>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              // In a real app, this would open a chat or contact form
                              alert(`Contact provider at ${resource.location}`)
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {t('contact_provider')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleGetDirections(resource)}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            {t('get_directions')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 