import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BottomNav } from "./components/navigation/bottom-nav"
import { LanguageProvider } from "@/lib/language-context"

// Import pages directly
import { HomePage } from "@/pages/home"
import { ProfilePage } from "@/pages/profile"
import { MapPage } from "@/pages/map"
import { ResourcesPage } from "@/pages/resources"
import { CommunityPage } from "@/pages/community"
import { FirstAidPage } from "@/pages/first-aid"
import { SafeRoutesPage } from "@/pages/safe-routes"

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/first-aid" element={<FirstAidPage />} />
            <Route path="/safe-routes" element={<SafeRoutesPage />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App 