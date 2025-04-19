import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";


const Appointment = () => {

    const {jwt2}=useJwt()
    
    const [appointmentDate,setAppointmentDate]=useState(null)
    const [appointmentTime,setAppointmentTime]=useState(null)
    const [clientName,setClientName]=useState("")
    const [dentistName,setDentistName]=useState("")


    const handleSubmit=async (e)=>{
        e.preventDefault()
        
       const message=`${clientName}+"|"+${dentistName}+"|"+${appointmentDate}+"|"+${appointmentTime}`
        console.log(message)
        // pronadji dentistov id
/*
        const responseDent=await fetch(`http://localhost:8080/dentist/name/${dentistName}`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        })
*/
        const responseDentist=await axios(`http://localhost:8080/dentist/name/${dentistName}`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        })

        if (responseDentist.data.length===0){
            window.alert(`No dentist ${dentistName}`)
            return
        }
        if (responseDentist.data.length>1){
            window.alert(`Multiple answers for ${dentistName}\nYou have to be more precise.`)
            return
        }
        console.log(responseDentist)
        console.log(responseDentist.data[0].dentistId)
        console.log(responseDentist.data[0].contact)
        console.log(responseDentist.data[0].fullName)

        /*
        //
        // response je malo drugaciji kada se koristi axios u odnosu na fetch
        //
        const dentistData=await responseDent.json()
        console.log(dentistData)
        if (dentistData.length>1){
            window.alert("multiple answers\nyou have to be more precise")
            return
        }
            
        const dentistId1=dentistData[0].dentistId
        console.log(`dentists id is ${dentistId1}`)
        */
        // pronadji clientov id

        //const headers1={'Authorization':'Bearer '}
        const responseClient=await axios(`http://localhost:8080/client/name/${clientName}`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
            
        })
        console.log(responseClient)
        if (responseClient.data.length===0){
            window.alert(`No client ${clientName}`)
            return
        }
        if (responseClient.data.length>1){
            window.alert(`Multiple answers for ${clientName}\nYou have to be more precise.`)
            return
        }
        console.log(responseClient.data[0])
        console.log(responseClient.data[0].clientId)
        console.log(responseClient.data[0].contact)
        console.log(responseClient.data[0].fullName)

        // proveri da li izabrani lekar ima vec zakazano
        // ako ima, izbaci upozorenje i izadji iz funkcije
        // ako nema, nastavi dalje...
        
        

    }
    return ( 
        <>
        <h1>Appointment page</h1>
        <form action="submit" onSubmit={handleSubmit}>
            <input type="date" onChange={e=>{
                setAppointmentDate(e.target.value)
            }}/>
            <input type="time" onChange={e=>{setAppointmentTime(e.target.value)}}/>
            <input type="text" placeholder="Dentist: " id="dentistFullName" onChange={e=>{setDentistName(e.target.value)}}/>
            <input type="text" placeholder="Client Full Name:" id="clientFullName" onChange={e=>{setClientName(e.target.value)}}/>
            <button type="submit" onClick={handleSubmit}>Save</button>
            
        </form>
        </>
     );
}
 
export default Appointment;