import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/User/Header';
import Loader2 from '../Components/Loader/Loader2'; // Assuming you have a Loader component
import logo from '../../src/assets/react.svg';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


import config from '../config.jsx';




function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',

  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true before making the request

    try {

      // Make POST request to login endpoint
      // const response = await axios.post('https://backend-pdf.onrender.com/auth/login', formData);
      const response = await axios.post(`${config.baseURL}/auth/login`, formData);      

      const { token } = response.data || 1;
      localStorage.setItem('token', token);



      console.log(response.data.message); // Login successful

      setError('');
      navigate('/search');
    } catch (err) {
      setError(err.response.data.message); // Invalid username or password
    }
    finally {
      setIsLoading(false); // Set loading to false after the request is completed (success or failure)
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Header />
      {isLoading && <Loader2 />} {/* Display loader if isLoading is true */}

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card border-0 shadow rounded-lg overflow-hidden">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Welcome Back!</h3>
            {/* <img src={logo} alt="Company Logo" className="img-fluid" width="100" /> */}
          </div>
          <div className="card-body px-5 py-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">Password:</label>
                <div className="d-flex align-items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control flex-grow-1"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                 

                </div>
              </div>

              <div className="row">
                <div className="form-check mb-3 col-9">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div className="col-3">
                <i
                    className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} m-1 text-secondary cursor-pointer`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            {error && <p className="mt-3 text-danger">{error}</p>}
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
              <br />
              <Link to="/register">Create New Account</Link>
            </div>
          </div>
        </div >
      </div >
      {/* <div className="container mt-5">

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-primary shadow">
              <div className="card-header bg-primary text-white">
                <h2 className="text-center">User Login</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block m-2">Login</button>
                </form>
                {error && <p className="mt-3 text-danger">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Login