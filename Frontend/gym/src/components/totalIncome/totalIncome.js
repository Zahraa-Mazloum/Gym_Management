import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './totalIncome.css'
const IncomesComponent = () => {
  const [currentMonthTotalIncome, setCurrentMonthTotalIncome] = useState(null);
  const [previousMonthTotalIncome, setPreviousMonthTotalIncome] = useState(null);
  const [incomes, setIncomes] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);


  useEffect(() => {
    const fetchincomes = async () => {
      try {
        const response = await axios.get('income/totalIncome');
        setCurrentMonthTotalIncome(response.data.currentMonthTotalIncome);
        setPreviousMonthTotalIncome(response.data.previousMonthTotalIncome);
        setIncomes(response.data.incomes);
        const percentageChange = calculatePercentageChange(response.data.currentMonthTotalIncome, response.data.previousMonthTotalIncome);
        setPercentageChange(percentageChange);

      } catch (error) {
        console.error(error);
      }
    };

    fetchincomes();
  }, []);

  const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) {
      return 0;
    }

    const change = currentValue - previousValue;
    const percentageChange = (change / Math.abs(previousValue)) * 100;
    return percentageChange.toFixed(2);
  };


  return (
    <div>
      {currentMonthTotalIncome !== null && previousMonthTotalIncome !== null && incomes !== null ? (
        <div>
          <h4 className='finance-details'>Total income for this month:<span className='sub-detail'>${currentMonthTotalIncome}</span> </h4>
{incomes> 0 && <span className="compare">{percentageChange}% more than previous month</span>}
          {incomes < 0 && <span className="compare">{Math.abs(percentageChange)}% less than previous month</span>}
          {incomes === 0 && <span className="compare">No change in Income from the previous month</span>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IncomesComponent;
