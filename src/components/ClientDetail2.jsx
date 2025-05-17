import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ClientStyle.scss"

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

        if(e.nativeEvent.submitter.id==="btnEdit"){
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
       
            <table>
                <tr>
                    <td className="left">Client ID:</td><td className="right"> {client.clientId}</td>
                </tr>
                <tr>
                    <td className="left">Full Name:</td><td className="right"> {client.fullName}</td>
                    
                </tr>
                <tr>
                    <td className="left">Contact:</td><td className="right"> {client.contact}</td>
                </tr>
                <tr>
                    <td className="left">Note: </td>
                    {client.note!==null && <td className="right">{client.note}</td>}
                    
                
                </tr>
            </table>
           
            
            <form action="submit" onSubmit={handleSubmit}>       
                <button type="submit" id="btnEdit">Edit</button>
            </form>
            

       

    </div> );
}
 
export default ClientDetail2;