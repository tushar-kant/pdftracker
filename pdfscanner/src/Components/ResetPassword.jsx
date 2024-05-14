// ResetPassword.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

import Header from '../Components/User/Header';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom



const ResetPassword = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); // Initialize useLocation hook
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get('token');
    const navigate = useNavigate();

    
    React.useEffect(() => {
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [tokenFromUrl]);


    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            // Make POST request to reset password endpoint
              const response = await axios.post('https://backend-pdf.onrender.com/reset-password', { token, newPassword });
            // const response = await axios.post('http://localhost:3030/reset-password', { token, newPassword });

            console.log(response.data.message); // Password reset successfully
            setError('');
            window.alert('successfully updated password');

            navigate('/login');

            // Show a message to the user indicating that the password has been reset
        } catch (err) {
            setError(err.response.data.error); // Error message from the backend
            window.alert('Error updating password');


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
                        <h3 className="mb-0">Reset Password</h3>
                    </div>
                    <div className="card-body px-5 py-4">
                        <form onSubmit={handleResetPassword}>
                            <div className="form-group mb-4">
                                {/* <label htmlFor="token" className="form-label ">Token:</label> */}
                                <input
                                type="hidden"
                                className="form-control"

                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="newPassword" className="form-label">New Password:</label>
                                <input
                                    type="password"
                                    className="form-control"

                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                        </form>
                        {error && <p>{error}</p>}

                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
