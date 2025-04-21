import { useEffect } from "react";
import { useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateAppointment =() => {

    let {id}=useParams()

    const{jwt2}=useJwt()

    //const[appointmentData,setAppointmentData]=useState({}) nece da radi, ne znam zasto
    const[appointmentId,setAppointmentId]=useState(id)
    const[clientName,setClientName]=useState("")
    const[clientId,setClientId]=useState(null)
    const[dentistName,setDentistName]=useState("")
    const[dentistId,setDentistId]=useState(null)
    const[description,setDescription]=useState("")
    const[appointmentDateAndTime, setAppointmentDateAndTime]=useState(null)


    const getAppointmentById=async (e)=>{
        console.log("get appointment by id..."+id)
        const response=await axios(`http://localhost:8080/appointment/${id}`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }
            
        )
        const data=await response.data
        //setAppointmentData(data) nece da radi, ne znam zasto
        setAppointmentId(data.appointmentId)
        setClientName(data.client.fullName)
        setClientId(data.client.clientId)
        setDescription(data.description)
        setDentistName(data.dentist.fullName)
        setDentistId(data.dentist.dentistId)
        setAppointmentDateAndTime(data.appointmentDateAndTime)

      
        


    }


    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e.nativeEvent.submitter.id)
    }

    
    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")
       
        getAppointmentById()
       
       
               
        
        
      }, []);

    return ( <>
    
    <h1>Update Appointment Page {id}</h1>
    <ul>
       <li>{appointmentId}</li>
       <li>{clientName}, ID:{clientId}</li>
       <li>{description}</li>
       <li>{appointmentDateAndTime}</li>
       <li>{dentistName}, ID:{dentistId}</li>
       
    </ul>
    <form action="submit" onSubmit={handleSubmit}>
    <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnBack">Back</button>
            <button type="submit" id="btnDelete">Delete</button>
    </form>
    </> );
}
 
export default UpdateAppointment;