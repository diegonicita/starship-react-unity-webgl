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
        {/* <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="/starship">Starship</a>
        <a className="nav-link" href="/sistema_de_cultivos">Sistema De Cultivos</a> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>    
  </>
  );
}

export default MyNavbar;