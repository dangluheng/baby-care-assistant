import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Feeding from './pages/Feeding'
import Sleep from './pages/Sleep'
import Diaper from './pages/Diaper'
import Growth from './pages/Growth'
import Health from './pages/Health'
import Supplement from './pages/Supplement'
import Settings from './pages/Settings'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feeding" element={<Feeding />} />
            <Route path="/sleep" element={<Sleep />} />
            <Route path="/diaper" element={<Diaper />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="/health" element={<Health />} />
            <Route path="/supplement" element={<Supplement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}