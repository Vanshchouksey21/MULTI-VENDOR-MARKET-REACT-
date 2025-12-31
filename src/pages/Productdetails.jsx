import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Productdetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/items?id=${id}`);
        if (res.data.length > 0) {
          setProduct(res.data[0]);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    toast.info(`Proceeding to buy ${product.name}`);
    // Later, navigate to checkout if needed
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: "20px", color: "red" }}>{error}</h2>;
  if (!product) return <h2 style={{ padding: "20px" }}>No product found.</h2>;

  const discountedPrice = (product.price * 0.9).toFixed(2);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.name}
        style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "10px" }}
      />
      <h1 style={{ marginTop: "20px" }}>{product.name}</h1>
      <p>
        <span style={{ textDecoration: "line-through", color: "red" }}>
          ₹{product.price}
        </span>{" "}
        <span style={{ fontSize: "1.4rem", color: "green" }}>₹{discountedPrice}</span>
      </p>
      <h4 style={{ color: "#777" }}>Vendor: {product.vendor}</h4>
      <h5 style={{ color: "#888" }}>Category: {product.category}</h5>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff6347",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Buy Now
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Productdetails;
