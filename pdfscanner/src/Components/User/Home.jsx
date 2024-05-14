import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter and Link

import logo from '../../assets/react.svg';



function Home() {
  return (
    <>
     <Header />
     
     <div className="container">
        <div className="row">
        
          <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-center">
            <img src={logo} alt="Logo" className="mb-4" style={{ width: '150px' }} />
            <h1 className="display-4 fw-bold text-primary">Welcome to SCAAN</h1>
            <p className="lead text-muted mb-4">Your platform for managing PDF documents</p>
            <div>
              <Link to="/register" className="btn btn-primary me-3">Get Started</Link>
              <Link to="/login" className="btn btn-outline-primary">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
            <h2 className="fw-bold mb-4">Why Choose SCAAN?</h2>
            <p className="text-muted">
              SCAAN offers a seamless experience for organizing, searching, and annotating your PDFs. With advanced features and intuitive design, SCAAN empowers you to enhance your learning and research journey.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home