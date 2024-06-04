import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter and Link
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';




function Header() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    // Clear authentication token from local storage
    localStorage.removeItem('token');
    navigate('/');

    // Redirect user to login page or any other appropriate page
    // window.location.href = '/login'; // Example redirection

  };
  return (
    <>


      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3" bg="primary" data-bs-theme="dark" >
          <Container fluid>
            <Navbar.Brand as={Link} to="/">         
               <img src={logo} alt="Logo" style={{ width: '25px', filter: 'invert(1)' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hi,there....
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" >
                  {isLoggedIn ? (
                    <>
                      <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                      <Nav.Link as={Link} to="/search">Search</Nav.Link>
                      <Nav.Link as={Link} to="/viewall">View All</Nav.Link>

                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to="/login">Login</Nav.Link>
                      <Nav.Link as={Link} to="/register">Register</Nav.Link>
                      {/* <NavDropdown
                    title="Account"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login">
                      Login
                    </NavDropdown.Item>
                 
                  </NavDropdown> */}
                    </>
                  )}
                </Nav>
                {/* <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header