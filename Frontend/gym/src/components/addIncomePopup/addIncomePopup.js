import React, { useState, useEffect } from "react";
import "./addIncomePopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

export default function PrgramPopup(props) {
  const [member, setMember] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState(null);
  const [DataMember, setDataMembers] = useState([]);
  const [DataProgram, setDataPrograms] = useState([]);
  const[priceLbp,setPriceLbp]=useState([]);
  const [amount,setAmount]=useState([]);






  useEffect(() => {
  }, []);

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("income/addIncome", {
       amount,
       description,
       priceLbp
      });
      
      console.log(response)

      toast.success("Income was added");
      setTimeout(() => {
        toast.dismiss();
        closePopup();
        document.getElementById("addForm").reset();
        props.getData();
      }, 1000);
    } catch (error) {
      toast.error(error);
      setTimeout(() => { 
        toast.dismiss();
        document.getElementById("addForm").reset();
      }, 1000);
    }
  };

  function closePopup() {
    document.querySelector(".income-popup").close();
    document.getElementById("addForm").reset();
  }

  return (
    <dialog className="income-popup" id="modal">
      <div className="containerPopup">
        <div className="popUp">
          <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
          <h2 className="formTitle">New Income</h2>

          <form action="POSTToastContainer" method="dialog" id="addForm">

<fieldset>
              <label>Description</label>
              <input
                type="text"
                required
                placeholder="Example:Payment for old membership"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FaRegMoneyBillAlt className="iconForm" />
            </fieldset>
<fieldset>
              <label>Amount</label>
              <input
                type="number"
                required
                placeholder="Example: 300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <FaRegMoneyBillAlt className="iconForm" />
            </fieldset>

            <div className="btnsGrp">
              <button onClick={closePopup} className="closeBtn">Close</button>
              <button onClick={addIncome} className="createBtn">Create</button>
            </div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </dialog>
  );
}
