import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";

const AddNewDentist = () => {

  let {jwt2}=useJwt();
  const[fullName,setFullName]=useState("")
  const[contact,setContact]=useState("")
 
  const navigate=useNavigate()

const handleSubmit=async (e)=>{
  e.preventDefault()

  if(e.nativeEvent.submitter.id==="btnCancel"){
    console.log("handle cancel")
    navigate("/dentist")
}

if (e.nativeEvent.submitter.id==="btnSave"){
  console.log("handle save")
}

const response=await fetch(`http://localhost:8080/dentist`,{
  method:"POST",
  mode:"cors",
  body:JSON.stringify({
      fullName:fullName,
      contact:contact,

  }),
  
      headers:{
          'Authorization': `Bearer ${jwt2}`,
          'Content-Type': 'application/json',
      }
})
console.log(response)
const data=await response.json();
console.log("Successfuly added: ")
console.log(data)
window.alert(`A new dentist successfully added: \n${data.dentistId}\n${data.fullName}\n${data.contact}`)
}

    return (
        <>
        
        <h1>Add new dentist</h1>
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
  <button type="submit" id="btnSave">Save</button>
  <button type="submit" id="btnCancel">Cancel</button>

        </form>
        </>
      );
}
 
export default AddNewDentist;