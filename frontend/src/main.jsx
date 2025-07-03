import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/theme-provider'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store' // ✅ import persistor
import { PersistGate } from 'redux-persist/integration/react' // ✅ import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* ✅ wait for rehydration */}
        <ThemeProvider>
          <App />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
