import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "../styles/AppointmentDetail.scss"

const AppointmentDetail = (prop) => {
    const item = prop.item

    const navigate = useNavigate()

    let hours = parseInt(item.appointmentDateAndTime.substring(11, 13))
    hours = hours + 4   // timezone correction
    let newHours = hours.toString()
    if (hours < 10) {
        newHours = "0" + newHours
    }
    let appointDate1 = item.appointmentDateAndTime.substring(0, 11)
    let appointDate2 = item.appointmentDateAndTime.substring(13, 19)

    console.log(appointDate1)
    console.log(appointDate2)
    console.log(newHours)
    const correctedAppointmentScheduled = appointDate1 + newHours + appointDate2


    console.log("hours:" + hours)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.nativeEvent.submitter.id)

        if (e.nativeEvent.submitter.id === "btnUpdate2") {
            navigate(`/updateAppointment/${item.appointmentId}`)
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

    return (<div className="appointmentDetail">

        <table>
            <th colSpan="2">Appointment details: </th>
            <tbody>
            <tr>
                <td className="left">ID: </td><td className="right">{item.appointmentId}</td>
            </tr>
            <tr>
                <td className="left">Client name: </td><td className="right">{item.client.fullName}</td>
            </tr>
            <tr>
                <td className="left">Scheduled: </td><td className="right">{correctedAppointmentScheduled.substring(0, 10) + " " + correctedAppointmentScheduled.substring(11, 16)}</td>
            </tr>
            <tr>
                <td className="left">Description: </td><td className="right">{item.description}</td>
            </tr>
            <tr>
                <td className="left">Dentist: </td><td className="right">{item.dentist.fullName}</td>
            </tr>
            <tr>
                <td className="left">Completed: </td><td className="right">{item.completed ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="left">Price: </td><td className="right">{item.price ? item.price : "0"}</td>
            </tr>
            </tbody>

        </table>

        <form action="submit" onSubmit={handleSubmit}>
            <button type="submit" id="btnUpdate2">Edit</button>
        </form>
    </div>);
}

export default AppointmentDetail;