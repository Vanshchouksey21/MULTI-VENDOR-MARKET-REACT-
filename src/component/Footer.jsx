import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a leading multi-vendor marketplace connecting buyers with trusted sellers worldwide.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
              <li><a href="/terms" className="text-light">Terms & Conditions</a></li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: Vanshchouksey2175@gmail.com</p>
            <p>Phone: 9300769509</p>
            <p>Address: 123 Market Street, City, Country</p>
          </Col>
        </Row>

        <hr />

        {/* Copyright Section */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Multi-Vendor Marketplace. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
