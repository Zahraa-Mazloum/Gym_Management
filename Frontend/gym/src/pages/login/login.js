import React, {useState ,useEffect } from 'react';
import "./login.css";
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai';
import {useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import img from './img/gymLogo.png'




  
function Login() {
  const { setAuth } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const from = location.state?.from?.pathname || "/dashboard";

 useEffect(() => {
    const handleResize = () => {
      setShowPlaceholder(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);

    setShowPlaceholder(window.innerWidth > 800);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {


      const response = await axios.post(`admin/login`, {
        email,
        password,
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
      console.log(response)
      const superadmin = response.data.admin.superAdmin;
      const Username = response.data.admin.name
  
console.log(email)
      const token = response?.data?.token;
      //console.log(access_token)
      console.log(response.data.token)
      // setCookie("token", token);
      // setCookie("super-admin", superadmin);
      setAuth({ email, password, token });
      localStorage.setItem("token", "true");
      localStorage.setItem("username", Username);
      navigate(from, { replace: true });
      toast.success("Login successful!");

    } catch (error) {
      console.error(error);
      if (!error.response) {
        toast.error(error.response);
      } else {
        console.error(error);
        toast.error("Email/Password invalid!");
      }
    }

    setLoading(false);
  };

    return (
      <div className='containerLogin'>
    <div className="page-background"></div>                                                                                                                                                                       
      <div id="login-wrap">
      <img src={img} alt="login" className="imglogin" />
        <div className="login-card">
          <div className="login-card-header">
            <h1 className="display-md">
              <span className="text-main">Log</span>
              <span className="text-primary">In</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="login-card-form">
            <div className="input-group">
              <label className="labelLogin">Email</label>
              <input
                type="text"
                className="inputLogin"
                placeholder={showPlaceholder ? 'example@gmail.com' : ''}
                required
                autoComplete="off"
                value={email}
                onChange={(event) => setemail(event.target.value)}
              />
              <i className="m-i iconsLogin">
                <AiOutlineMail />
              </i>
            </div>
            <div className="input-group">
              <label className="labelLogin">Password</label>
              <input
                type="password"
                className="inputLogin"
                                placeholder={showPlaceholder ? '*********' : ''}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <i className="m-i iconsLogin">
                <AiFillLock />
              </i>
            </div>
            <div className='frgtpass'>
              <a href="/forgot-password">Forgot Password</a>
            </div>
            <div className="btn-group">
              <button type="submit" value="Submit" className="btnLogin btn-primary">
                {loading ? 'Checking...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


export default Login;
