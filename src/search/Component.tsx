'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Căutare
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Căutare..."
          className="border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
          aria-label="Caută conținut"
        />
        <button type="submit" className="sr-only">
          Trimite căutarea
        </button>
      </form>
    </div>
  )
}
