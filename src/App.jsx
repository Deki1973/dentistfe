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
import UpdateClient from './pages/UpdateClient.jsx'
import AddNewClient from './pages/AddNewClient.jsx'
import UpdateDentist from './pages/UpdateDentist.jsx'
import AddNewDentist from './pages/AddNewDentist.jsx'
import CreateNewAppointment from './pages/CreateNewAppointment.jsx'
import UpdateAppointment from './pages/UpdateAppointment.jsx'

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
    <Route path="updateClient/:id" element={<UpdateClient/>}/>
    <Route path="addNewClient" element={<AddNewClient/>}/>
    <Route path="updateDentist/:id" element={<UpdateDentist/>}/>
    <Route path="addNewDentist" element={<AddNewDentist/>}/>
    <Route path="createNewAppointment" element={<CreateNewAppointment/>}/>
    <Route path="updateAppointment/:id" element={<UpdateAppointment/>}/>


  </Routes>
</Router>


    </main>
    </>
    
  )
}

export default App
