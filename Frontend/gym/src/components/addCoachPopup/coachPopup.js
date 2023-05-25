import React, { useState } from "react";
import "./coachPopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose  , AiOutlineUserAdd} from "react-icons/ai";
import {BsTelephonePlus} from 'react-icons/bs'

export default function CoachPopup(props) {
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const addCoach = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "coach/addCoach",
        {
          first_name,
          middle_name,
          last_name,
          phone
        },
      
        
      );

      toast.success("Coach was added");
      setTimeout(() => {
        toast.dismiss();
        closePopup();
        document.getElementById("addForm").reset();
        props.getData()
      }, 1000);
    } catch (error) {
      toast.error("Values entered are invalid");
      setTimeout(() => {
        toast.dismiss();
        document.getElementById("addForm").reset();
      }, 1000);
    }
  };
  function closePopup() {
    document.querySelector(".coach-popup").close();
    document.getElementById("addForm").reset();

  }
 
  return (


  <dialog className="coach-popup" id='modal'>
    <div className="containerPopup">
<div className="popUp">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <h2 className="formTitle">New Coach</h2>

      <form action="POSTToastContainer" method="dialog" id="addForm">
        <fieldset>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Example:Ahmad"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
<AiOutlineUserAdd className="iconForm"/>      
  </fieldset>
        <fieldset>
          <label>Middle Name</label>
          <input
            type="text"
            required
            placeholder="Example:Mahmoud"

            onChange={(e) => setMiddleName(e.target.value)}
          />
          <AiOutlineUserAdd className="iconForm"/>      

        </fieldset>

        <fieldset>
          <label>Last Name</label>
          <input
            type="text"
            required
            placeholder="Example:Mazloum"
            onChange={(e) => setLastName(e.target.value)}
          />
          <AiOutlineUserAdd className="iconForm"/>      

        </fieldset>
        <fieldset>
          <label>Phone</label>
      <input
  type="number"
  required
  placeholder="Example: 71012345"
  minLength={8}
  pattern="[0-9]{8}"
  onChange={(e) => setPhone(e.target.value)}
/>
<BsTelephonePlus className="iconForm" />
      

        </fieldset>
     
          <div className="btnsGrp">
          <button onClick={closePopup} className='closeBtn'>Close</button>  
          <button onClick={addCoach} className="createBtn">Create</button>

</div>
       
      </form>
    
      <ToastContainer />
        </div>
    </div> 
    </dialog>
  );
}
