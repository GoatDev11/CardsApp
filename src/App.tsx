import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './Router'
import { NotificationProvider } from './context/notification.context'
import { Suspense } from 'react'

function App() {


  return (
    <NotificationProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Cargando...</div>}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
