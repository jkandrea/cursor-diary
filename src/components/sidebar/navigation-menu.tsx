'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Plus, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: '전체 일기',
    href: '/',
    icon: Home,
  },
  {
    title: '새 일기 작성',
    href: '/new',
    icon: Plus,
  },
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
