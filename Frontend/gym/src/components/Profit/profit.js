import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';
import './profit.css'

const ProfitComponent = () => {
  const [profit, setProfit] = useState(null);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const response = await axios.get('income/getProfit');
        setProfit(response.data.profit);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfit();
  }, []);

  return (
    <div>
      {profit !== null ? (
               <h4 className='finance-details'>Profit for this month:<span className='sub-detail'>${profit}</span> </h4>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfitComponent;
