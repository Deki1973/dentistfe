import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";


const CreateNewAppointment = () => {

    const {jwt2}=useJwt()
    
    const [appointmentDate,setAppointmentDate]=useState(null)
    const [appointmentTime,setAppointmentTime]=useState(null)
    const [clientName,setClientName]=useState("")
    const [dentistName,setDentistName]=useState("")
    const [appointmentDescription,setAppointmentDescription]=useState("")

    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        
       const message=`${clientName}+"|"+${dentistName}+"|"+${appointmentDate}+"|"+${appointmentTime}+"|"+${appointmentDescription}`
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

        const dentistId=responseDentist.data[0].dentistId
        const clientId=responseClient.data[0].clientId

        const appoinmentScheduled=appointmentDate+"T"+appointmentTime+":00.000+04"
        //2013-07-10T11:00:00.000+00:00
        // obrati paznju na timezone offset
        window.alert(appoinmentScheduled)

        const newAppointment={
            "description":appointmentDescription,
            "dentistId":dentistId,
            "clientId":clientId,
            "appointmentDateAndTime":appoinmentScheduled,
            "price":0,
            "completed":false
            // key names moraju odgovarati nazivima u dto u servisu


        }
        
        const responseAppointment=await axios({
            url:`http://localhost:8080/appointment`,
            method:"POST",
            mode:"cors",
            data:newAppointment,
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }
            
            /*
            body:JSON.stringify({
                description:appointmentDescription,
                clientId:dentistId,
                dentistId:clientId,
                appointmentDateAndTime:appoinmentScheduled,
                price:0,
                completed:false

          
            }),*/
            
            


        
        ).then((response)=>{
            const responseData=response.data
            window.alert("zakazan termin")
            const appointId=responseData.appointmentId
            const appointDateAndTime=responseData.appointmentDateAndTime
            const clientId=responseData.client.clientId
            const clientName=responseData.client.fullName
            console.log(appointId+"|"+appointDateAndTime+"|"+clientId+"|"+clientName
            )
            
            
        }).catch((error)=>{
            window.alert(error.response.data.errorMessage)
        })
        
       

    }

    return ( 
        <>

<h1>Create New Appointment Page</h1>
        <form action="submit" onSubmit={handleSubmit}>
            <input type="date" onChange={e=>{
                setAppointmentDate(e.target.value)
            }}/>
            <input type="time" onChange={e=>{setAppointmentTime(e.target.value)}}/>
            <input type="text" placeholder="Dentist: " id="dentistFullName" onChange={e=>{setDentistName(e.target.value)}}/>
            <input type="text" placeholder="Client Full Name:" id="clientFullName" onChange={e=>{setClientName(e.target.value)}}/>
            <textarea placeholder="description:" id="appointmentDescription" onChange={e=>{setAppointmentDescription(e.target.value)}}/>
            <button type="submit" onClick={handleSubmit}>Save</button>
            
        </form>
        </>
     );
}
 
export default CreateNewAppointment;