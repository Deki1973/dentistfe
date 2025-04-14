import { useEffect } from "react";
import { useState} from "react";
import { Navigate, useParams } from "react-router-dom";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";

const UpdateDentist = () => {

    let {id}=useParams()

    const{jwt2}=useJwt()

    const [fullName,setFullName]=useState("")
    const [contact,setContact]=useState("")
    

    const navigate=useNavigate()

    const getDentistById=async(e)=>{
        console.log("get dentist by id..."+id)
        const response=await fetch(`http://localhost:8080/dentist/id/${id}`,
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
        console.log("dentist json...")
        console.log(data)
        
        console.log(data.fullName)
        console.log(data.contact)
        

        setFullName(data.fullName)
        setContact(data.contact)
        
        return "aaaaa"
        

    }

    const handleSubmit=async(e)=>{
        e.preventDefatult()
        const eventSubmitter=e.nativeEvent.submitter.id
        console.log(eventSubmitter)
    }

    useEffect(() => {
        //const singleBook = books.filter((item) => item?._id == id);
        //console.log(singleBook);
        console.log("use effect...")
       
        const odgovor=getDentistById()
        console.log(odgovor)
        
        
        console.log("Dentist data: "+fullName+"|"+contact)
        
      }, []);


    return ( 
        <>
        <h1>Update Dentist</h1>
        <p>Dentist ID: {id}</p>
        <p>Full Name: {fullName}</p>
        <p>Contact: {contact}</p>
        <form action="submit" onSubmit={handleSubmit}>
        <button type="submit" id="btnSave">Save</button>
            <button type="submit" id="btnBack">Back</button>
            <button type="submit" id="btnDelete">Delete</button>
        </form>
        </>
     );
}
 
export default UpdateDentist;