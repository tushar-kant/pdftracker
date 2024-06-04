import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter and Link

import logo from '../../assets/react1.svg';
import Footer from './Footer';



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
        <div className="row mt-5">
          <div className="col text-center">
            <h2 className="fw-bold mb-4">Key Features</h2>
            <ul className="list-group">
              <li className="list-group-item">Efficient PDF management</li>
              <li className="list-group-item">Advanced search functionality</li>
              <li className="list-group-item">Annotation tools for notes and highlights</li>
              <li className="list-group-item">User-friendly interface</li>
              {/* <li className="list-group-item">Secure login and registration</li> */}
            </ul>
          </div>
        </div>

      </div>
      <div className="container mt-5 text-center">
        <p className="text-muted">SCAAN - Simplifying your PDF management</p>
      </div>
      <Footer />
    </>
  )
}

export default Home