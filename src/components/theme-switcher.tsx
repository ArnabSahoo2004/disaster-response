import React from 'react'
import { Cloud, Waves, Sun, CloudLightning } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type WeatherScenario = 'default' | 'flood' | 'heatwave' | 'cyclone'

interface ThemeSwitcherProps {
  currentScenario: WeatherScenario
  onScenarioChange: (scenario: WeatherScenario) => void
}

const scenarios = {
  default: {
    icon: Cloud,
    label: 'Default',
    color: 'bg-white',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-200',
    description: 'Normal conditions'
  },
  flood: {
    icon: Waves,
    label: 'Flood Alert',
    color: 'bg-blue-500',
    textColor: 'text-white',
    borderColor: 'border-blue-400',
    description: 'Heavy rainfall and flooding'
  },
  heatwave: {
    icon: Sun,
    label: 'Heatwave Warning',
    color: 'bg-yellow-500',
    textColor: 'text-white',
    borderColor: 'border-yellow-400',
    description: 'Extreme temperature alert'
  },
  cyclone: {
    icon: CloudLightning,
    label: 'Cyclone Warning',
    color: 'bg-red-500',
    textColor: 'text-white',
    borderColor: 'border-red-400',
    description: 'Severe cyclonic conditions'
  }
} as const

export function ThemeSwitcher({ currentScenario, onScenarioChange }: ThemeSwitcherProps) {
  const currentTheme = scenarios[currentScenario]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`
            ${currentTheme.color} 
            ${currentTheme.textColor} 
            ${currentTheme.borderColor}
            gap-2 transition-all duration-300
            hover:opacity-90 hover:scale-105
            relative overflow-hidden
            after:absolute after:inset-0 
            after:opacity-20 after:bg-gradient-to-r 
            after:from-transparent after:via-white after:to-transparent
            after:-translate-x-full hover:after:translate-x-full
            after:transition-transform after:duration-500
            shadow-lg
          `}
        >
          <div className="relative z-10 flex items-center gap-2">
            {React.createElement(currentTheme.icon, {
              className: "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
              strokeWidth: 2.5
            })}
            <span className="font-medium">{currentTheme.label}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-56 p-2 animate-in fade-in-0 zoom-in-95"
      >
        {(Object.entries(scenarios) as [WeatherScenario, typeof scenarios.default][]).map(([key, scenario]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onScenarioChange(key)}
            className={`
              flex items-center gap-3 px-3 py-2.5 my-1 rounded-md
              cursor-pointer transition-all duration-200
              ${currentScenario === key ? `${scenario.color} ${scenario.textColor}` : 'hover:bg-gray-100'}
              group
            `}
          >
            <div className={`
              p-1.5 rounded-full 
              ${currentScenario === key ? 'bg-white/20' : scenario.color}
              transition-transform duration-300 group-hover:scale-110
            `}>
              {React.createElement(scenario.icon, {
                className: `h-4 w-4 ${currentScenario === key ? 'text-white' : scenario.textColor}`,
                strokeWidth: 2.5
              })}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{scenario.label}</span>
              <span className={`text-xs ${currentScenario === key ? 'text-white/90' : 'text-gray-500'}`}>
                {scenario.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 