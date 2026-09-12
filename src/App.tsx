import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
const Privacy = lazy(() => import('./pages/PoliticaDePrivacidade').then((module) => ({ default: module.PoliticaDePrivacidade })))
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })))
export function App() { return <BrowserRouter><Suspense fallback={<div className="min-h-screen bg-ink" />}><Routes><Route path="/" element={<Home />} /><Route path="/politica-de-privacidade" element={<Privacy />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></BrowserRouter> }
