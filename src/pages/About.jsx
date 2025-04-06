import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/Style.css"; // Make sure this path is correct

const About = () => {
  return (
    <div className="about-section py-5 bg-light">
      <Container>
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold display-5 mb-3">About Us</h2>
            <p className="text-muted fs-5">
              Welcome to <strong>MultiVendor</strong>, your trusted online marketplace connecting customers with the best vendors and products from all around the globe.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3"
              alt="Our Story"
              className="img-fluid rounded-4 shadow"
            />
          </Col>
          <Col md={6}>
            <h4 className="fw-bold mb-3">Our Story</h4>
            <p className="text-muted">
              MultiVendor was founded with a vision to revolutionize the e-commerce experience by empowering local and global vendors to reach customers effortlessly. With a diverse product range and reliable delivery, we make online shopping simple and secure.
            </p>
            <p className="text-muted">
              Whether you're a buyer looking for quality or a seller looking for growth, MultiVendor provides the tools, visibility, and support you need.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h4 className="fw-bold text-center mb-4">What We Offer</h4>
            <Row className="g-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h5 className="fw-bold">Wide Product Range</h5>
                    <p className="text-muted">
                      Explore thousands of products from electronics, fashion, home essentials, and more — all in one place.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h5 className="fw-bold">Trusted Vendors</h5>
                    <p className="text-muted">
                      We partner with verified and top-rated sellers to ensure quality and authenticity every step of the way.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h5 className="fw-bold">Customer Support</h5>
                    <p className="text-muted">
                      Our dedicated support team is available 24/7 to assist you with any issues, queries, or feedback.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h5 className="fw-bold mb-2">Join Us Today</h5>
            <p className="text-muted">
              Whether you're shopping or selling, MultiVendor is your one-stop destination for all your needs.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
