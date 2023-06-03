import React from 'react';
import DollarRate from '../../components/dollarRate/dollarRate.js';
import Location from '../../components/location/location.js';
import Profit from '../../components/Profit/profit.js';
import TotalIncome from '../../components/totalIncome/totalIncome.js';
import Expenses from '../../components/totalExpenses/totalExpenses.js';
import './dashboard.css';
import {TbReportMoney} from 'react-icons/tb'
import { BiEdit } from 'react-icons/bi';


const Dashboard = () => {
  return (
    <div className='dashboardPage'>
      <div className='firstLineDashboard'>
          <Location />
          <div className='cardDashboard'>
          <div className="titleLocation">
      <TbReportMoney className="cardDashIcon" />
      <h3>Finance</h3>
    </div>
    <div className="titleLine"></div>
    <DollarRate />
    <TotalIncome />
    <Expenses />
      <Profit/> 
    </div>
          </div>
          </div>
  );
};

export default Dashboard;