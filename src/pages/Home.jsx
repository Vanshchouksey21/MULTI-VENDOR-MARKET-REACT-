import React, { useEffect, useState } from "react";
import {
  Carousel,
  Card,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import car1 from "../images/ChatGPT Image Apr 6, 2025, 03_45_03 PM.png";
import car2 from "../images/ChatGPT Image Apr 7, 2025, 12_41_16 PM.png";
import car3 from "../images/ChatGPT Image Apr 7, 2025, 12_44_02 PM.png";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../CartSlice";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Style.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.mycart.items);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/items");
        const updatedProducts = res.data.map((product) => ({
          ...product,
          discountedPrice: parseFloat((product.price * 0.75).toFixed(2)),
        }));
        setProducts(updatedProducts);
        AOS.refresh();
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
      toast.error(`${product.name} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel style={{ height: "500px" }}>
        {[car1, car2, car3].map((image, index) => (
          <Carousel.Item key={index} style={{ height: "500px" }}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                objectFit: "cover",
                height: "100vh",
              }}
            />
            <Carousel.Caption>
              {index === 0 && (
                <>
                  <h3>Shop from Multiple Vendors</h3>
                  <p>Get the best deals from trusted sellers.</p>
                </>
              )}
              {index === 1 && (
                <>
                  <h3>Thousands of Products</h3>
                  <p>Explore categories and find what you need.</p>
                </>
              )}
              {index === 2 && (
                <>
                  <h3>Secure Payments</h3>
                  <p>Fast checkout with multiple payment options.</p>
                </>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Products Section */}
      <h1 className="text-center mt-4" data-aos="fade-down">
        Our Premium Products
      </h1>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {products.map((product, index) => (
            <Col
              key={product.id}
              md={4}
              sm={6}
              xs={12}
              className="mb-3"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Card className="h-100 text-center">
                <a href="#" onClick={() => ProDisplay(product.id)}>
                  <Card.Img
                    variant="top"
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </a>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Vendor:</strong> {product.vendor || "Unknown"} <br />
                    <strong>Category:</strong> {product.category} <br />
                    <strong>Price:</strong>{" "}
                    <span style={{ textDecoration: "line-through", color: "red" }}>
                      ₹{product.price}
                    </span>
                    <h3>₹{product.discountedPrice}</h3>
                  </Card.Text>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
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

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Home;
