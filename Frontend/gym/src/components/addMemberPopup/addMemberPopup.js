import React, { useState } from "react";
import "./addMemberPopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose  , AiOutlineUserAdd} from "react-icons/ai";
import {BsTelephonePlus} from 'react-icons/bs';


export default function MemberPopup(props) {
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const[gender,setGender]=useState("");
  const[army,setArmy]=useState("");
  const[date,setDate]=useState ("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [address,setAddress]=useState("")


  const addMember = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "member/addMember",
        {
          first_name, 
          middle_name,
          last_name,
          phone,
          gender,
          date,
          address,
          emergencyPhone,
          army,
        },
      
        
      );
console.log(response)
      toast.success("Member was added");
      setTimeout(() => {
        toast.dismiss();
        closePopup();
        document.getElementById("addForm").reset();
        props.getData()
      }, 1000);
    } catch (error) {
      // toast.error("Values entered are invalid");
      toast.error(error);
      console.log(error)

      setTimeout(() => {
        toast.dismiss();
        document.getElementById("addForm").reset();
      }, 1000);
    }
  };
  function closePopup() {
    document.querySelector(".member-popup").close();
    document.getElementById("addForm").reset();

  }
 
  return (


  <dialog className="member-popup" id='modal'>
    <div className="containerPopup">
<div className="popUp">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <h2 className="formTitle">New Member</h2>
  
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

        <fieldset>
          <label>Emergency Phone</label>
      <input
  type="number"
  required
  placeholder="Example:71012345"
  onChange={(e) => setEmergencyPhone(e.target.value)}
/>
<BsTelephonePlus className="iconForm" />
      

        </fieldset>
        <fieldset>
          <label>Birthday</label>
      <input
  type="date"
  required
  placeholder="Example: 4/4/2001"
  minLength={8}
  pattern="[0-9]{8}"
  onChange={(e) => setDate(e.target.value)}
/>
      

        </fieldset>
        <fieldset>
          <label>Address</label>
          <input
            type="text"
            required
            placeholder="Example:Lebanon"
            onChange={(e) => setAddress(e.target.value)}
          />
          <AiOutlineUserAdd className="iconForm"/>      

        </fieldset>


        <div className="select-container">
  <fieldset>
    <label>Gender</label>
    <select value={gender} onChange={(e) => setGender(e.target.value)} className="selectForm">
    <option value="gender"></option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </fieldset>

  <fieldset className="army">
    <label>Army</label>
    <select value={army} onChange={(e) => setArmy(e.target.value)} className="selectForm">
      <option value="army"></option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </fieldset>
</div>




     
          <div className="btnsGrp">
          <button onClick={closePopup} className='closeBtn'>Close</button>  
          <button onClick={addMember} className="createBtn">Create</button>

</div>
       
      </form>
    
      <ToastContainer />
        </div>
    </div> 
    </dialog>
  );
}
