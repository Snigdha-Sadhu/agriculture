import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FertilizerAnalytics from './components/FertilizerAnalytics'
import InputPage from './components/inputPage'
import AgricultureLanding from './components/LandingPage'
function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<AgricultureLanding />} />
     <Route path="/analytics" element={<FertilizerAnalytics />} />
     <Route path="/form" element={< InputPage/>} />
    </Routes></BrowserRouter>
  )
}

export default App
