import React, { useState, useEffect } from "react";
import "./addProgramPopup.css";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FaRegMoneyBillAlt } from 'react-icons/fa';

export default function PrgramPopup(props) {
  const [coach, setCoach] = useState("");
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState(null);
  const [category, setCategory] = useState(null);
  const [DataCoach, setDataCoaches] = useState([]);
  const [price,setPrice]=useState([]);
  const [priceLbp,setPriceLbp]=useState([])
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


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


  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    }
  };

  const addProgram = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/program/addProgram", {
        coach,
        name,
        day: selectedDays.join(" "), 
        time,
        category,
        price,
        priceLbp
      });
      
      console.log(response)

      toast.success("Program was added");
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
    document.querySelector(".program-popup").close();
    document.getElementById("addForm").reset();
  }

  return (
    <dialog className="program-popup" id="modal">
      <div className="containerPopup">
        <div className="popUp">
          <AiOutlineClose onClick={closePopup} className="close-x"></AiOutlineClose>
          <h2 className="formTitle">New Program</h2>

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
    {DataCoach.length > 0 && (
      <>
        <option value="">Select a coach</option> {/* First option */}
        {DataCoach.map((c) => (
          <option key={c._id} value={c._id}>
            {`${c.first_name} ${c.last_name}`}
          </option>
        ))}
      </>
    )}
  </select>
</fieldset>
            <fieldset>
              <label>Program</label>
              <input
                type="text"
                required
                placeholder="Example: Zumba"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaRegMoneyBillAlt className="iconForm" />
            </fieldset>

<fieldset>
  <label>Days</label>
  <div className="checkboxGroup">
    {daysOfWeek.map((day) => (
      <div key={day} className="checkboxItem">
        <input
          type="checkbox"
          value={day}
          checked={selectedDays.includes(day)}
          onChange={handleDayChange}
        />
        {day}
      </div>
    ))}
  </div>
</fieldset>

<fieldset>
  <label>Time</label>
  <input
    type="time"
    required
    value={time}
    onChange={(e) => setTime(e.target.value)}
  />
</fieldset>

<fieldset>
  <label>Price</label>
  <input
    type="number"
    required
    value={price}
    onChange={(e) => setPrice(e.target.value)}
  />
</fieldset>
            <fieldset>
    <label>Category</label>
    <select value={category} onChange={(e) => setCategory(e.target.value)} className="selectForm">
      <option value="category"></option>
      <option value="kids">Kids</option>
      <option value="young">Young</option>
    </select>
  </fieldset>
            <div className="btnsGrp">
              <button onClick={closePopup} className="closeBtn">Close</button>
              <button onClick={addProgram} className="createBtn">Create</button>
            </div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </dialog>
  );
}
