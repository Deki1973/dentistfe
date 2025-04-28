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
        
        //
        // timezone correction
        let hours=parseInt(data.appointmentDateAndTime.substring(11,13))
        hours=hours+4   // timezone correction
        let newHours=hours.toString()
        if(hours<10){
            newHours="0"+newHours
        }
        let appointDate1=data.appointmentDateAndTime.substring(0,11)
        let appointDate2=data.appointmentDateAndTime.substring(13,19)
        
        console.log(appointDate1)
        console.log(appointDate2)
        console.log(newHours)
        const correctedAppointmentScheduled=appointDate1+newHours+appointDate2
        
    
        console.log("hours:"+hours)

        setAppointmentDateAndTime(correctedAppointmentScheduled)
        //
        setPrice(data.price)
        if(data.completed===null){
            setCompleted(false)
        }else{setCompleted(data.completed)}
        pickerDefaultValue=correctedAppointmentScheduled.substring(0,16)
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
            let hh=(currDate.getHours()).toString()
            if(hh.length==1){
                hh="0"+hh
            }
            let mm=currDate.getMinutes().toString()
            if(mm.length==1){mm="0"+mm}
            let currentDate3=yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm
            console.log("currentDate3: "+currentDate3)
            //let currentDate2=new Date(yyyy,MM,dd,hh,mm)
            //currentDate2.setTime(currentDate2.getTime()+(4*60*60*1000))
            
            console.log("current date and time: "+currentDate3.toString())
            //const currentDate3="2025-04-28 22:00"

            document.getElementById("datetime-local-1").value=currentDate3

       
               
        
        
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
            
            //defaultValue="2018-06-12T19:30"
            defaultValue={Date()}
            onChange={e=>{
                
                console.log(e.target.value+":00.000+04:00")
                const newDateAndTime=e.target.value+":00.000+04:00"
                setUpdateDateAndTime(newDateAndTime)
                setAppointmentDateAndTime(newDateAndTime)
    

                }}

                
                
                
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