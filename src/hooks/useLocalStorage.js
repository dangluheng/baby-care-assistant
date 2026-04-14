import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        setValue(JSON.parse(stored))
      } else {
        setValue(initialValue)
      }
    } catch (e) {
      setValue(initialValue)
    }
    setIsInitialized(true)
  }, [key, initialValue])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value, isInitialized])

  return [value, setValue]
}
