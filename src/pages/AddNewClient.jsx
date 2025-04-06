import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";

const AddNewClient = () => {


    
    let {jwt2}=useJwt();
    const[fullName,setFullName]=useState("")
    const[contact,setContact]=useState("")
    const[note,setNote]=useState("")

    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(e.nativeEvent.submitter.id)
        if (e.nativeEvent.submitter.id==="btnSave"){
            console.log("handle save")

            const response=await fetch(`http://localhost:8080/client`,{
                method:"POST",
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
            })
console.log(response)
    const json1=await response.json();
    console.log("Successfuly added: ")
    console.log(json1)
    console.log(json1.clientId+"|"+json1.fullName+"|"+json1.contact+"|"+json1.note)
    window.alert(`A new client successfully added: \n${json1.clientId}\n${json1.fullName}\n${json1.contact}\n${json1.note}`)


        }
        if(e.nativeEvent.submitter.id==="btnCancel"){
            console.log("handle cancel")
            navigate("/client")
        }


    }

    return ( 
        <>
        <h1>Add New Client</h1>
        
        <form action="submit" onSubmit={handleSubmit}>
            <input type="text" id="inputFullName" 
            placeholder="Full Name: " value={fullName} 
            onChange={e=>{
                setFullName(e.target.value)}}/>
            <input type="text" id="inputContact" 
            placeholder="Contact: " 
            value={contact} 
            onChange={e=>{
                setContact(e.target.value)
            }}/>
            <textarea id="textareaNote" 
            placeholder="Note: " 
            value={note} onChange={e=>{
                setNote(e.target.value)
            }}
            ></textarea>
            <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnCancel">Cancel</button>
            
        </form>
        </>
     );
}
 
export default AddNewClient;