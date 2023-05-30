import React, { useState } from "react";
import "./addExpensePopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import {FaAudioDescription ,FaRegMoneyBillAlt} from 'react-icons/fa'

export default function ExpensePopup(props) {
  const [description, setDescription] = useState("");
  const [amount, setamount] = useState("");


  const addExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "expense/addExpense",
        {
          description,
          amount,
       
        },
      
        
      );

      toast.success("Expense was added");
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
    document.querySelector(".expense-popup").close();
    document.getElementById("addForm").reset();

  }
 
  return (


  <dialog className="expense-popup" id='modal'>
    <div className="containerPopup">
<div className="popUp">
      <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
      <h2 className="formTitle">New Expense</h2>

      <form action="POSTToastContainer" method="dialog" id="addForm">
        <fieldset>
          <label>Description</label>
          <input
            type="text"
            placeholder="Example:Rent"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
<FaAudioDescription className="iconForm"/>      
  </fieldset>
        <fieldset>
          <label>Amount</label>
          <input
            type="text"
            required
            placeholder="Example:300"

            onChange={(e) => setamount(e.target.value)}
          />
          <FaRegMoneyBillAlt className="iconForm"/>      

        </fieldset>

          <div className="btnsGrp">
          <button onClick={closePopup} className='closeBtn'>Close</button>  
          <button onClick={addExpense} className="createBtn">Create</button>

</div>
       
      </form>
    
      <ToastContainer />
        </div>
    </div> 
    </dialog>
  );
}
