import { useState, useEffect, useRef } from 'react'

const storageCache = new Map()

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (storageCache.has(key)) {
      return storageCache.get(key)
    }
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        storageCache.set(key, parsed)
        return parsed
      }
    } catch (e) {}
    storageCache.set(key, initialValue)
    return initialValue
  })

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    storageCache.set(key, value)
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export function useBaby() {
  return useLocalStorage('baby', { id: '', name: '', birthDate: '', gender: 'male' })
}

export function hasBabyInfo(baby) {
  return baby && baby.name && baby.name.trim() !== ''
}
