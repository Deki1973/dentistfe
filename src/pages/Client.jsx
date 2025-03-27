import { useState } from "react"

import ClientList from "../components/ClientList"
import { useTheme } from "../contexts/ThemeContext"
import { useJwt } from "../contexts/JwtContext"

const Client = () => {

    
    
    const {jwt2}=useJwt();
    const [clients, setClients]=useState(null)

    const handleClick2=async()=>{
    
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

    return ( 
        <>
        <h1>Client page</h1>
        
        <button onClick={handleClick2}>Get All</button>
        <button onClick={handleClick3}>Test</button>
        <div>
            <ClientList clients={clients}/>

        </div>
        
    
        </>
     );
}
 
export default Client;