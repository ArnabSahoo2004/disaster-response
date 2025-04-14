import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import type { TranslationKey } from '@/lib/language-context'
import { LanguageToggle } from './language-toggle'

interface PageHeaderProps {
  title: TranslationKey
  description?: TranslationKey
  icon?: LucideIcon
  iconColor?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  className,
  children
}: PageHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8', className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={cn('mt-1', iconColor)}>
            <Icon className="h-8 w-8" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold mb-1">{t(title)}</h1>
          {description && (
            <p className="text-muted-foreground">{t(description)}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle variant="outline" />
        {children}
      </div>
    </div>
  )
} 