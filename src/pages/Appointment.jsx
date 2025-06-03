import { useEffect, useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import AppointmentDetail from "../components/AppointmentDetail";
import AppointmentDetail2 from "../components/AppointmentDetail2";

import "../styles/Appointment.scss"
import { urlHeroku, urlLocal } from "../script/urls";


const Appointment = () => {

    const { jwt2 } = useJwt()

    const [appointmentDate, setAppointmentDate] = useState(null)
    const [appointmentTime, setAppointmentTime] = useState(null)
    const [clientName, setClientName] = useState("")
    const [clientId, setClientId] = useState(null)

    const [dentistName, setDentistName] = useState("")
    const [denstiId, setDentistId] = useState("")
    const [appointmentDescription, setAppointmentDescription] = useState("")
    const [appointments, setAppointments] = useState(null)
    const [singleAppointment, setSingleAppointment] = useState(null)

    const [clientParam, setClientParam] = useState(null)
    const [dentistParam, setDentistParam] = useState(null)

    const [done, setDone] = useState(null)

    const [appointmentStateScheduled, setAppointmentStateScheduled] = useState("")

    let clientId2 = null
    let dentistId2 = null

    const navigate = useNavigate()


    const handleCreateNewAppointment = () => {
        navigate("/createNewAppointment")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(e.nativeEvent.submitter.id)
        const submitter = e.nativeEvent.submitter.id
        const clientValue = clientParam
        const dentistValue = dentistParam
        const appointmetnScheduled = document.getElementById("appointmentDateAndTime").value

        const clientAttribute = document.getElementById("selectClient").value
        const dentistAttribute = document.getElementById("selectDentist").value








        console.log(clientValue + "|" + clientValue + "|" + appointmetnScheduled)

        if (submitter === "btnGetAll") {

            const response = await axios({
                url: `${urlLocal}/appointment/getall`,
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                const responseData = response.data
                console.log(responseData)
                setAppointments(responseData)
                setSingleAppointment(null)

            }).catch((error) => {
                console.log(error.message)
                console.log(error.data)
                console.log(error.status)
                console.log(error.headers)

                if (error.status === 403) {
                    window.alert('You are not logged in or your session has expired.\nTry to login. If this message persists, contact your administrator.')
                }
            })


        }

        if (submitter === "btnGetByClient") {
            console.log("Get client by" + clientAttribute + "|" + clientValue)
            const url1 = `${urlLocal}/client/${clientAttribute}/${clientValue}`
            console.log("url1:" + url1)

            const response = await axios(url1, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {

                console.log(response)
                if (response.data.length > 1) {
                    window.alert("Multiple response. Please, be more specific.")
                    return
                }
                if (clientAttribute != "name") {
                    console.log(response.data.clientId)
                    console.log(response.data.fullName)
                    console.log(response.data.contact)
                    setClientId(response.data.clientId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                    clientId2 = response.data.clientId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                }
                if (clientAttribute === "name") {
                    console.log(response.data[0].clientId)
                    console.log(response.data[0].fullName)
                    console.log(response.data[0].contact)
                    setClientId(response.data[0].clientId)
                    clientId2 = response.data[0].clientId

                }
                console.log("Pronadji appointment po clientu id...")

                getAppointmentByClientId(e, clientId2)
            }).catch((error) => { console.log(error.message) })

        }

        if (submitter === "btnGetByDentist") {
            console.log("Get dentist by" + dentistAttribute + "|" + dentistValue)
            const url1 = `${urlLocal}/dentist/${dentistAttribute}/${dentistValue}`
            console.log(url1)
            const response = await axios(url1, {

                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                if (response.data.length > 1) {
                    window.alert("Multiple response. Please, be more specific.")
                    return
                }
                if (dentistAttribute != "name") {
                    console.log(response.data.dentistId)
                    console.log(response.data.fullName)
                    console.log(response.data.contact)
                    setDentistId(response.data.dentistId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                    dentistId2 = response.data.dentistId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                }
                if (dentistAttribute === "name") {
                    console.log(response.data[0].dentistId)
                    console.log(response.data[0].fullName)
                    console.log(response.data[0].contact)
                    setDentistId(response.data[0].dentistId)
                    dentistId2 = response.data[0].dentistId

                }
                console.log("Pronadji appointment by dentistId: " + dentistId2)
                getAppointmentByDentistId(e, dentistId2)

            }).catch((error) => { console.log(error.message) })


        }

        if (submitter === "btnGetExact") {
            // pribavi ID clienta iz baze

            const urlClient = `${urlLocal}/client/${clientAttribute}/${clientValue}`
            console.log(urlClient)


            const responseClient = await axios(urlClient, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((responseClient) => {
                console.log(responseClient)
                const dataClient = responseClient.data
                console.log(dataClient)
                if (clientAttribute != "name") {
                    console.log(responseClient.data.clientId)
                    console.log(responseClient.data.fullName)
                    console.log(responseClient.data.contact)
                    setClientId(responseClient.data.clientId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                    clientId2 = responseClient.data.clientId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                }
                if (clientAttribute === "name") {
                    console.log(responseClient.data[0].clientId)
                    console.log(responseClient.data[0].fullName)
                    console.log(responseClient.data[0].contact)
                    setClientId(responseClient.data[0].clientId)
                    clientId2 = responseClient.data[0].clientId

                }
                console.log("Pronadje id clienta po atributu " + clientAttribute + " i on je " + clientId2)

            }).catch((error) => { console.log(error.message) })

            // pribavi ID dentista iz baze

            const urlDentist = `${urlLocal}/dentist/${dentistAttribute}/${dentistValue}`
            console.log(urlDentist)
            const responseDentist = await axios(urlDentist, {

                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((responseDentist) => {
                console.log(responseDentist)
                if (responseDentist.data.length > 1) {
                    window.alert("Multiple response. Please, be more specific.")
                    return
                }
                if (dentistAttribute != "name") {
                    
                    setDentistId(responseDentist.data.dentistId) // problem: kada sam koristi useState, morao sam dvaput kliknuti da bi se lista pravilno osvezila
                    dentistId2 = responseDentist.data.dentistId    // resio upotrebom klasicne promenljive koju sam predao kao parametar narednoj funkciji
                }
                if (dentistAttribute === "name") {
                    setDentistId(responseDentist.data[0].dentistId)
                    dentistId2 = responseDentist.data[0].dentistId

                }
                console.log("Pronadjen id dentista po atributu" + dentistAttribute + "i on je " + dentistId2)


            }).catch((error) => { console.log(error.message) })




            // pribavi DateAndTime iz text polja ili datetime-local pickera
            // prepravi vreme za 4 sata zbog vremnske zone
            let intHours = parseInt(appointmetnScheduled.substring(11, 13))
            intHours = intHours - 4
            let strHours = intHours.toString()
            if (strHours.length === 1) {
                strHours = "0" + strHours
            }
            let appointDate1 = appointmetnScheduled.substring(0, 11)
            let appointDate2 = appointmetnScheduled.substring(13, 19)

            const correctedAppointmentScheduled = appointDate1 + strHours + appointDate2
            console.log("corrected appointment schedule.. " + correctedAppointmentScheduled)



            const appointment = {
                "clientId": clientId2,
                "dentistId": dentistId2,
                "appointmentDateAndTime": correctedAppointmentScheduled
            }
            console.log("btnGetExact...")
            console.log(clientId2 + "|" + dentistId2 + "|" + correctedAppointmentScheduled)
            const url1 = `${urlLocal}/appointment/getExact`
            const response = await axios(url1, {
                method: "POST",
                mode: "cors",
                data: appointment,
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }).then((response2) => {
                console.log(response2.data)
                const response2data = response2.data
                setSingleAppointment(response2data)
                setAppointments(null)
            }).catch((error) => { console.log(error.message) })
        }

    }

    const handleDateTimeLocalChange = (e) => {

        const pickerDateTime = e.target.value
        console.log("pickerDateTime.." + pickerDateTime)
        let dateTimeString = pickerDateTime.substring(0, 10) + " " + pickerDateTime.substring(11, 16) + ":00"
        console.log(dateTimeString)
        document.getElementById("appointmentDateAndTime").value = dateTimeString

    }

    const getAppointmentByClientId = async (e, clientId2) => {
        e.preventDefault()

        console.log(clientId2)
        //clientId2=document.getElementById("inputClientParam").value
        const url2 = `${urlLocal}/appointment/client/${clientId2}`
        console.log(url2)
        const response2 = await axios(url2,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }

            }
        ).then((response2) => {
            const response2data = response2.data
            console.log("izlistaj zakazane appointmente")
            console.log(response2data)
            setAppointments(response2data)
            setSingleAppointment(null)

        }).catch((error) => { console.log(error.message) })
    }

    const getAppointmentByDentistId = async (e, dentistId2) => {

        console.log(dentistId2)
        const url2 = `${urlLocal}/appointment/dentist/${dentistId2}`
        console.log(url2)
        const response2 = await axios(url2, {
            method: "GET",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response2) => {

            console.log(response2)
            const response2data = response2.data
            console.log(response2data)
            setAppointments(response2data)
            setSingleAppointment(null)
        }
        ).catch((error) => { console.log(error) })


    }

    useEffect(() => {
        console.log("use effect...")

        const currDate = new Date()

        let yyyy = currDate.getFullYear().toString()
        let MM = (currDate.getMonth() + 1).toString()
        if (MM.length == 1) { MM = "0" + MM }
        let dd = currDate.getDate().toString()
        if(dd.length==1){
            dd="0"+dd
        }
        let hh = (currDate.getHours()).toString()
        if (hh.length == 1) {
            hh = "0" + hh
        }
        let mm = currDate.getMinutes().toString()
        if (mm.length == 1) { mm = "0" + mm }
        let currentDate3 = yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm
        console.log("currentDate3: " + currentDate3)
        //let currentDate2=new Date(yyyy,MM,dd,hh,mm)
        //currentDate2.setTime(currentDate2.getTime()+(4*60*60*1000))

        console.log("current date and time: " + currentDate3.toString())
        //const currentDate3="2025-04-28 22:00"

        document.getElementById("datetime-local-3").value = currentDate3
        setAppointmentStateScheduled(currentDate3)



    }, [])
    return (
        <div className="appointmentPage">
            <h1>Appointment page</h1>
            <button onClick={handleCreateNewAppointment}>Create New Appointment</button>
            <form action="submit" onSubmit={handleSubmit}>
                {singleAppointment === null &&
                    <div>
                        <fieldset id="fsDone">
                            <input type="radio" value="null" name="fsDone" id="radioAll" defaultChecked="checked" className="inputRadio"  onClick={e => { setDone(null) }} /><label>All</label>
                            <input type="radio" value="false" name="fsDone" id="radioNotDone" className="inputRadio" onClick={e => { setDone(false) }} /><label>Not completed</label>
                            <input type="radio" value="true" name="fsDone" id="radioDone" className="inputRadio" onClick={e => { setDone(true) }} /><label>Completed</label>
                        </fieldset>

                    </div>}

                <input type="datetime-local" id="datetime-local-3" onChange={handleDateTimeLocalChange} />
                <input type="text" placeholder="appointmentDateAndTime" id="appointmentDateAndTime"  />


                <select id="selectClient" className="select1">
                    <option id="clientId" value="id">Client ID: </option>
                    <option id="clientFullName" value="name">Client Full Name: </option>
                    <option id="clientContact" value="contact">Contact: </option>
                </select>
                <input type="text" id="inputClientParam" placeholder="Client: " onChange={e => {
                    setClientParam(e.target.value)
                    console.log(clientParam)


                }} />



                <select id="selectDentist" className="select1">
                    <option id="dentistId" value="id">Dentst ID: </option>
                    <option id="dentistFullName" value="name">Dentist Full Name: </option>
                    <option id="dentistContact" value="contact">Contact: </option>
                </select>

                <input type="text" id="inputDentistParam" placeholder="Dentist: " onChange={e => {
                    setDentistParam(e.target.value)
                    console.log(dentistParam)
                }
                } />
                <br />
                <button type="submit" id="btnGetExact">Get Exact</button>
                <button type="submit" id="btnGetAll">Get All</button>
                <button type="submit" id="btnGetByClient">Get By Client</button>
                <button type="submit" id="btnGetByDentist">Get By Dentist</button>
                
            </form>
            {done != null && <AppointmentList appointments={appointments} done={done} />}
            {done == null && <AppointmentList appointments={appointments} done={done} />}
            {singleAppointment != null && <AppointmentDetail2 singleAppointment={singleAppointment} />}
            
            




        </div>
    );
}

export default Appointment;