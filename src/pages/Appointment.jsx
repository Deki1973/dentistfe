import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";


const Appointment = () => {

    const {jwt2}=useJwt()
    
    const [appointmentDate,setAppointmentDate]=useState(null)
    const [appointmentTime,setAppointmentTime]=useState(null)
    const [clientName,setClientName]=useState("")
    const [dentistName,setDentistName]=useState("")
    const [appointmentDescription,setAppointmentDescription]=useState("")
    const [appointments,setAppointments]=useState(null)

    const navigate=useNavigate()

    const handleGetAll=async (e)=>{
        window.alert("Get all")

        const response=await axios({
            url:`http://localhost:8080/appointment/getall`,
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            const responseData=response.data
            console.log(responseData)
            setAppointments(responseData)
            
        }).catch((error)=>{
            console.log(error.message)
        })

    }
   
    const handleCreateNewAppointment=()=>{
        navigate("/createNewAppointment")
     }

     
    return ( 
        <>
        <h1>Appointment page</h1>
        <button onClick={handleGetAll}>Get All</button>
        <button onClick={handleCreateNewAppointment}>Create New Appointment</button>
        <AppointmentList appointments={appointments}/>
       
       
        </>
     );
}
 
export default Appointment;