import { useEffect } from "react";
import { useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";

const UpdateClient = () => {

    

    let {id}=useParams()

    const{jwt2}=useJwt()

    //const [clientId, setClientId]=useState(null)
    const [fullName,setFullName]=useState("")
    const [contact,setContact]=useState("")
    const [note,setNote]=useState("")

    const navigate=useNavigate()

    const getClientById=async(e)=>{
        console.log("get client by id..."+id)
        const response=await fetch(`http://localhost:8080/client/id/${id}`,
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
        const clientJson=await response.json()
        console.log("client json...")
        console.log(clientJson)
        
        console.log(clientJson.fullName)
        console.log(clientJson.contact)
        console.log(clientJson.note)

        setFullName(clientJson.fullName)
        setContact(clientJson.contact)
        setNote(clientJson.note)
        return "aaaaa"
        

    }

    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(e)
        console.log("submitter...")
        console.log(e.nativeEvent.submitter.id)

        if(e.nativeEvent.submitter.id==="btnSave"){
        const response=await fetch(`http://localhost:8080/client/${id}`, {
            method:"PUT",
            mode:"cors",
            body:JSON.stringify({
             fullName:fullName,
             contact:contact,
             note:note
               
            }),
            headers:{
             'Authorization': `Bearer ${jwt2}`,
             'Content-Type': 'application/json',
         }
         });
         console.log(response)
         const clientJson=await response.json()
         console.log(clientJson)
        console.log(e)
    }


    if(e.nativeEvent.submitter.id==="btnBack"){
        window.alert("back")
        navigate("/client")
    }

    if(e.nativeEvent.submitter.id==="btnDelete"){
        window.alert("delete")

        console.log(id)

        const response=await fetch(`http://localhost:8080/client/${id}`,
            {
                method:"DELETE",
                mode:"cors",
                headers:{
                 'Authorization': `Bearer ${jwt2}`,
                'Content-type': 'application/json'
                }
            }
        )
        console.log(response)
        const data=await response.json()
        console.log(data)


        
    }
}
   


    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")
       
        const odgovor=getClientById()
        console.log(odgovor)
        
        
        console.log("Client data: "+fullName+"|"+contact+"|"+note)
        
      }, []);
    

    
    return ( 
        <>
        <h1>client update</h1>
        <form action="submit" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name: " value={fullName} onChange={e=>{
                setFullName(e.target.value)
            }}/>
            <input type="text" placeholder="Contact: " value={contact} onChange={e=>{
                setContact(e.target.value)
            }}/>
            <textarea placeholder="Note: " value={note} onChange={e=>{
                setNote(e.target.value)
            }}></textarea>
            <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnBack">Back</button>
            <button type="submit" id="btnDelete">Delete</button>
            
            
        </form>
        </>
     );

}
 
export default UpdateClient;