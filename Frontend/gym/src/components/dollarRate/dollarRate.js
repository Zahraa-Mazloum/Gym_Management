import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';
import './dollarRate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiEdit, BiSave } from 'react-icons/bi';

const DollarRates = () => {
  const [dollarRates, setDollarRates] = useState([]);
  const [dollarRate,setDollarRate]=useState([]);
  // const [dollarRate,setDollarRate]=useState(0)

  const [edit,setEdit]=useState(false)

  useEffect(() => {
    fetchDollarRates();
  }, []);

  const fetchDollarRates = async () => {
    try {
      const response = await axios.get('dollar/getAllDollarRates');
      console.log(response.data[0])
      setDollarRates(response.data[0]);

    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRate = async () => {
    try {
      const response = await axios.put(`dollar/updateDollarRate/${dollarRates._id}`, { dollarRate: dollarRate });
      if(response.status===200){
        toast.success("Dollar rate updated successfuly")
        setEdit(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div key={dollarRates._id}>
         

         <h3 className='finance-details'>{dollarRates.description}:
            <input className={`sub-detail ${edit?"edit-border":""}`}readOnly={!edit} defaultValue={dollarRates.dollarRate} onChange={e=>setDollarRate(e.target.value)}/><span className='lbpCurrency'>LBP</span>
            {edit?<BiSave
                className='edit-dolar-rate'
                onClick={(e) => {
                  
                  handleEditRate()
                }}
                />:<BiEdit
                className='edit-dolar-rate'
                onClick={e=>setEdit(true)}
                
              />}
              
              
          </h3>
         
        </div>
    </div>
  );
};

export default DollarRates;
