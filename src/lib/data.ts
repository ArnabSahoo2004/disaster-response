import { 
  Droplets,
  Utensils,
  Home,
  Stethoscope,
  MessageCircle,
} from "lucide-react"

export const resourceTypes = [
  { name: "Water", icon: Droplets, color: "bg-blue-100 text-blue-600" },
  { name: "Food", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { name: "Shelter", icon: Home, color: "bg-green-100 text-green-600" },
  { name: "Medical", icon: Stethoscope, color: "bg-red-100 text-red-600" },
  { name: "Other", icon: MessageCircle, color: "bg-purple-100 text-purple-600" },
]

export const mockResources = [
  {
    id: '1',
    type: "Water",
    title: "Clean Water Available",
    description: "Bottled water and water purification tablets available",
    location: "Community Center, Downtown",
    distance: "0.5 miles",
    reportedBy: "John Doe",
    timeAgo: "2 hours ago",
    verifiedCount: 12,
    icon: Droplets,
    color: "bg-blue-100 text-blue-600",
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: '2',
    type: "Food",
    title: "Emergency Food Supplies",
    description: "Non-perishable food items and MREs available",
    location: "Red Cross Shelter, West Side",
    distance: "1.2 miles",
    reportedBy: "Sarah Smith",
    timeAgo: "4 hours ago",
    verifiedCount: 8,
    icon: Utensils,
    color: "bg-orange-100 text-orange-600",
    coordinates: { lat: 37.7739, lng: -122.4312 }
  },
  {
    id: '3',
    type: "Shelter",
    title: "Emergency Shelter",
    description: "Temporary shelter with basic amenities",
    location: "High School Gymnasium",
    distance: "0.8 miles",
    reportedBy: "Mike Johnson",
    timeAgo: "1 hour ago",
    verifiedCount: 15,
    icon: Home,
    color: "bg-green-100 text-green-600",
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  {
    id: '4',
    type: "Medical",
    title: "First Aid Supplies",
    description: "Basic medical supplies and first aid kits",
    location: "Local Clinic, North Area",
    distance: "1.5 miles",
    reportedBy: "Dr. Emily Brown",
    timeAgo: "3 hours ago",
    verifiedCount: 6,
    icon: Stethoscope,
    color: "bg-red-100 text-red-600",
    coordinates: { lat: 37.7858, lng: -122.4008 }
  }
] 