import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'or' // en for English, or for Odia

type NestedTranslationKey = {
  [K in keyof typeof translations.en]: typeof translations.en[K] extends string
    ? K
    : `${K}.${Extract<keyof typeof translations.en[K], string>}`
}[keyof typeof translations.en]

export type TranslationKey = NestedTranslationKey

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

export const translations = {
  en: {
    // Navigation
    home: "Home",
    resources: "Resources",
    first_aid: "First Aid",
    community: "Community",
    profile: "Profile",
    map: "Map",
    alerts: "Alerts",
    
    // Common UI Elements
    search: "Search",
    search_placeholder: "Search...",
    view_all: "View All",
    learn_more: "Learn More",
    get_directions: "Get Directions",
    share_location: "Share Location",
    call_now: "Call Now",
    view_map: "View Map",
    report_issue: "Report Issue",
    submit: "Submit",
    cancel: "Cancel",
    
    // Emergency Contacts
    emergency_services: "Emergency Services",
    ambulance: "Ambulance",
    women_helpline: "Women Helpline",
    fire_services: "Fire Services",
    child_helpline: "Child Helpline",
    police: "Police Control Room",
    osdma: "OSDMA",
    cyclone_helpline: "Cyclone Helpline",
    flood_helpline: "Flood Helpline",
    heatwave_helpline: "Heatwave Helpline",
    emergency_call: "Emergency? Call 112 Immediately",
    
    // Resources Page
    available_resources: "Available Resources",
    resource_types: "Resource Types",
    report_resource: "Report Resource",
    report_resource_description: "Report a new resource that can help others in need.",
    resource_type: "Resource Type",
    select_type: "Select type",
    title: "Title",
    description: "Description",
    location: "Location",
    resource_title_placeholder: "Enter resource title",
    resource_description_placeholder: "Enter resource description",
    resource_location_placeholder: "Enter location",
    clear_filters: "Clear Filters",
    found: "found",
    no_resources_found: "No resources found matching your criteria.",
    people: "people",
    verified_by: "Verified by",
    contact_provider: "Contact Provider",
    
    // Resource Types
    food: "Food",
    water: "Water",
    shelter: "Shelter",
    medical: "Medical",
    supplies: "Supplies",
    transport: "Transport",
    clothing: "Clothing",
    communication: "Communication",
    other: "Other",
    
    // Community Page
    community_help: "Community Help",
    request_help: "Request Help",
    offer_help: "Offer Help",
    recent_requests: "Recent Requests",
    recent_offers: "Recent Offers",
    volunteers: "Volunteers",
    join_community: "Join Community",
    
    // Profile Page
    my_profile: "My Profile",
    emergency_contacts: "Emergency Contacts",
    medical_info: "Medical Information",
    blood_group: "Blood Group",
    allergies: "Allergies",
    medications: "Medications",
    edit_profile: "Edit Profile",
    save_changes: "Save Changes",
    
    // Map Page
    nearby_resources: "Nearby Resources",
    safe_zones: "Safe Zones",
    danger_zones: "Danger Zones",
    evacuation_routes: "Evacuation Routes",
    current_location: "Current Location",
    
    // Alerts Page
    active_alerts: "Active Alerts",
    weather_alerts: "Weather Alerts",
    disaster_alerts: "Disaster Alerts",
    safety_tips: "Safety Tips",
    notification_settings: "Notification Settings",
    
    // Quick Actions
    quick_actions: "Quick Emergency Actions",
    heart_attack: "Heart Attack",
    stroke: "Stroke",
    severe_bleeding: "Severe Bleeding",
    choking: "Choking",
    burns: "Burns",
    snake_bite: "Snake Bite",
    drowning: "Drowning",
    
    // Actions Steps
    call_emergency: "Call Emergency Services",
    keep_calm: "Keep Calm",
    check_breathing: "Check Breathing",
    start_cpr: "Start CPR if needed",
    apply_pressure: "Apply Direct Pressure",
    elevate_wound: "Elevate the Wound",
    do_not_panic: "Do Not Panic",
    seek_medical: "Seek Medical Help",

    // Other
    important_notice: "Important Notice",
    medical_disclaimer: "This guide is not a substitute for professional medical care. In case of serious injury or medical emergency, always call emergency services immediately. These guidelines are for basic first aid only.",
    change_language: "Change Language",
    loading: "Loading...",
    error_occurred: "An error occurred",
    try_again: "Try Again",
    last_updated: "Last Updated",

    // Disaster Types
    cyclone: "Cyclone",
    flood: "Flood",
    heatwave: "Heatwave",
    lightning: "Lightning",
    drought: "Drought",

    // Disaster Preparedness
    cyclone_preparedness: "Cyclone Preparedness",
    flood_preparedness: "Flood Preparedness",
    heatwave_preparedness: "Heatwave Preparedness",
    evacuation_centers: "Evacuation Centers",
    cyclone_shelters: "Cyclone Shelters",
    relief_centers: "Relief Centers",

    cyclone_tracker: {
      title: "Cyclone Tracker",
      warning: "Warning",
      watch: "Watch",
      active: "Active",
      wind_speed: "Wind Speed",
      landfall: "Landfall in",
      location: "Location",
      category: "Category",
      affected_districts: "Affected Districts",
      safety_instructions: "Safety Instructions",
      safety_tips: [
        "Stay updated with official weather bulletins",
        "Prepare emergency kit with essential supplies",
        "Identify nearest cyclone shelter",
        "Secure loose objects and reinforce windows",
        "Follow evacuation orders if issued"
      ],
      find_shelters: "Find Shelters",
      evacuation_routes: "Evacuation Routes",
      show_more: "Show More",
      show_less: "Show Less"
    }
  },
  or: {
    // Navigation
    home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    resources: "ସମ୍ବଳ",
    first_aid: "ପ୍ରାଥମିକ ଚିକିତ୍ସା",
    community: "ସମୁଦାୟ",
    profile: "ପ୍ରୋଫାଇଲ୍",
    map: "ମାନଚିତ୍ର",
    alerts: "ସତର୍କତା",
    
    // Common UI Elements
    search: "ସନ୍ଧାନ",
    search_placeholder: "ସନ୍ଧାନ କରନ୍ତୁ...",
    view_all: "ସବୁ ଦେଖନ୍ତୁ",
    learn_more: "ଅଧିକ ଜାଣନ୍ତୁ",
    get_directions: "ଦିଗନିର୍ଦ୍ଦେଶ ପାଆନ୍ତୁ",
    share_location: "ଅବସ୍ଥାନ ସେୟାର୍ କରନ୍ତୁ",
    call_now: "ବର୍ତ୍ତମାନ କଲ୍ କରନ୍ତୁ",
    view_map: "ମାନଚିତ୍ର ଦେଖନ୍ତୁ",
    report_issue: "ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ",
    submit: "ଦାଖଲ କରନ୍ତୁ",
    cancel: "ବାତିଲ୍",
    
    // Emergency Contacts
    emergency_services: "ଜରୁରୀକାଳୀନ ସେବା",
    ambulance: "ଆମ୍ବୁଲାନ୍ସ",
    women_helpline: "ମହିଳା ହେଲ୍ପଲାଇନ୍",
    fire_services: "ଅଗ୍ନିଶମ ସେବା",
    child_helpline: "ଶିଶୁ ହେଲ୍ପଲାଇନ୍",
    police: "ପୋଲିସ କଣ୍ଟ୍ରୋଲ ରୁମ୍",
    osdma: "ଓଡ଼ିଶା ବିପଦ ପରିଚାଳନା ପ୍ରାଧିକରଣ",
    cyclone_helpline: "ବାତ୍ୟା ହେଲ୍ପଲାଇନ",
    flood_helpline: "ବନ୍ୟା ହେଲ୍ପଲାଇନ",
    heatwave_helpline: "ତାପତରଙ୍ଗ ହେଲ୍ପଲାଇନ",
    emergency_call: "ଜରୁରୀକାଳୀନ? ୧୧୨ କୁ କଲ୍ କରନ୍ତୁ",
    
    // Resources Page
    available_resources: "ଉପଲବ୍ଧ ସମ୍ବଳ",
    resource_types: "ସମ୍ବଳ ପ୍ରକାର",
    report_resource: "ସମ୍ବଳ ରିପୋର୍ଟ",
    report_resource_description: "ଅନ୍ୟମାନଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବା ଏକ ନୂତନ ସମ୍ବଳ ରିପୋର୍ଟ କରନ୍ତୁ।",
    resource_type: "ସମ୍ବଳ ପ୍ରକାର",
    select_type: "ପ୍ରକାର ଚୟନ କରନ୍ତୁ",
    title: "ଶୀର୍ଷକ",
    description: "ବର୍ଣ୍ଣନା",
    location: "ଅବସ୍ଥାନ",
    resource_title_placeholder: "ସମ୍ବଳ ଶୀର୍ଷକ ଲେଖନ୍ତୁ",
    resource_description_placeholder: "ସମ୍ବଳ ବର୍ଣ୍ଣନା ଲେଖନ୍ତୁ",
    resource_location_placeholder: "ଅବସ୍ଥାନ ଲେଖନ୍ତୁ",
    clear_filters: "ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ",
    found: "ମିଳିଛି",
    no_resources_found: "ଆପଣଙ୍କ ମାନଦଣ୍ଡ ସହିତ ମେଳ ଖାଉଥିବା କୌଣସି ସମ୍ବଳ ମିଳିଲା ନାହିଁ।",
    people: "ଲୋକ",
    verified_by: "ଦ୍ୱାରା ଯାଞ୍ଚ",
    contact_provider: "ପ୍ରଦାନକାରୀଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ",
    
    // Resource Types
    food: "ଖାଦ୍ୟ",
    water: "ପାଣି",
    shelter: "ଆଶ୍ରୟ",
    medical: "ଚିକିତ୍ସା",
    supplies: "ସରବରାହ",
    transport: "ପରିବହନ",
    clothing: "ପୋଷାକ",
    communication: "ଯୋଗାଯୋଗ",
    other: "ଅନ୍ୟାନ୍ୟ",
    
    // Community Page
    community_help: "ସାମୁଦାୟିକ ସହାୟତା",
    request_help: "ସହାୟତା ଅନୁରୋଧ",
    offer_help: "ସହାୟତା ପ୍ରଦାନ",
    recent_requests: "ସାମ୍ପ୍ରତିକ ଅନୁରୋଧ",
    recent_offers: "ସାମ୍ପ୍ରତିକ ପ୍ରସ୍ତାବ",
    volunteers: "ସ୍ୱେଚ୍ଛାସେବୀ",
    join_community: "ସମୁଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ",
    
    // Profile Page
    my_profile: "ମୋ ପ୍ରୋଫାଇଲ୍",
    emergency_contacts: "ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ",
    medical_info: "ଚିକିତ୍ସା ସୂଚନା",
    blood_group: "ରକ୍ତ ଗୋଷ୍ଠୀ",
    allergies: "ଏଲର୍ଜି",
    medications: "ଔଷଧ",
    edit_profile: "ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନା",
    save_changes: "ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ",
    
    // Map Page
    nearby_resources: "ନିକଟସ୍ଥ ସମ୍ବଳ",
    safe_zones: "ସୁରକ୍ଷିତ ଅଞ୍ଚଳ",
    danger_zones: "ବିପଦ ଅଞ୍ଚଳ",
    evacuation_routes: "ଉଦ୍ଧାର ମାର୍ଗ",
    current_location: "ବର୍ତ୍ତମାନ ଅବସ୍ଥାନ",
    
    // Alerts Page
    active_alerts: "ସକ୍ରିୟ ସତର୍କତା",
    weather_alerts: "ପାଣିପାଗ ସତର୍କତା",
    disaster_alerts: "ବିପର୍ଯ୍ୟୟ ସତର୍କତା",
    safety_tips: "ସୁରକ୍ଷା ପରାମର୍ଶ",
    notification_settings: "ବିଜ୍ଞପ୍ତି ସେଟିଂସ୍",
    
    // Quick Actions
    quick_actions: "ତୁରନ୍ତ ଜରୁରୀକାଳୀନ କାର୍ଯ୍ୟ",
    heart_attack: "ହୃଦଘାତ",
    stroke: "ପକ୍ଷାଘାତ",
    severe_bleeding: "ଗୁରୁତର ରକ୍ତସ୍ରାବ",
    choking: "ଶ୍ୱାସରୋଧ",
    burns: "ଜଳିବା",
    snake_bite: "ସାପ କାମୁଡ଼ିବା",
    drowning: "ବୁଡ଼ିଯିବା",
    
    // Actions Steps
    call_emergency: "ଜରୁରୀକାଳୀନ ସେବାକୁ କଲ୍ କରନ୍ତୁ",
    keep_calm: "ଶାନ୍ତ ରୁହନ୍ତୁ",
    check_breathing: "ନିଶ୍ୱାସ ଯାଞ୍ଚ କରନ୍ତୁ",
    start_cpr: "ଯଦି ଆବଶ୍ୟକ CPR ଆରମ୍ଭ କରନ୍ତୁ",
    apply_pressure: "ସିଧାସଳଖ ଚାପ ପ୍ରୟୋଗ କରନ୍ତୁ",
    elevate_wound: "କ୍ଷତକୁ ଉପରକୁ ଉଠାନ୍ତୁ",
    do_not_panic: "ଆତଙ୍କିତ ହୁଅନ୍ତୁ ନାହିଁ",
    seek_medical: "ଡାକ୍ତରୀ ସହାୟତା ନିଅନ୍ତୁ",

    // Other
    important_notice: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୂଚନା",
    medical_disclaimer: "ଏହି ନିର୍ଦ୍ଦେଶିକା ପେସାଦାର ଡାକ୍ତରୀ ଯତ୍ନର ବିକଳ୍ପ ନୁହେଁ। ଗୁରୁତର ଆଘାତ କିମ୍ବା ଡାକ୍ତରୀ ଜରୁରୀକାଳୀନ ସ୍ଥିତିରେ, ସର୍ବଦା ଜରୁରୀକାଳୀନ ସେବାକୁ ତୁରନ୍ତ କଲ୍ କରନ୍ତୁ। ଏହି ନିର୍ଦ୍ଦେଶାବଳୀ କେବଳ ମୌଳିକ ପ୍ରାଥମିକ ଚିକିତ୍ସା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ।",
    change_language: "ଭାଷା ପରିବର୍ତ୍ତନ",
    loading: "ଲୋଡ୍ ହେଉଛି...",
    error_occurred: "ଏକ ତ୍ରୁଟି ଘଟିଛି",
    try_again: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
    last_updated: "ଶେଷ ଅପଡେଟ୍",

    // Disaster Types
    cyclone: "ବାତ୍ୟା",
    flood: "ବନ୍ୟା",
    heatwave: "ତାପତରଙ୍ଗ",
    lightning: "ବିଜୁଳି",
    drought: "ଖରାଦିନ",

    // Disaster Preparedness
    cyclone_preparedness: "ବାତ୍ୟା ପ୍ରତିରୋଧ",
    flood_preparedness: "ବନ୍ୟା ପ୍ରତିରୋଧ",
    heatwave_preparedness: "ତାପତରଙ୍ଗ ପ୍ରତିରୋଧ",
    evacuation_centers: "ସ୍ଥାନାନ୍ତର କେନ୍ଦ୍ର",
    cyclone_shelters: "ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀ",
    relief_centers: "ତ୍ରାଣ କେନ୍ଦ୍ର",

    cyclone_tracker: {
      title: "ଚକ୍ରବାତ ଟ୍ରାକର",
      warning: "ସତର୍କତା",
      watch: "ନିରୀକ୍ଷଣ",
      active: "ସକ୍ରିୟ",
      wind_speed: "ପବନ ବେଗ",
      landfall: "ଭୂମି ସ୍ପର୍ଶ ହେବ",
      location: "ଅବସ୍ଥାନ",
      category: "ବର୍ଗ",
      affected_districts: "ପ୍ରଭାବିତ ଜିଲ୍ଲାଗୁଡ଼ିକ",
      safety_instructions: "ସୁରକ୍ଷା ନିର୍ଦ୍ଦେଶାବଳୀ",
      safety_tips: [
        "ସରକାରୀ ପାଣିପାଗ ବୁଲେଟିନ୍ ସହିତ ଅପଡେଟ୍ ରହନ୍ତୁ",
        "ଜରୁରୀକାଳୀନ ଯୋଗାଣ ସହିତ ଜରୁରୀକାଳୀନ କିଟ୍ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
        "ନିକଟତମ ଚକ୍ରବାତ ଆଶ୍ରୟସ୍ଥଳ ଚିହ୍ନଟ କରନ୍ତୁ",
        "ଢିଲା ଜିନିଷଗୁଡ଼ିକୁ ସୁରକ୍ଷିତ କରନ୍ତୁ ଏବଂ ୱିଣ୍ଡୋଗୁଡ଼ିକୁ ମଜବୁତ କରନ୍ତୁ",
        "ଯଦି ଜାରି କରାଯାଏ ତେବେ ସ୍ଥାନାନ୍ତର ଆଦେଶ ଅନୁସରଣ କରନ୍ତୁ"
      ],
      find_shelters: "ଆଶ୍ରୟସ୍ଥଳ ଖୋଜନ୍ତୁ",
      evacuation_routes: "ସ୍ଥାନାନ୍ତର ପଥ",
      show_more: "ଅଧିକ ଦେଖନ୍ତୁ",
      show_less: "କମ୍ ଦେଖନ୍ତୁ"
    }
  }
} as const

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: TranslationKey) => {
    const [mainKey, subKey] = key.split('.')
    if (subKey) {
      return (translations[language][mainKey as keyof typeof translations[Language]] as any)[subKey]
    }
    return translations[language][key as keyof typeof translations[Language]]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 