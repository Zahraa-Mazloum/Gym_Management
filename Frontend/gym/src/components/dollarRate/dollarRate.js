import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';
import './dollarRate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DollarRates = () => {
  const [dollarRates, setDollarRates] = useState([]);

  useEffect(() => {
    fetchDollarRates();
  }, []);

  const fetchDollarRates = async () => {
    try {
      const response = await axios.get('dollar/getAllDollarRates');
      setDollarRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRate = async (id, newRate) => {
    try {
      const response = await axios.put(`dollar/updateDollarRate/${id}`, { dollarRate: newRate });
      const updatedRate = response.data;
      setDollarRates((prevRates) =>
        prevRates.map((rate) => (rate._id === updatedRate._id ? updatedRate : rate))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {dollarRates.map((dollar) => (
        <div key={dollar._id} className="card">
          <div className="card-body">
            <div className="card-content">
              <h5 className="card-title">{dollar.description}</h5>
              {!dollar.editable ? (
                <p className="card-text">{dollar.dollarRate} LBP</p>
              ) : (
                <div className="form-group">
                  <label htmlFor={`rate-${dollar._id}`}>New Rate:</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`rate-${dollar._id}`}
                    step="0.01"
                    defaultValue={dollar.dollarRate}
                  />
                  <button
                    className="btn btnRate"
                    onClick={() => {
                      const newRate = parseFloat(document.getElementById(`rate-${dollar._id}`).value);
                      handleEditRate(dollar._id, newRate);
                    }}
                   
                  >
                    Save Rate
                  </button>
                </div>
                
              )}
            </div>
            {!dollar.editable && (
              <button
                className="btn btn-link"
                onClick={() => {
                  setDollarRates((prevRates) =>
                    prevRates.map((rate) => (rate._id === dollar._id ? { ...rate, editable: true } : rate))
                  );
                }}
              >
                Edit Rate
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DollarRates;
