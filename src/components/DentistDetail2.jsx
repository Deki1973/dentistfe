import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/DentistStyle.scss"

const DentistDetail2 = () => {

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        if (e.nativeEvent.submitter.id === "btnUpdate2") {
            console.log("navigate to update dentist...")
            navigate(`/updateDentist/${dentist.dentistId}`)
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
    return (<div className="dentistStyle">

        <table>
            <tbody>
                <tr>
                    <td>Dentist ID: </td><td>{denitst.dentistId}</td>
                </tr>
            </tbody>
        </table>



        <form action="submit" onSubmit={handleSubmit}>

            <button type="submit" id="btnUpdate2">Edit</button>




        </form>



    </div>);
}

export default DentistDetail2;