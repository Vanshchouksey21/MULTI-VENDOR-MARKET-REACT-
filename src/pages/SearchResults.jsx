import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:3000/items");
        const lowerQuery = query.toLowerCase();

        const filtered = res.data.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(lowerQuery)
          )
        );

        setResults(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <Container style={{ paddingTop: "90px" }}>
      <h2 className="text-center mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <Row className="justify-content-center">
          {results.map((product) => (
            <Col key={product.id} md={4} sm={6} xs={12} className="mb-3">
              <Card className="text-center h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    ₹{product.price} <br />
                    <strong>{product.category}</strong> <br />
                    <em>Vendor: {product.vendor}</em>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No results found.</p>
      )}
    </Container>
  );
};

export default SearchResults;
