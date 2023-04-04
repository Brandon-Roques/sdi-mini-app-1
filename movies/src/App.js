import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./Components/homePage.js";
import AddMovie from "./Components/addMovie.js";
import { Routes, Route } from "react-router-dom";
import { Container, Row, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">Movies!!</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/addMovie">Add Movie</Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addMovie" element={<AddMovie />} />
      </Routes>
    </>
  );
};

export default App;
