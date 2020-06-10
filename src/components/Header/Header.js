import React from "react";
import { Navbar } from "react-bootstrap";
function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Kanban Board</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
