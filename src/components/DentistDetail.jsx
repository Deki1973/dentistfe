import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/DentistStyle.scss"


const DentistDetail = (prop) => {



    const dentist=prop.item
    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        //window.alert("handle submit edit"+dentist.dentistId)
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.submitter.id)

        if(e.nativeEvent.submitter.id==="btnUpdateDentist"){
            console.log("navigate to update dentist...")
            navigate(`/updateDentist/${dentist.dentistId}`)
        }

    }
    return ( 
        <div className="dentistStyle">
        
            <table>
                
                    <tr>
                        <td className="left">Dentist ID:</td><td className="right">{dentist.dentistId}</td>
                    </tr>
                    <tr>
                        <td className="left">Full Name: </td><td className="right">{dentist.fullName}</td>
                    </tr>
                    <tr>
                        <td className="left">Contact: </td><td className="right">{dentist.contact}</td>
                    </tr>
                    
                
            </table>
            <form action="submit" onSubmit={handleSubmit}>

            <button type="submit" id="btnUpdateDentist">Edit</button>
        
            
            

            </form>

        
        </div>
     );
}
 
export default DentistDetail;