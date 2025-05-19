import { useState } from "react"

import ClientList from "../components/ClientList"

import { useJwt } from "../contexts/JwtContext"

import ClientDetail2 from "../components/ClientDetail2"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { urlHeroku, urlLocal } from "../script/urls"

import "../styles/ClientPage.scss"

const Client = () => {




    const { jwt2 } = useJwt();
    const [clients, setClients] = useState(null)
    const [item, setItem] = useState(null)
    const [clientsListVisible, setClientListVisible] = useState(false)
    const [clientDetailsVisible, setClientDetailsVisible] = useState(false)

    const navigate = useNavigate()

    const handleGetAll = async () => {

        //window.alert("handle click...")   
        console.log(jwt2)

        //      const jwt1="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28xIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQyNDk1OTc3LCJpYXQiOjE3NDI0OTIzNzd9.QVxNzsrx0QcR0D-L8BG0dOHz5iEurKtidHDkm19hxBU"



        const response = await fetch(`${urlLocal}/client/getall`,
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
        const json1 = await response.json()
        console.log(json1)
        setClients(json1)
        setClientListVisible(true)
        setClientDetailsVisible(false)




    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log("handle submit...")
        console.log(e.nativeEvent.submitter.id)


        const clientAttribute = document.getElementById("select1").value
        const clientAttributeValue = document.getElementById("clientAttributeValue").value

        //console.log(clientAttribute)
        //console.log(clientAttributeValue)

        const url = `http://localhost:8080/client/${clientAttribute}/${clientAttributeValue}`

        console.log(url)
        const response = await axios(url, {
            method: "GET",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {


            if (response.status === 204) {
                window.alert("There is no client with given parameter.")
                return
            }
            const data = response.data


            if (clientAttribute === "id" || clientAttribute === "contact") {
                // vracaju samo jedan objekat kao odgovor

                setItem(data)
                setClientListVisible(false)
                setClientDetailsVisible(true)
            }
            if (clientAttribute === "name") {
                // moze da vrati listu objekata kao odgovor
                console.log(data.length)
                /*
                if(data.length>1){
                    window.alert("mulitple answers")
                    return
                }
                    */
                setClients(data)
                setClientListVisible(true)
                setClientDetailsVisible(false)

            }





        }).catch((error) => { console.log(error.message) })

    }
    const handleAddNewClient = () => {
        navigate("/addNewClient")
    }
    return (
        <div className="clientPage">
            <h1>Client</h1>



            <button id="btnAddNewClient" onClick={handleAddNewClient}>Add New</button>
            <button onClick={handleGetAll} id="btnGetAll">Get All</button>
            <br />
            <form action="submit" onSubmit={handleSubmit}>

                <select id="select1" className="select1">
                    <option value="id">Clent ID: </option>
                    <option value="name">Full Name: </option>
                    <option value="contact">Contact: </option>
                </select>
                <input type="text" id="clientAttributeValue" className="clientAttributeValue" placeholder="Enter search parameter value: " required="true" />
                <button type="submit" id="btnGetClient">Get Client</button>


            </form>



            <div>
                {clientDetailsVisible && item && <ClientDetail2 item={item} />}
            </div>

            <div>
                {clientsListVisible && <ClientList clients={clients} />}


            </div>


        </div>
    );
}

export default Client;