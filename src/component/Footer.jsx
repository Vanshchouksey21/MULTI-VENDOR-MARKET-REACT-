import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Style.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="mb-4">
          {/* About */}
          <Col md={4} className="mb-4">
            <h5>About Us</h5>
            <p>
              We are a leading multi-vendor marketplace connecting buyers with trusted sellers worldwide.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4} className="mb-4">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:Vanshchouksey2175@gmail.com" className="footer-link">VendormarketSupport@gmail.com</a></p>
            <p>Phone: <span className="text-white">93007695XX</span></p>
            <p>Address: <span className="text-white">123 Market Street, City, Country</span></p>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} MultiVendor Marketplace. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
