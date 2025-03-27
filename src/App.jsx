import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from "../src/pages/Home.jsx"
import Client from "../src/pages/Client.jsx"
import Dentist from "../src/pages/Dentist.jsx"
import Appointment from "../src/pages/Appointment.jsx"


// components
import NavBar from './components/NavBar'

// style
import { useTheme } from './contexts/ThemeContext.jsx'
import { useJwt } from './contexts/JwtContext.jsx'

const App=()=> {

  const { theme } = useTheme();
  const {changeJwt, jwt2}=useJwt();

  return (
    <>
    <main className="main" style={theme}>
<Router>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="client" element={<Client/>}/>
    <Route path="dentist" element={<Dentist/>}/>
    <Route path="appointment" element={<Appointment/>}/>


  </Routes>
</Router>


    </main>
    </>
    
  )
}

export default App
