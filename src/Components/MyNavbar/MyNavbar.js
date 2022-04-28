import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from 'react-router-dom'

function MyNavbar() {

  return (
  <>
  <Navbar bg="success" expand="md" variant="dark">
  <Container fluid>
    <Navbar.Brand href="/">My Games</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/starship">Starship</Nav.Link>
        <Nav.Link as={NavLink} to="/sistema_de_cultivos">Sistema De Cultivos</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>    
  </>
  );
}

export default MyNavbar;