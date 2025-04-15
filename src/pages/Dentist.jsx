import { useState } from "react"
import DentistList from "../components/DentistList";
import DentistDetail from "../components/DentistDetail";

import { useJwt } from "../contexts/JwtContext"

import { Navigate, useNavigate } from "react-router-dom"


const Dentist = () => {

    const {jwt2}=useJwt();
    const [dentists, setDentists]=useState(null)
    const [item,setItem]=useState(null)
    const [dentistListVisible, setDentistListVisible]=useState(false)
    const [dentistDetailsVisible, setDentistDetailsVisible]=useState(false)

    const navigate=useNavigate()


    const handleGetAll= async()=>{
        
        
        window.alert("handle click...")   
        console.log(jwt2) 
        
  //      const jwt1="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28xIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQyNDk1OTc3LCJpYXQiOjE3NDI0OTIzNzd9.QVxNzsrx0QcR0D-L8BG0dOHz5iEurKtidHDkm19hxBU"


      
        const response=await fetch(`http://localhost:8080/dentist/getall`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
                }
                
                
            }
        )

        console.log("Response is:\n")
        console.log(response)
        const json1=await response.json()
        console.log(json1)
        
        setDentists(json1)
        setDentistListVisible(true)
        setDentistDetailsVisible(false)
         
    }

    const handleGetDentist=async ()=>{


        const dentistAttribute=document.getElementById("select1").value

        const attributeValue=document.getElementById("dentistAttribute").value
        

        const response=await fetch(
            `http://localhost:8080/dentist/${dentistAttribute}/${attributeValue}`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }


        )
        console.log(response)
        const data=await response.json()
        console.log(data)
      
       console.log("Dentists found:")
       console.log(dentists)
       if (dentistAttribute==="contact" || dentistAttribute==="id"){
        setItem(data)
        setDentistListVisible(false)
        setDentistDetailsVisible(true)
       }
       if(dentistAttribute==="name"){
        setDentists(data)
        setDentistListVisible(true)
        setDentistDetailsVisible(false)
       }

    }

    const handleAddNewDentist=()=>{
        navigate("/addNewDentist")
     }
    return ( 
        <>
        <h1>Dentist page</h1>
       
        <button onClick={handleGetAll}>GetAll</button>
        <br />
        <select id="select1">
            <option value="id">ID: </option>
            <option value="name">Full Name: </option>
            <option value="contact">Contact: </option>
            
        </select>
        <input type="text" id="dentistAttribute" placeholder="value"/>
        <button onClick={handleGetDentist}>Get dentist</button>
        <button onClick={handleAddNewDentist}>Add new dentist</button>

        <div>
            {dentistDetailsVisible && item && <DentistDetail item={item}/> }  
        </div>
       
        <div>
            {dentistListVisible && <DentistList dentists={dentists}/>}
        

        </div>
        
        </>
     );
}
 
export default Dentist;