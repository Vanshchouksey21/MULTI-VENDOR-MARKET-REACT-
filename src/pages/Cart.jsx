import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../CartSlice";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Cart = () => {
  const cartItems = useSelector((state) => state.mycart.items);
  const dispatch = useDispatch();

  // Calculate total cart value with proper number conversion
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2);

  return (
    <div style={{ padding: "50px" }}>
      <h2 className="text-center">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <h4 className="text-center">Your cart is empty!</h4>
      ) : (
        <Container>
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} md={4} sm={6} xs={12} className="mb-3">
                <Card style={{ width: "100%" }}>
                  <Card.Img 
                    variant="top" 
                    src={item.image || "https://via.placeholder.com/300"}  // Fallback Image
                    alt={item.name} 
                    style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Price: ₹{Number(item.price).toFixed(2)}</strong> <br />
                      Quantity: <strong>{item.quantity}</strong> <br />
                      <strong>Total: ₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
                    </Card.Text>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                      <Button variant="primary" size="sm" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        onClick={() => dispatch(decreaseQuantity(item.id))} 
                        disabled={item.quantity <= 1} // Prevent reducing below 1
                      >
                        -
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Button variant="danger" size="sm" onClick={() => dispatch(removeItem(item.id))}>Remove</Button>
                      <Button variant="success" size="sm">Buy Now</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h3 className="text-center mt-4">Total Amount: ₹{totalAmount}</h3>
          <div className="d-flex justify-content-center">
            <Button variant="warning" onClick={() => dispatch(clearCart())} className="mt-3">
              Clear Cart
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Cart;
