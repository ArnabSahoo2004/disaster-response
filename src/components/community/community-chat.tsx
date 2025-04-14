import React, { useState, useRef, useEffect } from 'react'
import { Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ChatMessage {
  id: string
  sender: {
    name: string
    avatar?: string
    role?: string
  }
  content: string
  timestamp: Date
}

// Initial messages for demonstration
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: {
      name: 'Dr. Sarah Chen',
      role: 'Medical Team',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    content: 'Medical supplies are available at Downtown Medical Center. Please only take what you need.',
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: '2',
    sender: {
      name: 'John Martinez',
      role: 'Rescue Team',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    content: 'Search and rescue operations are ongoing in the northern district. Please stay clear of marked areas.',
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  },
  {
    id: '3',
    sender: {
      name: 'Emily Wong',
      role: 'Community Volunteer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    content: 'We need more volunteers at the Community Center for food distribution.',
    timestamp: new Date(Date.now() - 900000) // 15 minutes ago
  }
]

export function CommunityChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: {
        name: 'You',
        role: 'Community Member',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
      },
      content: newMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate response (for demo purposes)
    setIsTyping(true)
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: {
          name: 'Response Team',
          role: 'Emergency Services',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Response'
        },
        content: getAutomaticResponse(newMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, responseMessage])
      setIsTyping(false)
    }, 2000)
  }

  // Simple automatic response generator
  const getAutomaticResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('help') || lowerMessage.includes('emergency')) {
      return 'If you have an emergency, please call 911 immediately. For non-emergency assistance, please visit the nearest help center or contact our support team.'
    }
    if (lowerMessage.includes('volunteer') || lowerMessage.includes('help out')) {
      return 'Thank you for offering to help! Please visit the Community Center or contact our volunteer coordinator for opportunities.'
    }
    if (lowerMessage.includes('supply') || lowerMessage.includes('supplies')) {
      return 'Supplies are being distributed at multiple locations. Check the map for the nearest distribution center.'
    }
    if (lowerMessage.includes('shelter') || lowerMessage.includes('safe')) {
      return 'Emergency shelters are open at the following locations: Community Center, High School Gymnasium, and Central Library.'
    }
    return 'Thank you for your message. A team member will respond shortly. For immediate assistance, please call our emergency hotline.'
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender.name === 'You' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar>
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col ${
                  message.sender.name === 'You' ? 'items-end' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">
                    {message.sender.name}
                  </span>
                  {message.sender.role && (
                    <Badge variant="secondary" className="text-xs">
                      {message.sender.role}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender.name === 'You'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Response" />
                <AvatarFallback>RT</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t bg-background flex gap-2 sticky bottom-0"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
} 