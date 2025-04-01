import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BottomNav } from "./components/navigation/bottom-nav"

// Import pages directly
import { HomePage } from "@/pages/home"
import { ProfilePage } from "@/pages/profile"
import { MapPage } from "@/pages/map"
import { ResourcesPage } from "@/pages/resources"
import { CommunityPage } from "@/pages/community"

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App 