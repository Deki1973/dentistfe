import { useState } from "react"
import DentistList from "../components/DentistList";
import DentistDetail from "../components/DentistDetail";

import { useJwt } from "../contexts/JwtContext"

import { Navigate, useNavigate } from "react-router-dom"

import "../styles/DentistPage.scss"
import { checkResponseStatus, urlHeroku, urlLocal } from "../script/script1";


const Dentist = () => {

    const { jwt2 } = useJwt();
    const [dentists, setDentists] = useState(null)
    const [item, setItem] = useState(null)
    const [dentistListVisible, setDentistListVisible] = useState(false)
    const [dentistDetailsVisible, setDentistDetailsVisible] = useState(false)

    const navigate = useNavigate()


    const handleGetAll = async () => {


        //window.alert("handle click...")
        //console.log(jwt2)

        //      const jwt1="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28xIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQyNDk1OTc3LCJpYXQiOjE3NDI0OTIzNzd9.QVxNzsrx0QcR0D-L8BG0dOHz5iEurKtidHDkm19hxBU"



        const response = await fetch(`${urlHeroku}/dentist/getall`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }


            }
        )

        console.log("Response is:\n")
        console.log(response)

        if (checkResponseStatus(response)===false){return}

        const json1 = await response.json()
        console.log(json1)

        setDentists(json1)
        setDentistListVisible(true)
        setDentistDetailsVisible(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setItem(null)
        setDentists(null)

        const dentistAttribute = document.getElementById("select1").value

        const attributeValue = document.getElementById("dentistAttribute").value

        const response = await fetch(
            `${urlHeroku}/dentist/${dentistAttribute}/${attributeValue}`,
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
        if(checkResponseStatus(response)===false){
            return
        }
        const data = await response.json()
        console.log(data)
        

        console.log("Dentists found:")
        console.log(dentists)
        if (dentistAttribute === "contact" || dentistAttribute === "id") {
            setItem(data)
            setDentistListVisible(false)
            setDentistDetailsVisible(true)
        }
        if (dentistAttribute === "name") {
            setDentists(data)
            setDentistListVisible(true)
            setDentistDetailsVisible(false)
        }




    }



    const handleAddNewDentist = () => {
        navigate("/addNewDentist")
    }
    return (
        <div className="dentistPage">
            <h1>Dentist</h1>
            <button onClick={handleAddNewDentist}>Add New</button>
            <button onClick={handleGetAll}>Get All</button>

            <form action="submit" onSubmit={handleSubmit}>
                <select id="select1" className="select1">
                    <option value="id">ID: </option>
                    <option value="name">Full Name: </option>
                    <option value="contact">Contact: </option>

                </select>
                <input type="text" id="dentistAttribute" placeholder="value" className="dentistAttributeValue" required/>


                <button type="submit" id="btnGetDentist">Get Dentist</button>
            </form>


            <br />



            <div>
                {dentistDetailsVisible && item && <DentistDetail item={item} />}
            </div>

            <div>
                {dentistListVisible && <DentistList dentists={dentists} />}


            </div>

        </div>
    );
}

export default Dentist;