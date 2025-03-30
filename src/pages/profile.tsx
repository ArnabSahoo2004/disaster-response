import React from 'react'
import { ArrowLeft, User, MapPin, Phone, Mail, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">San Francisco, CA</p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-gray-500">+1 (555) 987-6543</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 