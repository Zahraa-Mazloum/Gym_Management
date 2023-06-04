import React from 'react';
import DollarRate from '../../components/dollarRate/dollarRate.js';
import Location from '../../components/location/location.js';
import Profit from '../../components/Profit/profit.js';
import TotalIncome from '../../components/totalIncome/totalIncome.js';
import Expenses from '../../components/totalExpenses/totalExpenses.js';
import './dashboard.css';
import { TbReportMoney } from 'react-icons/tb'
import { FaWhatsapp} from 'react-icons/fa';
import {GrDocumentUser} from 'react-icons/gr'
// import Calendar from '../../components/calendar/calendar.js';
import ReceiveMsg from '../../components/receiveMsg/receiveMsg.js';
import TotalMembers from '../../components/memberThisMonth/memberThisMonth.js'

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
          <Profit />
        </div>
      </div>
      <div className="seconde-line">
        <div className="cardLocation">
          <div className="titleLocation">
            <FaWhatsapp className="cardDashIcon" />
            <h3>Members Who have to resubscribe</h3>
          </div>
          <div className="titleLine"></div>
          <ReceiveMsg />
        </div>
        <div className='cardDashboard'>
          <div className="titleLocation">
            <GrDocumentUser className="cardDashIcon" />
            <h3>Members</h3>
          </div>
          <div className="titleLine"></div>
          <TotalMembers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;