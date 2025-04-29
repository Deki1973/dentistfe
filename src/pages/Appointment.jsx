import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import AppointmentDetail from "../components/AppointmentDetail";
import AppointmentDetail2 from "../components/AppointmentDetail2";


const Appointment = () => {

    const {jwt2}=useJwt()
    
    const [appointmentDate,setAppointmentDate]=useState(null)
    const [appointmentTime,setAppointmentTime]=useState(null)
    const [clientName,setClientName]=useState("")
    const [clientId,setClientId]=useState(null)
    
    const [dentistName,setDentistName]=useState("")
    const [denstiId,setDentistId]=useState("")
    const [appointmentDescription,setAppointmentDescription]=useState("")
    const [appointments,setAppointments]=useState(null)
    const [singleAppointment,setSingleAppointment]=useState(null)

    const [clientParam,setClientParam]=useState(null)
    const [dentistParam,setDentistParam]=useState(null)

    const [done,setDone]=useState(null)

    const [appointmentStateScheduled,setAppointmentStateScheduled]=useState("")

    let clientId2=null
    let dentistId2=null

    const navigate=useNavigate()

    const handleTest=async (e)=>{
        e.preventDefault()
        console.log("test get exact")
        const response=await fetch(`http://localhost:8080/appointment/getExact`,{
            method:"POST",
            mode:"cors",
            body:JSON.stringify({
                clientId:1,
                dentistId:1,
                appointmentDateAndTime:"2025-04-26 11:12:00"
            }),
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        })
        const data=await response.json()
        console.log(data)
    }

    const handleGetAll=async (e)=>{
       

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

     const handleSubmit=async (e)=>{
        e.preventDefault()

        console.log(e.nativeEvent.submitter.id)
        const submitter=e.nativeEvent.submitter.id
        //const clientValue=document.getElementById("inputClientParam").value
        //const dentistValue=document.getElementById("inputDentistParam").value
        const clientValue=clientParam
        const dentistValue=dentistParam
        const appointmetnScheduled=document.getElementById("appointmentDateAndTime").value
        
        const clientAttribute=document.getElementById("selectClient").value
        const dentistAttribute=document.getElementById("selectDentist").value

        

        


      

        console.log(clientValue+"|"+clientValue+"|"+appointmetnScheduled)

        if (submitter==="btnGetByClient"){
            console.log("Get client by"+clientAttribute+"|"+clientValue)
            const url1=`http://localhost:8080/client/${clientAttribute}/${clientValue}`
            console.log("url1:"+url1)

            const response=await axios(url1,{
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((response)=>{
                
                console.log(response)
                if(response.data.length>1){
                    window.alert("Multiple response. Please, be more specific.")
                    return
                }
                if(clientAttribute!="name"){
                console.log(response.data.clientId)
                console.log(response.data.fullName)
                console.log(response.data.contact)
                setClientId(response.data.clientId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                clientId2=response.data.clientId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                }
                if(clientAttribute==="name"){
                console.log(response.data[0].clientId)
                console.log(response.data[0].fullName)
                console.log(response.data[0].contact)
                setClientId(response.data[0].clientId)
                clientId2=response.data[0].clientId

                }
                console.log("Pronadji appointment po clientu id...")

                getAppointmentByClientId(e,clientId2)
            }).catch((error)=>{console.log(error.message)})

        }

        if(submitter==="btnGetByDentist"){
            console.log("Get dentist by"+dentistAttribute+"|"+dentistValue)
              const url1=`http://localhost:8080/dentist/${dentistAttribute}/${dentistValue}`
              console.log(url1)
              const response=await axios(url1,{

                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
              }).then((response)=>{
                console.log(response)
                if(response.data.length>1){
                    window.alert("Multiple response. Please, be more specific.")
                    return
                }
                if(dentistAttribute!="name"){
                    console.log(response.data.dentistId)
                    console.log(response.data.fullName)
                    console.log(response.data.contact)
                    setDentistId(response.data.dentistId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                    dentistId2=response.data.dentistId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                    }
                    if(dentistAttribute==="name"){
                    console.log(response.data[0].dentistId)
                    console.log(response.data[0].fullName)
                    console.log(response.data[0].contact)
                    setDentistId(response.data[0].dentistId)
                    dentistId2=response.data[0].dentistId
    
                    }
                    console.log("Pronadji appointment by dentistId: "+dentistId2)
                    getAppointmentByDentistId(e,dentistId2)

              }).catch((error)=>{console.log(error.message)})


        }

        if (submitter==="btnGetExact"){
         // pribavi ID clienta iz baze
         // pribavi ID dentista iz baze
         // pribavi DateAndTime iz text polja ili datetime-local pickera
         // prepravi vreme za 4 sata zbog vremnske zone
        let hours=parseInt(appointmetnScheduled.substring(11,13))
        hours=hours-4
        let newHours=hours.toString()
        if(hours<10){
            newHours="0"+newHours
        }
        let appointDate1=appointmetnScheduled.substring(0,11)
        let appointDate2=appointmetnScheduled.substring(13,19)
        
        console.log(appointDate1)
        console.log(appointDate2)
        console.log(newHours)
        const correctedAppointmentScheduled=appointDate1+newHours+appointDate2
        console.log("corrected appointment schedule.. "+ correctedAppointmentScheduled)
    
        console.log("hours:"+hours)
        const appointment={
            "clientId":clientValue,
            "dentistId":dentistValue,
            "appointmentDateAndTime":correctedAppointmentScheduled
        }
         console.log("btnGetExact...")
         console.log(clientValue+"|"+dentistValue+"|"+correctedAppointmentScheduled)
         const url1=`http://localhost:8080/appointment/getExact`
         const response=await axios(url1,{
            method:"POST",
            mode:"cors",
            data:appointment,
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
         }).then((response2)=>{
            console.log(response2.data)
            const response2data=response2.data
            setSingleAppointment(response2data)
        }).catch((error)=>{console.log(error.message)})
        }

     }

     const handleDateTimeLocalChange=(e)=>{
        
        const pickerDateTime=e.target.value
        console.log("pickerDateTime.."+pickerDateTime)
        let dateTimeString=pickerDateTime.substring(0,10)+" "+pickerDateTime.substring(11,16)+":00"
        console.log(dateTimeString)
        document.getElementById("appointmentDateAndTime").value=dateTimeString
        
     }

     const getAppointmentByClientId=async (e,clientId2)=>{
        e.preventDefault()
 
        console.log(clientId2)
        //clientId2=document.getElementById("inputClientParam").value
        const url2=`http://localhost:8080/appointment/client/${clientId2}`
        console.log(url2)
        const response2=await axios(url2,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }

            }
        ).then((response2)=>{
            const response2data=response2.data
            console.log("izlistaj zakazane appointmente")
            console.log(response2data)
            setAppointments(response2data)
            
        }).catch((error)=>{console.log(error.message)})
     }
    
    const getAppointmentByDentistId=async (e,dentistId2)=>{

        console.log(dentistId2)
        const url2=`http://localhost:8080/appointment/dentist/${dentistId2}`
        console.log(url2)
        const response2=await axios(url2,{     
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response2)=>{
            
            console.log(response2)
            const response2data=response2.data
            console.log(response2data)
            setAppointments(response2data)
        }
        ).catch((error)=>{console.log(error)})
       

    }
     
    useEffect(()=>{
        console.log("use effect...")

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

            document.getElementById("datetime-local-3").value=currentDate3
            setAppointmentStateScheduled(currentDate3)
            
            

    },[])
    return ( 
        <>
        <h1>Appointment page</h1>
        <button onClick={handleGetAll}>Get All</button>
        <button onClick={handleCreateNewAppointment}>Create New Appointment</button>
        <button onClick={handleTest}>Get Exact test</button>
        <form action="submit" onSubmit={handleSubmit}>
            <fieldset id="fsDone">
            <input type="radio" value="null" name="fsDone" id="radioAll" defaultChecked="checked" onClick={e=>{setDone(null)}}/><label>All</label>
            <input type="radio" value="false" name="fsDone" id="radioNotDone" onClick={e=>{setDone(false)}}/><label>Not completed</label>
            <input type="radio" value="true" name="fsDone" id="radioDone" onClick={e=>{setDone(true)}}/><label>Completed</label>
            
            </fieldset>
            <input type="datetime-local" id="datetime-local-3" onChange={handleDateTimeLocalChange}/>
            <input type="text" placeholder="appointmentDateAndTime" id="appointmentDateAndTime"/>
            
            
            <select id="selectClient">
                <option id="clientId" value="id">Client ID: </option>                
                <option id="clientFullName" value="name">Client Full Name: </option>                
                <option id="clientContact" value="contact">Contact: </option>                
            </select>
            <input type="text" id="inputClientParam" placeholder="Client: " onChange={e=>{
                setClientParam(e.target.value)
                console.log(clientParam)
                

            }}/>

            <select id="selectDentist">
            <option id="dentistId" value="id">Dentst ID: </option>                
                <option id="dentistFullName" value="name">Dentist Full Name: </option>                
                <option id="dentistContact" value="contact">Contact: </option>                
            </select>
            <input type="text" id="inputDentistParam" placeholder="Dentist: " onChange={e=>{
                setDentistParam(e.target.value)
                console.log(dentistParam)
            }
                }/>
            <button type="submit" id="btnGetByClient">Get Appointment By Client</button>
            <button type="submit" id="btnGetByDentist">Get Appointment By Dentist</button>
            <button type="submit" id="btnGetExact">Get Exact Appointment</button>
        </form>
            {done!=null && <AppointmentList appointments={appointments} done={done}/>}
            {done==null && <AppointmentList appointments={appointments} done={done}/>}
            {singleAppointment!=null && <AppointmentDetail2 singleAppointment={singleAppointment}/>}
            

       
       
        </>
     );
}
 
export default Appointment;