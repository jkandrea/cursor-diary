'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar/sidebar'

export function MobileHeader() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background p-4 lg:hidden">
      <h1 className="text-lg font-semibold">Daybrary</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetTitle className="sr-only">메뉴</SheetTitle>
          <Sidebar className="w-full border-0" />
        </SheetContent>
      </Sheet>
    </div>
  )
}
