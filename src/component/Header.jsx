import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../css/Style.css"; // Custom styles

const Header = () => {
  const product = useSelector((state) => state.mycart?.items || []);
  const cartItemCount = product.length;
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // Optional: clear input
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className={`py-3 ${scrolled ? "shadow-sm bg-opacity-90" : ""}`}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center gap-2"
        >
          🛍️ MultiVendor
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>

            <NavDropdown title="Categories" id="categories-nav-dropdown">
              <NavDropdown.Item as={Link} to="/categories/kitchen">
                Kitchen Appliances
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categories/home-appliances">
               Home Entertainment
              </NavDropdown.Item>
            
              <NavDropdown.Item as={Link} to="/categories/accessories">
              Accessories
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/categories/all">
                All Categories
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <Form
            className="d-flex mx-lg-3 my-2 my-lg-0"
            onSubmit={handleSearchSubmit}
          >
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>

          <Nav className="align-items-center">
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative d-flex align-items-center"
              style={{ fontSize: "1.2rem" }}
            >
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
