import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../css/Style.css";

const Contact = () => {
  return (
    <Container className="py-5 contact-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow contact-card">
            <Card.Body>
              <h2 className="text-center mb-4">📞 Contact Us</h2>
              <p className="text-center mb-4 text-muted">
                Have any questions or need help? Fill out the form and we'll get back to you shortly!
              </p>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter your message" required />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
