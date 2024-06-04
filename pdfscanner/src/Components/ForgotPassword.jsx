// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/User/Header';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import config from '../config.jsx';




const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Make POST request to forgot password endpoint
            //   const response = await axios.post('https://backend-pdf.onrender.com/forgot-password', { email });
            const response = await axios.post(`${config.baseURL}/auth/forgot-password`, { email });
            console.log(response.data.message); // Password reset link sent successfully
            setError('');
            // window.location.href = `http://localhost:3030/#/reset-password?token=${response.data.resetToken}`;
            navigate(`/reset-password?token=${response.data.resetToken}`);



            // Show a message to the user indicating that the reset link has been sent
        } catch (err) {
            setError(err.response.data.error); // Error message from the backend
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="container mt-5 d-flex justify-content-center">
                <div className="card border-0 shadow rounded-lg overflow-hidden">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Forgot Password</h3>
                    </div>
                    <div className="card-body px-5 py-4">
                        <form onSubmit={handleForgotPassword}>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"

                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
                        </form>
                        {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default ForgotPassword;
