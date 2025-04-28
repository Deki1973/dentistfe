import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentDetail2 = (prop) => {

    const {jwt2}=useJwt();

    const appointment=prop.singleAppointment
    

    const handleSubmit=async(e)=>{
        console.log(e)
    }



    useEffect(() => {
        // Code here will run after *every* render
        /*
        setFullName(client.fullName)
        setContact(client.contact)
        setNote(client.note)
        */
       console.log(prop.singleAppointment)
        
      });
    return ( 
        <>
            <ul>
                <li>{appointment.appointmentId}</li>
                <li>{appointment.client.fullName}</li>
                <li>{appointment.dentist.fullName}</li>
                <li>{appointment.description}</li>
                <li>{appointment.appointmentDateAndTime}</li>
                {appointment.completed!==null ? <li>"Yes</li>:<li>"No"</li>}
                <li>{appointment.price}</li>
            </ul>
            <form action="submit" onSubmit={handleSubmit}>
                <button type="submit" id="btnUpdate2">Edit</button>
            </form>
        </>
     );
}
 
export default AppointmentDetail2;