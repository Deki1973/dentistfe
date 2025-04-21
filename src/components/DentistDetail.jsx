import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DentistDetail = (prop) => {



    const dentist=prop.item
    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        //window.alert("handle submit edit"+dentist.dentistId)
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.submitter.id)

        if(e.nativeEvent.submitter.id==="btnUpdate2"){
            console.log("navigate to update dentist...")
            navigate(`/updateDentist/${dentist.dentistId}`)
        }

    }
    return ( 
        <>
         <ul>
            <li>Client ID: {dentist.dentistId}</li>
            <li>Full Name: {dentist.fullName}</li>
            <li>Contact: {dentist.contact}</li>
            <form action="submit" onSubmit={handleSubmit}>

            <button type="submit" id="btnUpdate2">Edit</button>
        
            
            

            </form>

        </ul>
        </>
     );
}
 
export default DentistDetail;