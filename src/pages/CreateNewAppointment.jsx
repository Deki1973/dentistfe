import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../styles/CreateNewAppointment.scss"

import { urlHeroku,urlLocal } from "../script/script1";


const CreateNewAppointment = () => {

    const { jwt2 } = useJwt()


    const [clientName, setClientName] = useState("")
    const [dentistName, setDentistName] = useState("")
    const [appointmentDescription, setAppointmentDescription] = useState("")
    const [appointmentDateAndTime, setAppointmentDateAndTime] = useState(null)

    const navigate = useNavigate()

    let pickerDefaultValue


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (e.nativeEvent.submitter.id === "btnBack") {
            navigate("/appointment")
        }
        if (e.nativeEvent.submitter.id === "btnSave") {

            //const message=`${clientName}+"|"+${dentistName}+"|"+${appointmentDate}+"|"+${appointmentTime}+"|"+${appointmentDescription}`
            const message = `${clientName}+"|"+${dentistName}+"|"+${pickerDefaultValue}`
            console.log(message)

            const responseDentist = await axios(`${urlLocal}/dentist/name/${dentistName}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            })

            if (responseDentist.data.length === 0) {
                window.alert(`No dentist ${dentistName}`)
                return
            }
            if (responseDentist.data.length > 1) {
                window.alert(`Multiple answers for ${dentistName}\nYou have to be more precise.`)
                return
            }
            console.log(responseDentist)
            console.log(responseDentist.data[0].dentistId)
            console.log(responseDentist.data[0].contact)
            console.log(responseDentist.data[0].fullName)


            const responseClient = await axios(`${urlLocal}/client/name/${clientName}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }

            })
            console.log(responseClient)
            if (responseClient.data.length === 0) {
                window.alert(`No client ${clientName}`)
                return
            }
            if (responseClient.data.length > 1) {
                window.alert(`Multiple answers for ${clientName}\nYou have to be more precise.`)
                return
            }
            console.log(responseClient.data[0])
            console.log(responseClient.data[0].clientId)
            console.log(responseClient.data[0].contact)
            console.log(responseClient.data[0].fullName)

            // proveri da li izabrani lekar ima vec zakazano
            // ako ima, izbaci upozorenje i izadji iz funkcije
            // ako nema, nastavi dalje...

            const dentistId = responseDentist.data[0].dentistId
            const clientId = responseClient.data[0].clientId

            //const appoinmentScheduled=appointmentDate+"T"+appointmentTime+":00.000+04"
            const appoinmentScheduled = appointmentDateAndTime + ":00.000+04:00"

            //2013-07-10T11:00:00.000+00:00
            // obrati paznju na timezone offset
            window.alert(appoinmentScheduled)

            const newAppointment = {
                "description": appointmentDescription,
                "dentistId": dentistId,
                "clientId": clientId,
                "appointmentDateAndTime": appoinmentScheduled,
                "price": 0,
                "completed": false
                // key names moraju odgovarati nazivima u dto u servisu


            }

            const responseAppointment = await axios({
                url: `${urlLocal}/appointment`,
                method: "POST",
                mode: "cors",
                data: newAppointment,
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }



            ).then((response) => {
                const responseData = response.data
                window.alert("zakazan termin")
                const appointId = responseData.appointmentId
                const appointDateAndTime = responseData.appointmentDateAndTime
                const clientId = responseData.client.clientId
                const clientName = responseData.client.fullName
                console.log(appointId + "|" + appointDateAndTime + "|" + clientId + "|" + clientName
                )


            }).catch((error) => {
                window.alert(error.response.data.errorMessage)
            })



        }




    }
    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")




        console.log("hjahaha")
        const currDate = new Date()
        let yyyy = currDate.getFullYear().toString()
        let MM = (currDate.getMonth() + 1).toString()
        if (MM.length == 1) { MM = "0" + MM }
        let dd = currDate.getDate().toString()
        if (dd.length == 1) { dd = "0" + dd }
        let hh = (currDate.getHours()).toString()
        if (hh.length == 1) {
            hh = "0" + hh
        }
        let mm = currDate.getMinutes().toString()
        if (mm.length == 1) { mm = "0" + mm }
        let currentDate = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm
        console.log("current date and time" + currentDate)

        document.getElementById("datetime-local-2").value = currentDate






    }, []);

    return (
        <div className="createNewAppointment">

            <h1>Create New Appointment</h1>
            <form action="submit" onSubmit={handleSubmit} className="formNewAppointment">

                <table>
                    <tr>
                        <td className="left">Schedule: </td><td className="right"><input type="datetime-local" id="datetime-local-2" value={pickerDefaultValue} onChange={e => {
                            console.log(e.target.value)
                            setAppointmentDateAndTime(e.target.value)
                        }} /></td>
                    </tr>
                    <tr>
                        <td className="left">Client: </td><td className="right"><input type="text" placeholder="Client Full Name:" id="clientFullName" onChange={e => { setClientName(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td className="left">Description: </td><td className="right"><textarea placeholder="description:" id="appointmentDescription" className="appointmentDescription" onChange={e => { setAppointmentDescription(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td className="left">Dentist: </td><td className="right"><input type="text" placeholder="Dentist: " id="dentistFullName" onChange={e => { setDentistName(e.target.value) }} /></td>
                    </tr>

                </table>



                <button type="submit" id="btnSave">Save</button>
                <button type="submit" id="btnBack">Back</button>


            </form>
        </div>
    );
}

export default CreateNewAppointment;