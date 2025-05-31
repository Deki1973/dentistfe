import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentDetail2 = (prop) => {

    const {jwt2}=useJwt();

    const appointment=prop.singleAppointment
    // uraditi korekciju timezone offseta
    const navigate=useNavigate()
    
    const a1=appointment.appointmentDateAndTime.substring(0,10)
    const a2=appointment.appointmentDateAndTime.substring(11,16)
    console.log(a1)
    console.log(a2)
    let hours=a2.substring(0,2)
    console.log(hours)
    let correctedHours=(parseInt(hours)+4).toString()
    if (correctedHours.length===1){
        correctedHours="0"+correctedHours
    }
    let a3=a2.substring(2,8)
    console.log(a3)

    let correctedAppointmentScheduled=a1+" "+correctedHours+a3
    console.log(correctedAppointmentScheduled)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.submitter.id)

        if(e.nativeEvent.submitter.id==="btnUpdate3"){
            navigate(`/updateAppointment/${appointment.appointmentId}`)
        }
        
       
    }


    useEffect(() => {
        // Code here will run after *every* render
        /*
        setFullName(client.fullName)
        setContact(client.contact)
        setNote(client.note)
        */
       console.log(prop.singleAppointment)
       console.log(prop.singleAppointment.price)
        
      });
    return ( 
        <div className="appointmentDetail">

          <table>
            <th colSpan="2">Appointment details: </th>
            <tbody>
            <tr>
                <td className="left">ID: </td><td className="right">{appointment.appointmentId}</td>
            </tr>
            <tr>
                <td className="left">Client name: </td><td className="right">{appointment.client.fullName}</td>
            </tr>
            <tr>
                <td className="left">Scheduled: </td><td className="right">{correctedAppointmentScheduled.substring(0, 10) + " " + correctedAppointmentScheduled.substring(11, 16)}</td>
            </tr>
            <tr>
                <td className="left">Description: </td><td className="right">{appointment.description}</td>
            </tr>
            <tr>
                <td className="left">Dentist: </td><td className="right">{appointment.dentist.fullName}</td>
            </tr>
            <tr>
                <td className="left">Completed: </td><td className="right">{(appointment.completed===null || appointment.completed===false) ? "No":"Yes"}</td>
            </tr>
            <tr>
                <td className="left">Price: </td><td className="right">{appointment.price ? appointment.price : "0"}</td>
            </tr>
            </tbody>

        </table>
            


            <form action="submit" onSubmit={handleSubmit}>
                <button type="submit" id="btnUpdate3">Edit</button>
            </form>
        </div>
     );
}
 
export default AppointmentDetail2;