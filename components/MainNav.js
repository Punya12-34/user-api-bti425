/********************************************************************************
* BTI425 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Punya Pratishtha Kalia Student ID: 181480211 Date: 2026.04.12
*
********************************************************************************/

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export default function MainNav() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Punya P. Kalia
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/favourites">
              Favourites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}