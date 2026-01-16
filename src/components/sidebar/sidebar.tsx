'use client'

import * as React from 'react'
import { SearchBar } from '@/components/search/search-bar'
import { MiniCalendar } from '@/components/sidebar/mini-calendar'
import { NavigationMenu } from '@/components/sidebar/navigation-menu'
import { ThemeToggle } from '@/components/sidebar/theme-toggle'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([])

  const handleSearch = (value: string) => {
    // 검색 로직은 추후 구현
    console.log('Search:', value)
  }

  const handleDateSelect = (dates: Date[]) => {
    setSelectedDates(dates)
    // 날짜 필터링 로직은 추후 구현
    console.log('Selected dates:', dates)
  }

  return (
    <aside className={className} aria-label="사이드바">
      <div className="flex h-full flex-col space-y-4 p-4">
        {/* 헤더 및 다크 모드 토글 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Daybrary</h2>
          <ThemeToggle />
        </div>

        <Separator />

        {/* 검색 바 */}
        <div>
          <SearchBar placeholder="일기 검색..." onSearch={handleSearch} />
        </div>

        <Separator />

        {/* 내비게이션 메뉴 */}
        <div>
          <h3 className="mb-2 text-sm font-medium">메뉴</h3>
          <NavigationMenu />
        </div>

        <Separator />

        {/* 미니 캘린더 */}
        <ScrollArea className="flex-1">
          <div>
            <h3 className="mb-2 text-sm font-medium">달력</h3>
            <MiniCalendar
              selectedDates={selectedDates}
              onDateSelect={handleDateSelect}
            />
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
