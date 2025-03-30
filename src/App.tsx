import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home"
import { MapPage } from "./pages/map"
import { AlertsPage } from "./pages/alerts"
import { ProfilePage } from "./pages/profile"
import { FirstAidPage } from "./pages/first-aid"
import { CPRPage } from "./pages/first-aid/cpr"
import { WoundsPage } from "./pages/first-aid/wounds"
import { BurnsPage } from "./pages/first-aid/burns"
import { FracturesPage } from "./pages/first-aid/fractures"
import { AllergiesPage } from "./pages/first-aid/allergies"
import { TemperaturePage } from "./pages/first-aid/temperature"
import { BottomNav } from "./components/navigation/bottom-nav"
import { ResourcesPage } from "@/pages/resources"
import { CommunityPage } from "@/pages/community"

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/first-aid" element={<FirstAidPage />} />
          <Route path="/first-aid/cpr" element={<CPRPage />} />
          <Route path="/first-aid/wounds" element={<WoundsPage />} />
          <Route path="/first-aid/burns" element={<BurnsPage />} />
          <Route path="/first-aid/fractures" element={<FracturesPage />} />
          <Route path="/first-aid/allergies" element={<AllergiesPage />} />
          <Route path="/first-aid/temperature" element={<TemperaturePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App 