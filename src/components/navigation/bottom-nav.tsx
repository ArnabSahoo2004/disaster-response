import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Map, Heart, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage, type TranslationKey } from '@/lib/language-context'

type NavItem = {
  name: TranslationKey
  icon: React.FC<{ className?: string }>
  href: string
}

const navItems: NavItem[] = [
  { name: 'home', icon: Home, href: '/' },
  { name: 'map', icon: Map, href: '/map' },
  { name: 'first_aid', icon: Heart, href: '/first-aid' },
  { name: 'community', icon: Users, href: '/community' },
  { name: 'profile', icon: User, href: '/profile' },
]

export function BottomNav() {
  const location = useLocation()
  const { t } = useLanguage()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="max-w-md mx-auto px-6">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 px-2 text-sm transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {React.createElement(item.icon, {
                  className: cn('h-5 w-5', isActive && 'animate-bounce-subtle'),
                })}
                <span>{t(item.name)}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 