import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userlogin } from './api.js';

const LoginForm = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [Isauth, setIsauth]= useState(false)

  const IsAuthenticated = Boolean(localStorage.getItem("IsAuthenticated"));
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await userlogin(formData);
    if (data.code === 1) {
      localStorage.setItem("IsAuthenticated", "true");
      localStorage.setItem("UserToken",data.userwebtoken)
      setIsAuthenticated(true)
      navigate('/todo'); 
    }
  };

  

  return (
    <div className="container d-flex justify-content-center align-items-center  min-vh-100">
      <div className="card" style={{ width: '24rem', borderColor: 'blue', borderWidth: '2px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
          <h5 className="card-title text-center mb-4" style={{ color: 'blue' }}>Login</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                name='email' 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter email" 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                name='password' 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password" 
                onChange={handleChange} 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-primary w-100 mb-3" 
            >
              Login
            </button>
            <div className="btn btn-link w-100" style={{ border: 'grey', display:'flex', gap:'20px', alignItems:'center', justifyContent:'center'}}>
              <a href='/register'>Register</a><a href='/forgetpassword'>Forget Password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;