import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import globalES from './translations/es/es.json'
import globalEN from './translations/en/en.json'

i18next.use(initReactI18next).init({
  lng: "es",
  interpolations: {
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
