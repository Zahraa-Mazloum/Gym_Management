import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/login/login.js";
import RequireAuth from './components/RequireAuth.js';
import Dashboard from './pages/dashboard/dashboard.js'
import Coaches from './pages/coaches/coaches.js'


function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="Login" element={<Login />} />
      {/* protected routes */}
      <Route path="/" element={<RequireAuth />}>
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="Coaches" element={<Coaches />} />

            </Route>
    </Routes>
  );
}

export default App;
