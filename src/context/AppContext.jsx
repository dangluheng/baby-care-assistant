import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [baby, setBaby] = useState(() => {
    try {
      const stored = localStorage.getItem('baby')
      return stored ? JSON.parse(stored) : { id: '', name: '', birthDate: '', gender: 'male' }
    } catch {
      return { id: '', name: '', birthDate: '', gender: 'male' }
    }
  })

  const [feeding, setFeeding] = useState(() => {
    try {
      const stored = localStorage.getItem('feeding')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [sleep, setSleep] = useState(() => {
    try {
      const stored = localStorage.getItem('sleep')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [diaper, setDiaper] = useState(() => {
    try {
      const stored = localStorage.getItem('diaper')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [growth, setGrowth] = useState(() => {
    try {
      const stored = localStorage.getItem('growth')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [health, setHealth] = useState(() => {
    try {
      const stored = localStorage.getItem('health')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [supplement, setSupplement] = useState(() => {
    try {
      const stored = localStorage.getItem('supplement')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('baby', JSON.stringify(baby))
  }, [baby])

  useEffect(() => {
    localStorage.setItem('feeding', JSON.stringify(feeding))
  }, [feeding])

  useEffect(() => {
    localStorage.setItem('sleep', JSON.stringify(sleep))
  }, [sleep])

  useEffect(() => {
    localStorage.setItem('diaper', JSON.stringify(diaper))
  }, [diaper])

  useEffect(() => {
    localStorage.setItem('growth', JSON.stringify(growth))
  }, [growth])

  useEffect(() => {
    localStorage.setItem('health', JSON.stringify(health))
  }, [health])

  useEffect(() => {
    localStorage.setItem('supplement', JSON.stringify(supplement))
  }, [supplement])

  const value = {
    baby, setBaby,
    feeding, setFeeding,
    sleep, setSleep,
    diaper, setDiaper,
    growth, setGrowth,
    health, setHealth,
    supplement, setSupplement
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export function hasBabyInfo(baby) {
  return baby && baby.name && baby.name.trim() !== ''
}