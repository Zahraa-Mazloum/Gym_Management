import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/login/login.js";
import RequireAuth from './components/RequireAuth.js';
import Dashboard from './pages/dashboard/dashboard.js';
import Coaches from './pages/coaches/coaches.js';
import Salaries from './pages/salaries/salary.js';
import Expense from './pages/expense/expense.js';
import Member from './pages/member/member.js';
import Program from './pages/programs/programs.js';
import Membership from'./pages/Membership/membership.js';
import Debt from './pages/debt/debt.js';
import Payment from './pages/payment/payment.js'

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="Login" element={<Login />} />
      {/* protected routes */}
      <Route path="/" element={<RequireAuth />}>
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="Coaches" element={<Coaches />} />
      <Route path="Salaries" element={<Salaries />} />
      <Route path="Expense" element={<Expense />} />
      <Route path="Member" element={<Member />} />
      <Route path="Program" element={<Program />} />
      <Route path="Membership" element={<Membership />} />
      <Route path="Debt" element={<Debt/>} />
      <Route path="Payment" element={<Payment/>}/>




            </Route>
    </Routes>
  );
}

export default App;
