import { useState } from "react";
import { useJwt } from "../contexts/JwtContext";
import { useNavigate } from "react-router-dom";

import { checkResponseStatus, urlHeroku,urlLocal } from "../script/script1";

import "../styles/AddNewDentist.scss"

const AddNewDentist = () => {

  let { jwt2 } = useJwt();
  const [fullName, setFullName] = useState("")
  const [contact, setContact] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (e.nativeEvent.submitter.id === "btnCancel" || e.nativeEvent.submitter.id === "btnBack") {
      console.log("handle cancel ")
      navigate("/dentist")
    }

    if (e.nativeEvent.submitter.id === "btnSave") {
      console.log("handle save")
      const response = await fetch(`${urlLocal}/dentist`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          fullName: fullName,
          contact: contact,

        }),

        headers: {
          'Authorization': `Bearer ${jwt2}`,
          'Content-Type': 'application/json',
        }
      })
      console.log(response)
      if(checkResponseStatus(response)===false){
        return
      }
      const data = await response.json();
      console.log("Successfuly added: ")
      console.log(data)
      window.alert(`A new dentist successfully added: \n${data.dentistId}\n${data.fullName}\n${data.contact}`)

    }


  }

  return (
    <div className="addNewDentist">

      <h1>Add new dentist</h1>
      <form action="submit" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Full Name: </td><td><input type="text" id="inputFullName"
                placeholder="Full Name: " value={fullName}
                required
                onChange={e => {
                  setFullName(e.target.value)
                }} /></td>
            </tr>
            <tr>
              <td>Contact: </td><td>  <input type="text" id="inputContact"
                placeholder="Contact: "
                value={contact}
                required
                onChange={e => {
                  setContact(e.target.value)
                }} /></td>
            </tr>
          </tbody>
        </table>



        <button type="submit" id="btnSave">Save</button>
        <button type="submit" id="btnBack">Back</button>
        <button type="submit" id="btnCancel">Cancel</button>

      </form>
    </div>
  );
}

export default AddNewDentist;