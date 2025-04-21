import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentDetail2 = (prop) => {

    const {jwt2}=useJwt();

   
    const appointment=prop.item



    useEffect(() => {
        // Code here will run after *every* render
        /*
        setFullName(client.fullName)
        setContact(client.contact)
        setNote(client.note)
        */
        
      });
    return ( 
        <>
            <form action="submit" onSubmit={handleSubmit}>
                <button type="submit" id="btnUpdate2">Edit</button>
            </form>
        </>
     );
}
 
export default AppointmentDetail2;