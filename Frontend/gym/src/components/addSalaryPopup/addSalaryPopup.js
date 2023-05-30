import React, { useState, useEffect } from "react";
import "./addSalaryPopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

export default function SalaryPopup(props) {
  const [coach, setCoach] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setLastDate] = useState("");
  const [Data, setData] = useState(null);
  const [DataCoach, setDataCoaches] = useState([]);

  const getDataCoaches = () => {
    axios
      .get(`coach/getCoaches`)
      .then((response) => {
        console.log(response);
        setDataCoaches(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getDataCoaches();
  }, []);




  const addSalary = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "salary/addSalary",
        {
          coach,
          amount,
        },
      );

      toast.success("Salary was added");
      setTimeout(() => {
        toast.dismiss();
        closePopup();
        document.getElementById("addForm").reset();
        props.getData();
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
    document.querySelector(".salary-popup").close();
    document.getElementById("addForm").reset();
  }

  return (
    <dialog className="salary-popup" id="modal">
      <div className="containerPopup">
        <div className="popUp">
          <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
          <h2 className="formTitle">New Salary</h2>

          <form action="POSTToastContainer" method="dialog" id="addForm">
            <fieldset>
              <label>Coach</label>
              <select
              name="coach"
  required
  value={coach}
  onChange={(e) => setCoach(e.target.value)}
  className="selectForm"

  
>
  {DataCoach.map((c) => (
    <option key={c._id} value={c._id}>
      {`${c.first_name} ${c.last_name}`}
    </option>
  ))}
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

            <div className="btnsGrp">
              <button onClick={closePopup} className="closeBtn">Close</button>
              <button onClick={addSalary} className="createBtn">Create</button>
            </div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </dialog>
  );
}
