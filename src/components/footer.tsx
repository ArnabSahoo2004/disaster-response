import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  AlertCircle,
  Heart 
} from 'lucide-react'

const footerLinks = {
  quickLinks: [
    { name: "Emergency Services", href: "/emergency" },
    { name: "Safety Guidelines", href: "/safety" },
    { name: "Resource Centers", href: "/resources" },
    { name: "Community Support", href: "/community" },
    { name: "Report Incident", href: "/report" },
  ],
  resources: [
    { name: "First Aid Guide", href: "/first-aid" },
    { name: "Evacuation Plans", href: "/evacuation" },
    { name: "Training & Workshops", href: "/training" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Donate", href: "/donate" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "About Us", href: "/about" },
  ]
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">DisasterResponse</span>
            </div>
            <p className="text-gray-600">
              Empowering communities with real-time emergency response and disaster management solutions.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>Emergency: 911</span>
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>help@disasterresponse.org</span>
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>National Emergency Center</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="py-6 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> by DisasterResponse Team © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 