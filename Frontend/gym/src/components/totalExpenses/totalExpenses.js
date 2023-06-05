import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './totalExpenses.css';

const ExpenseComponent = () => {
  const [currentMonthTotalExpense, setCurrentMonthTotalExpense] = useState(null);
  const [previousMonthTotalExpense, setPreviousMonthTotalExpense] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get('income/expenses');
        setCurrentMonthTotalExpense(response.data.currentMonthTotalExpense);
        setPreviousMonthTotalExpense(response.data.previousMonthTotalExpense);
        setExpenses(response.data.expenses);
        const percentageChange = calculatePercentageChange(response.data.currentMonthTotalExpense, response.data.previousMonthTotalExpense);
        setPercentageChange(percentageChange);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpense();
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
      {currentMonthTotalExpense !== null && previousMonthTotalExpense !== null && expenses !== null ? (
        <div>
          <h4 className='finance-details'>Total expenses for this month:<span className='sub-detail'>${currentMonthTotalExpense}</span> </h4>
          {/* {expenses > 0 && <span className="compareExp">{percentageChange}% more than the previous month</span>}
          {expenses < 0 && <span className="compareExp">{Math.abs(percentageChange)}% less than the previous month</span>}
          {expenses === 0 && <span className="compareExp">No change in expenses from the previous month</span>} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseComponent;
