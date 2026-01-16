'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MiniCalendarProps {
  selectedDates?: Date[]
  onDateSelect?: (dates: Date[]) => void
}

export function MiniCalendar({ selectedDates = [], onDateSelect }: MiniCalendarProps) {
  const [selected, setSelected] = React.useState<Date[]>(selectedDates)

  const handleSelect = (date: Date | undefined) => {
    // 이미 선택된 날짜를 다시 클릭하면 date가 undefined로 들어올 수 있음
    // 이 경우 전체 선택을 해제한다.
    if (!date) {
      setSelected([])
      onDateSelect?.([])
      return
    }

    const dateStr = format(date, 'yyyy-MM-dd')
    const isSelected = selected.some(
      (d) => format(d, 'yyyy-MM-dd') === dateStr
    )

    let newSelected: Date[]
    if (isSelected) {
      // 이미 선택된 날짜면 제거
      newSelected = selected.filter(
        (d) => format(d, 'yyyy-MM-dd') !== dateStr
      )
    } else {
      // 선택되지 않은 날짜면 추가
      newSelected = [...selected, date]
    }

    setSelected(newSelected)
    onDateSelect?.(newSelected)
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">
        {format(new Date(), 'yyyy년 M월', { locale: ko })}
      </div>
      <Calendar
        mode="single"
        selected={selected[0]}
        onSelect={handleSelect}
        locale={ko}
        className="rounded-md border"
        modifiers={{
          selected: selected,
        }}
        modifiersClassNames={{
          selected: 'bg-primary text-primary-foreground',
        }}
      />
      {selected.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {selected.length}개 날짜 선택됨
        </div>
      )}
    </div>
  )
}
