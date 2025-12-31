import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AOS Animation
import AOS from "aos";
import "aos/dist/aos.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const fetchResults = async () => {
      try {
        const res = await axios.get("https://json-deploy-react.onrender.com/items");
        const lowerQuery = query.toLowerCase();

        const filtered = res.data.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(lowerQuery)
          )
        );

        setResults(filtered);
        AOS.refresh(); // Refresh AOS after setting new content
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Container style={{ paddingTop: "90px" }}>
      <h2 className="text-center mb-4" data-aos="fade-down">
        Search Results for "{query}"
      </h2>

      {results.length > 0 ? (
        <Row className="justify-content-center">
          {results.map((product, index) => (
            <Col
              key={product.id}
              md={4}
              sm={6}
              xs={12}
              className="mb-3"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <Card className="text-center h-100 shadow">
                <Card.Img
                  variant="top"
                  src={product.image || "https://via.placeholder.com/300"}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    ₹{product.price} <br />
                    <strong>{product.category}</strong> <br />
                    <em>Vendor: {product.vendor}</em>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto"
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted" data-aos="fade-up">
          No results found.
        </p>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
};

export default SearchResults;
