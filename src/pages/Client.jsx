import { useState } from "react"

import ClientList from "../components/ClientList"

import { useJwt } from "../contexts/JwtContext"

import ClientDetail2 from "../components/ClientDetail2"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { checkResponseStatus, urlHeroku, urlLocal } from "../script/script1"

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
        //console.log(jwt2)

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
        
        checkResponseStatus(response)

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

        const url = `${urlLocal}/client/${clientAttribute}/${clientAttributeValue}`

        console.log(url)
        const response = await axios(url, {
            method: "GET",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {

            /*
            console.log("response is: "+response)
            console.log("response data is: "+response.data)
            console.log("response.status is "+response.status)
*/
            

           if(checkResponseStatus(response)===false){
            setItem(null)
           }
/*
            if (response.status === 204 || response.data==0 || response.data==="" || response.data===null) {
                window.alert("There is no client with given parameter.")
                setItem(null)
                return
            }

  */          

           
            const data = response.data


            if (clientAttribute === "id" || clientAttribute === "contact") {
                // vracaju samo jedan objekat kao odgovor

                setItem(data)
                setClientListVisible(false)
                setClientDetailsVisible(true)
            }
            if (clientAttribute === "name") {
                // moze da vrati listu objekata kao odgovor
                // zato sam upotrebio dve komponente za prikaz detalja o pacijentu
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





        }).catch((error) => { 
            //console.log("Oops! Error: "+error.message) 
            checkResponseStatus(error)  // proverava se error.status
            
        })

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