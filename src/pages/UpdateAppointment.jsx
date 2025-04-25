import { useEffect } from "react";
import { useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateAppointment =() => {

    let {id}=useParams()

    const{jwt2}=useJwt()

    const navigate=useNavigate();

    //const[appointmentData,setAppointmentData]=useState({}) nece da radi, ne znam zasto
    const[appointmentId,setAppointmentId]=useState(id)
    const[clientName,setClientName]=useState("")
    const[clientId,setClientId]=useState(null)
    const[dentistName,setDentistName]=useState("")
    const[dentistId,setDentistId]=useState(null)
    const[description,setDescription]=useState("")
    const[appointmentDateAndTime, setAppointmentDateAndTime]=useState(null)
    const[price,setPrice]=useState(0)
    const[completed,setCompleted]=useState(null)

    const[updateDateAndTime,setUpdateDateAndTime]=useState(null)


    let pickerDefaultValue
    
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
        console.log(data)
        setAppointmentId(data.appointmentId)
        setClientName(data.client.fullName)
        setClientId(data.client.clientId)
        setDescription(data.description)
        setDentistName(data.dentist.fullName)
        setDentistId(data.dentist.dentistId)
        setAppointmentDateAndTime(data.appointmentDateAndTime)
        setPrice(data.price)
        if(data.completed===null){
            setCompleted(false)
        }else{setCompleted(data.completed)}
        pickerDefaultValue=data.appointmentDateAndTime.substring(0,16)
        console.log(pickerDefaultValue)
        
        
      
        


    }

   
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e.nativeEvent.submitter.id)
        if(e.nativeEvent.submitter.id==="btnBack"){
            navigate(`/appointment/${appointmentId}`)
        }
        if(e.nativeEvent.submitter.id==="btnDelete"){
            const confirm=window.confirm("WARNING! This operation cannot be undone!\nAre you sure?")
            if (confirm===true){
                const response=await axios(`http://localhost:8080/appointment/${id}`,{
                    method:"DELETE",
                    mode:"cors",
                    headers:{
                        'Authorization': `Bearer ${jwt2}`,
                        'Content-Type': 'application/json',
                    }
                }).then((response)=>{
                    
                    window.alert(response.data)
                    navigate("/appointment")
                }).catch((error)=>{
                    window.alert(error.message)
                })
            }else{return}
        }
        if(e.nativeEvent.submitter.id==="btnSave"){
            console.log("save...")
            const updatedAppointment={
                "appointmentId":id,
                "description":description,
                //"appointmentDateAndTime":appointmentDateAndTime,
                appointmentDateAndTime:updateDateAndTime,
                "clientId":clientId,
                "dentistId":dentistId,
                "completed":completed,
                "price":price
               
                // key names moraju odgovarati nazivima u dto u servisu
    
    
            }
            const response=await axios(`http://localhost:8080/appointment/${id}`,{
                method:"PUT",
                mode:"cors",
                data:updatedAppointment,
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }

            }).then((response)=>{
                console.log(response)
                console.log(response.request.status)
                console.log(response.data)
                if(response.data==="Rows affected: 1" && response.request.status===200){
                    window.alert("Appointment ID "+appointmentId+" updated.")
                    
                }

            }).catch((error)=>{
                console.log(error.message)
                window.alert("ERROR: "+error.message)
            })
        }
            
    }

    
    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")
       
        getAppointmentById()
       

            console.log("hjahaha")
            const currDate=new Date()
            let yyyy=currDate.getFullYear().toString()
            let MM=(currDate.getMonth()+1).toString()
            if (MM.length==1){MM="0"+MM}
            let dd=currDate.getDate().toString()
            let hh=currDate.getHours().toString()
            let mm=currDate.getMinutes().toString()
            let currentDate=yyyy+"-"+MM+"-"+dd+"T"+hh+":"+mm
            console.log("current date and time"+currentDate)
            document.getElementById("datetime-local-1").value=currentDate

       
               
        
        
      }, []);

    return ( <>
    
    <h1>Update Appointment Page {id}</h1>
    <ul>
       <li>{appointmentId}</li>
       <li>{clientName}, ID:{clientId}</li>
       <li>{description}</li>
       <li>{appointmentDateAndTime}</li>
       <li>{dentistName}, ID:{dentistId}</li>
       <li>Price:{price}</li>
       <li>Completed: {completed ? "Yes":"No"}</li>
       
    </ul>
    <form action="submit" onSubmit={handleSubmit}>
    
            <input type="datetime-local" id="datetime-local-1" 
            //value="2018-06-12T19:30"
            value={pickerDefaultValue}
            onChange={e=>{
                
                console.log(e.target.value+":00.000+04:00")
                const newDateAndTime=e.target.value+":00.000+04:00"
                setUpdateDateAndTime(newDateAndTime)
                setAppointmentDateAndTime(newDateAndTime)

                }}

                onDoubleClick={
                    console.log("double click")

                    
                    
                }
                
                
                />
            <input type="text" value={appointmentDateAndTime} onChange={e=>{setAppointmentDateAndTime(e.target.value)}}/>
           <input type="text" id="description" value={description} onChange={e=>{setDescription(e.target.value)}}/>
            <input type="text" id="price" value={price} onChange={e=>{setPrice(e.target.value)}}/>
          <input type="checkbox" id="completed" checked={completed} onChange={e=>{
            
            setCompleted((completed)=>!completed)
            console.log(completed)
            }}/>
        <br />

    <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnBack">Back</button>
            <button type="submit" id="btnDelete">Delete</button>
    </form>
    </> );
}
 
export default UpdateAppointment;