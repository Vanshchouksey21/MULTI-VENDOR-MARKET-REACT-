import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice"; // adjust path based on your structure

const Productdetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const api = `http://localhost:3000/items?id=${id}`;
        const res = await axios.get(api);
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
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.name}`);
    // You could navigate to a checkout page here
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: "20px", color: "red" }}>{error}</h2>;
  if (!product) return <h2 style={{ padding: "20px" }}>No product found.</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "10px" }}
      />
      <h1 style={{ marginTop: "20px" }}>{product.name}</h1>
      <h3 style={{ color: "#555" }}>Price: ${product.price}</h3>
      <h4 style={{ color: "#777" }}>Vendor: {product.vendor}</h4>

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
    </div>
  );
};

export default Productdetails;
