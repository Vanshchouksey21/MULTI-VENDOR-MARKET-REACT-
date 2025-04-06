import React, { useEffect, useState } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import car1 from "../images/ChatGPT Image Apr 6, 2025, 03_45_03 PM.png";
// import car2 from "../images/Gemini_Generated_Image_cv6xgpcv6xgpcv6x.jpeg";
// import car3 from "../images/Gemini_Generated_Image_xcrg4vxcrg4vxcrg.jpeg";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../CartSlice"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.mycart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await axios.get("http://localhost:3000/items");
        const updatedProducts = res.data.map((product) => ({
          ...product,
          discountedPrice: parseFloat((product.price * 0.9).toFixed(2)), // Ensure it's a number
        }));
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const ProDisplay =(id)=>{
    navigate(`Productdetails/${id}`)
   

  }

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      console.log(`${product.name} is already in the cart!`);
      alert(`${product.name} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      console.log(`${product.name} added to cart!`);
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel style={{ height: "500px" }}> 
        <Carousel.Item style={{ height: "500px" }}>
          <img className="d-block w-100" src={car1} alt="E-Commerce Shopping" style={{ objectFit: "cover", height: "100%" }} />
          <Carousel.Caption>
            <h3>Shop from Multiple Vendors</h3>
            <p>Get the best deals from trusted sellers.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "500px" }}>
          {/* <img className="d-block w-100" src={car2} alt="Multi-Vendor Storefront" style={{ objectFit: "cover", height: "100%" }} /> */}
          <Carousel.Caption>
            <h3>Thousands of Products</h3>
            <p>Explore categories and find what you need.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "500px" }}>
          {/* <img className="d-block w-100" src={car3} alt="Fast & Secure Checkout" style={{ objectFit: "cover", height: "100%" }} /> */}
          <Carousel.Caption>
            <h3>Secure Payments</h3>
            <p>Safe and fast checkout with multiple payment options.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Products Section */}
      <h1 className="text-center mt-4">Our Premium Products</h1>
      <Container className="mt-4">
        <Row className="justify-content-center">
          {products.map((product) => (
            <Col key={product.id} md={4} sm={6} xs={12} className="mb-3">
              <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
                <a href="#" onClick={()=>{ProDisplay(product.id)}}>
                <Card.Img 
                  variant="top" 
                  src={product.image || "https://via.placeholder.com/300"} // Fallback image
                  alt={product.name} 
                  style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                />
                </a>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                   
                    <strong>Vendor:</strong> {product.vendor || "Unknown"} <br /> {/* Handle missing vendor */}
                    <strong>Price:</strong> {product.category} <br />
                    <span style={{ textDecoration: "line-through", color: "red" }}>₹{product.price}</span>
                    <h3>₹{product.discountedPrice}</h3>
                  </Card.Text>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="success" size="sm" onClick={() => handleAddToCart(product)}>Buy Now</Button>
                    <FaShoppingCart style={{ fontSize: "1.5rem", cursor: "pointer", color: "#007bff" }} onClick={() => handleAddToCart(product)} />
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

export default Home;
