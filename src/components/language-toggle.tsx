import React from 'react'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

interface LanguageToggleProps {
  variant?: 'default' | 'outline'
  className?: string
}

export function LanguageToggle({ variant = 'default', className = '' }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Button 
      variant={variant}
      size="sm"
      className={className}
      onClick={() => setLanguage(language === 'en' ? 'or' : 'en')}
      title={t('change_language')}
    >
      <Languages className="h-4 w-4 mr-2" />
      {language === 'en' ? 'ଓଡ଼ିଆ' : 'English'}
    </Button>
  )
} 