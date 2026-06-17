import React from 'react'
import ReactDOM from 'react-dom/client'

// Self-host fontów (lekkość, brak CDN). Wagi zmienne.
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/inter'
import '@fontsource-variable/newsreader'

import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/sections.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
