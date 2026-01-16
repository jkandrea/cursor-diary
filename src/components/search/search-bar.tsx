'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ placeholder = '검색...', onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch?.(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  )
}
