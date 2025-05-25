import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";
import "../styles/UpdateDentist.scss"

const UpdateDentist = () => {

    let { id } = useParams()

    const { jwt2 } = useJwt()

    const [dentistId, setDentistId] = useState(null)
    const [fullName, setFullName] = useState("")
    const [contact, setContact] = useState("")



    const navigate = useNavigate()

    const getDentistById = async (e) => {
        console.log("get dentist by id..." + id)
        const response = await fetch(`${urlHeroku}/dentist/id/${id}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(response)
        const data = await response.json()
        console.log("dentist json...")
        console.log(data)

        console.log(data.fullName)
        console.log(data.contact)


        setFullName(data.fullName)
        setContact(data.contact)
        setDentistId(data.dentistId)



    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("handle submit...")
        console.log(e.nativeEvent.submitter.id)

        if (e.nativeEvent.submitter.id === "btnSave") {
            const response = await fetch(`urlHeroku/dentist/${id}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify({
                    fullName: fullName,
                    contact: contact,

                }),
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            const data = await response.json()
            console.log(data)
            console.log(e)
        }


        if (e.nativeEvent.submitter.id === "btnBack") {
            navigate("/dentist")
        }


        if (e.nativeEvent.submitter.id === "btnDelete") {
            const message = `WARNING! This operation cannot be undone!\nAre you sure?`

            if (window.confirm(message) !== true) {
                return
            }

            console.log(id)

            const response = await fetch(`${urlHeroku}/dentist/${id}`,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        'Authorization': `Bearer ${jwt2}`,
                        'Content-type': 'application/json'
                    }
                }
            )
            console.log(response)
            const data = await response.json()
            console.log(data)
        }





    }

    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")

        const odgovor = getDentistById()
        console.log(odgovor)


        console.log("Dentist data: " + fullName + "|" + contact)

    }, []);


    return (
        <div className="updateDentist">
            <h1>Update Dentist</h1>

            <form action="submit" onSubmit={handleSubmit}>

                <table>
                    <tbody>
                        <tr>
                            <td className="left">Dentist ID: </td><td className="right">{dentistId}</td>
                        </tr>
                        <tr>
                            <td className="left">Full Name: </td>
                            <td className="right"><input type="text" placeholder="Full Name: " value={fullName} onChange={e => {
                                setFullName(e.target.value)
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="left">Contact: </td>
                            <td className="right">  <input type="text" placeholder="Contact: " value={contact} onChange={e => {
                                setContact(e.target.value)
                            }} /></td>
                        </tr>
                    </tbody>
                </table>



                <button type="submit" id="btnSave">Save</button>
                <button type="submit" id="btnBack">Back</button>
                <button type="submit" id="btnDelete">Delete</button>
            </form>
        </div>
    );
}

export default UpdateDentist;