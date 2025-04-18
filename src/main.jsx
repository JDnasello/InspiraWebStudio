import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import globalES from './translations/es/global.json'
import globalEN from './translations/en/global.json'

i18next.use(Backend).use(initReactI18next).init({
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: globalEN,
    },
    es: {
      translation: globalES,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
