import React, { useEffect, useState } from "react";
import {
  Carousel,
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import car1 from "../images/ChatGPT Image Apr 6, 2025, 03_45_03 PM.png";
import car2 from "../images/ChatGPT Image Apr 7, 2025, 12_41_16 PM.png";
import car3 from "../images/ChatGPT Image Apr 7, 2025, 12_44_02 PM.png";
import kitchenImg from "../images/ChatGPT Image Apr 11, 2025, 01_21_29 AM.png";
import homeEntertainmentImg from "../images/ChatGPT Image Apr 11, 2025, 01_34_55 AM.png";
// import wearablesImg from "../images/wearables.jpg";

import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../CartSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Style.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.mycart.items);

  const carouselImages = [car1, car2, car3];

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Preload carousel images
    carouselImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://json-deploy-react.onrender.com/items");
        const updatedProducts = res.data.map((product) => ({
          ...product,
          discountedPrice: parseFloat((product.price * 0.75).toFixed(2)),
        }));
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        AOS.refresh();
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
      <Carousel fade interval={3000} style={{ maxHeight: "500px", overflow: "hidden" }}>
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ objectFit: "cover", height: "500px", width: "100%" }}
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


      {/* Product Section */}
      <h1 className="text-center mt-4" data-aos="fade-down">
        Our Premium Products
      </h1>

      <Container className="mt-4">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading products...</p>
          </div>
        ) : (
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
                      src={`https://json-deploy-react.onrender.com${product.image}`}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "contain",
                        padding: "1rem",
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
                      <h4 className="text-success">₹{product.discountedPrice}</h4>
                    </Card.Text>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Buy Now
                      </Button>
                      <FaShoppingCart
                        style={{
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          color: "#007bff",
                        }}
                        onClick={() => handleAddToCart(product)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      
      {/* Shop by Category Section */}
      <h2 className="text-center mt-5" data-aos="fade-up">Shop by Category</h2>
      <Container className="my-4">
        <Row className="justify-content-center text-center">
          <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in">
            <div onClick={() => navigate("/categories/kitchen")} style={{ cursor: "pointer" }}>
              <img
                src={kitchenImg}
                alt="Kitchen Appliances"
                className="rounded-circle mb-2"
                style={{ width: "180px", height: "180px", objectFit: "cover" }}
              />
              <p>Kitchen Appliances</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in" data-aos-delay="100">
            <div onClick={() => navigate("/categories/home-appliances")} style={{ cursor: "pointer" }}>
              <img
                src={homeEntertainmentImg}
                alt="Home Entertainment"
                className="rounded-circle mb-2"
                style={{ width: "180px", height: "180px", objectFit: "cover" }}
              />
              <p>Home Entertainment</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in" data-aos-delay="200">
            <div onClick={() => navigate("/Wearables")} style={{ cursor: "pointer" }}>
              <img
                // src={wearablesImg}
                alt="Wearables"
                className="rounded-circle mb-2"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <p>Wearables</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Home;
