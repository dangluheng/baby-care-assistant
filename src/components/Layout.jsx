import React from 'react'
import Navigation from './Navigation'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <h1 className="header-title text-2xl font-bold text-center">育儿助手</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Navigation />
    </div>
  )
}
