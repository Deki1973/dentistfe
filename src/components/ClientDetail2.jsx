import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clientStyle.scss"

const ClientDetail2 = (prop) => {
     const {jwt2}=useJwt();

   
    const client=prop.item
    const [details,setDetails]=useState(prop.item)
    const [fullName,setFullName]=useState(prop.item.fullName)
    const [contact,setContact]=useState(prop.item.contact)
    const [note,setNote]=useState(prop.item.note)
    const [clientId,setClientId]=useState(prop.item.clientId)

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.submitter.id)

        if(e.nativeEvent.submitter.id==="btnUpdate2"){
            navigate(`/updateClient/${client.clientId}`)
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
    
    return (<div className="clientStyle"> 
    <p>ClientDetail2</p>
        <ul>
            <li>Client ID: {client.clientId}</li>
            <li>Full Name: {client.fullName}</li>
            <li>Contact: {client.contact}</li>
            
            <form action="submit" onSubmit={handleSubmit}>       
                <button type="submit" id="btnUpdate2">Edit</button>
            </form>
            

        </ul>

    </div> );
}
 
export default ClientDetail2;