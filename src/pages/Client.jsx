import { useState } from "react"

import ClientList from "../components/ClientList"
import { useTheme } from "../contexts/ThemeContext"
import { useJwt } from "../contexts/JwtContext"
import ClientDetail from "../components/ClientDetail"
import ClientDetail2 from "../components/ClientDetail2"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

const Client = () => {
    

    
    
    const {jwt2}=useJwt();
    const [clients, setClients]=useState(null)
    const [item,setItem]=useState(null)
    const [clientsListVisible, setClientListVisible]=useState(false)
    const [clientDetailsVisible, setClientDetailsVisible]=useState(false)

    const navigate=useNavigate()

    const handleGetAll=async()=>{
    
        window.alert("handle click...")   
        console.log(jwt2) 
        
  //      const jwt1="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28xIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQyNDk1OTc3LCJpYXQiOjE3NDI0OTIzNzd9.QVxNzsrx0QcR0D-L8BG0dOHz5iEurKtidHDkm19hxBU"


      
        const response=await fetch(`http://localhost:8080/client/getall`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
                }
                
                
            }
        )

        console.log("Response is:\n")
        console.log(response)
        const json1=await response.json()
        console.log(json1)
        setClients(json1)
        setClientListVisible(true)
        setClientDetailsVisible(false)
           
        
          
           
    }        


    const handleClick3=async()=>{
//const jwt1="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb28xIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQyNDk1OTc3LCJpYXQiOjE3NDI0OTIzNzd9.QVxNzsrx0QcR0D-L8BG0dOHz5iEurKtidHDkm19hxBU"

        const response=await fetch(`http://127.0.0.1:8080/api/users/test`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
                }

        });
        console.log(response);
        const json1=await response.json()
        console.log(json1)

      
    }

    const handleFindByClientId= async ()=>{
        
        const clientId=document.getElementById("clientId").value
        console.log(jwt2)

        const response=await fetch(`http://localhost:8080/client/id/${clientId}`,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }

        )
        console.log(response)
        if(response.status===204){
            window.alert("There is no client ID "+clientId)
            return
        }
        const clientJson=await response.json()
        console.log(clientJson)
        console.log("client id..."+clientJson.clientId+"| client full name: "+clientJson.fullName+"| contact: "+clientJson.contact+"| note: "+clientJson.note)
        
        setItem(clientJson)
        setClientListVisible(false)
        setClientDetailsVisible(true)
        
        
    }

    const handleGetByContact=async()=>{
        

        const contact=document.getElementById("contact").value
        console.log(contact)

        const response=await fetch(`http://localhost:8080/client/contact/${contact}`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(response)
        const data=await response.json()
        console.log(data)
        setItem(data)
        setClientListVisible(false)
        setClientDetailsVisible(true)
    }

    const handleFindByClientFullName=async()=>{
        const fullName=document.getElementById("fullName").value
        const respose=await fetch(`http://localhost:8080/client/name/${fullName}`,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    'Authorization': `Bearer ${jwt2}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(respose)
        const data=await respose.json()
        console.log(data)
        setClients(data)
        setClientListVisible(true)
        setClientDetailsVisible(false)

    }
    

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log("handle submit...")
        console.log(e.nativeEvent.submitter.id)
        const clientAttribute=document.getElementById("select1").value
        const clientAttributeValue=document.getElementById("clientAttributeValue").value

        console.log(clientAttribute)
        console.log(clientAttributeValue)

        const url=`http://localhost:8080/client/${clientAttribute}/${clientAttributeValue}`
        console.log(url)
        const response=await axios(url,{
            method:"GET",
            mode:"cors",
            headers:{
                'Authorization': `Bearer ${jwt2}`,
                'Content-Type': 'application/json',
            }
        }).then((response)=>{

            const data=response.data
            if(clientAttribute==="id" || clientAttribute==="contact"){
                
                console.log(data)
                setItem(data)
                setClientListVisible(false)
                setClientDetailsVisible(true)
            }
            if(clientAttribute==="name"){
                console.log(data.length)
                if(data.length>1){
                    window.alert("mulitple answers")
                    return
                }
                setClients(data)
                setClientListVisible(true)
                setClientDetailsVisible(false)

            }
            
            
            
            
            
        }).catch((error)=>{console.log(error.message)})
        
    }
    const handleAddNewClient=()=>{
       navigate("/addNewClient")
    }
    return ( 
        <>
        <h1>Client page</h1>
        
        <input type="text" placeholder="ClientID: " id="clientId" />
        <input type="text" placeholder="Full Name: " id="fullName" />
        <input type="text" placeholder="Contact: " id="contact" />
        <textarea id="note" placeholder="Note: " ></textarea>
        <button id="btnFindByClientId" onClick={handleFindByClientId}>Find By Client ID</button>
        <button id="btnAddNewClient" onClick={handleAddNewClient}>Add New Client</button>
        <button id="btnFindByClienFullName" onClick={handleFindByClientFullName}>Find By Name</button>
        <br />
        <form action="submit" onSubmit={handleSubmit}>
        <select id="select1">
            <option value="id">Clent ID: </option>
            <option value="name">Full Name: </option>
            <option value="contact">Contact: </option>
        </select>
        <input type="text" id="clientAttributeValue" placeholder="Enter search parameter value: "/>
        <button type="submit" id="btnGetClient">Get Client</button>
        </form>
        <button onClick={handleGetAll}>Get All</button>
        <button onClick={handleGetByContact}>Find By Contact</button>
        <button onClick={handleClick3}>Test</button>
        
        <div>
            {clientDetailsVisible && item && <ClientDetail2 item={item}/> }  
        </div>
       
        <div>
            {clientsListVisible && <ClientList clients={clients}/>}
        

        </div>
        
    
        </>
     );
}
 
export default Client;