import React, { useState, useEffect } from "react";
import "./addDebtPopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

export default function PrgramPopup(props) {
  const [member, setMember] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState(null);
  const [category, setCategory] = useState(null);
  const [DataMember, setDataMembers] = useState([]);
  const [DataProgram, setDataPrograms] = useState([]);
  const[notes,setNotes]=useState([]);
  const [amount,setAmount]=useState([]);



  const getDataMembers = () => {
    axios
      .get(`member/getMembers`)
      .then((response) => {
        console.log(response);
        setDataMembers(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getDataMembers();
  }, []);




  const addMembership = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("debt/addDebt", {
        member,
        amount,
       notes,

      });
      
      console.log(response)

      toast.success("Debt was added");
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
    document.querySelector(".debt-popup").close();
    document.getElementById("addForm").reset();
  }

  return (
    <dialog className="debt-popup" id="modal">
      <div className="containerPopup">
        <div className="popUp">
          <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
          <h2 className="formTitle">New Debt</h2>

          <form action="POSTToastContainer" method="dialog" id="addForm">
          <fieldset>
  <label>Member</label>
  <select
    name="member"
    required
    value={member}
    onChange={(e) => setMember(e.target.value)}
    className="selectForm"
  >
    {DataMember.length > 0 && (
      <>
        <option value="">Select a member</option> {/* First option */}
        {DataMember.map((c) => (
          <option key={c._id} value={c._id}>
            {`${c.first_name} ${c.middle_name} ${c.last_name}`}
          </option>
        ))}
      </>
    )}
  </select>
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

            <fieldset>
              <label>Description</label>
              <input
                type="text"
                required
                placeholder="Example: 300"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <FaRegMoneyBillAlt className="iconForm" />
            </fieldset>

            <div className="btnsGrp">
              <button onClick={closePopup} className="closeBtn">Close</button>
              <button onClick={addMembership} className="createBtn">Create</button>
            </div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </dialog>
  );
}
