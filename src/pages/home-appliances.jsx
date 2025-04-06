import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../CartSlice";
import { useNavigate } from "react-router-dom";

const HomeEntertainment = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.mycart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await axios.get("http://localhost:3000/items");
        const updatedProducts = res.data
          .filter((product) => product.category === "Home Entertainment")
          .map((product) => ({
            ...product,
            discountedPrice: parseFloat((product.price * 0.9).toFixed(2)),
          }));
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const ProDisplay = (id) => {
    navigate(`Productdetails/${id}`);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      alert(`${product.name} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4">Home Entertainment</h1>
      <Container className="mt-4 px-3">
        <Row className="justify-content-center">
          {products.map((product) => (
            <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="h-100 text-center">
                <a href="#" onClick={() => ProDisplay(product.id)}>
                  <Card.Img
                    variant="top"
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "contain" }}
                  />
                </a>
                <Card.Body className="d-flex flex-column justify-content-between">
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
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <strong>Vendor:</strong> {product.vendor || "Unknown"}
                    </div>
                    <div>
                      <strong>Category:</strong> {product.category}
                    </div>
                    <div>
                      <span style={{ textDecoration: "line-through", color: "red" }}>
                        ₹{product.price}
                      </span>
                    </div>
                    <h4 className="text-success">₹{product.discountedPrice}</h4>
                  </Card.Text>
                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <Button variant="success" size="sm" onClick={() => handleAddToCart(product)}>
                      Buy Now
                    </Button>
                    <FaShoppingCart
                      style={{ fontSize: "1.5rem", cursor: "pointer", color: "#007bff" }}
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeEntertainment;
