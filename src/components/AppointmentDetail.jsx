import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AppointmentDetail = (prop) => {
    const item=prop.item
    
    const navigate=useNavigate()


    const handleSubmit=async(e)=>{
           e.preventDefault()
           console.log(e)
           console.log(e.nativeEvent.submitter.id)
   
           if(e.nativeEvent.submitter.id==="btnUpdate2"){
               navigate(`/updateAppointment/${item.appointmentId}`)
           }
           
          
       }
       useEffect(() => {
           // Code here will run after *every* render
           /*
           setFullName(client.fullName)
           setContact(client.contact)
           setNote(client.note)
           */
           
         });

    return ( <>
    <h3>Appointment detail</h3>
    <ul>
        <li>ID: {item.appointmentId}</li>
        <li>Client name: {item.client.fullName}</li>
        <li>Description: {item.description}</li>
        <li>Dentist:{item.dentist.fullName}</li>
        <li>Scheduled: {item.appointmentDateAndTime}</li>
        <li>Completed: {item.completed ? "Yes":"No"}</li>
        <li>Price: {item.price ? item.price:"0"}</li>
    </ul>
    <form action="submit" onSubmit={handleSubmit}>
        <button type="submit" id="btnUpdate2">Edit</button>
    </form>
    </> );
}
 
export default AppointmentDetail;