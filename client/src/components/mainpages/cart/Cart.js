import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link, Navigate } from 'react-router-dom';
import configURL from '../../../configURL';
import axios from 'axios';

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const addOrder = state.userAPI.addOrder;
  const removeFromCart = state.userAPI.removeFromCart;
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState({
    address: '',
    totalAmount: 0,
  });

  // Calculate total amount whenever cart changes
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setAmount(total);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  }, [cart]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  if (!isLogged) {
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Start your shop first</h1>
        <Link to='/login' style={{ textAlign: 'center', fontSize: '1.5rem' }}>Login</Link>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart is Empty</h2>
        <Link style={{ textAlign: "center", fontSize: "2rem" }} to='/'>Shop Now</Link>
      </>
    );
  }

  const handlePayment = async () => {
    if (formData.address.trim() === "") {
  alert("Please enter your full address before placing the order.");
  return;
}
    try {
      const res = await axios.post(`${configURL}/api/payment/create-order`, { amount });

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Strong Spark",
        description: "Test Payment",
        order_id: res.data.orderId,
        handler: function (response) {
          placeOrder()
          alert("Payment Successful!");
          console.log(response);
        },
        theme: { color: "#2C6EE0" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment Failed");
    console.log(error);
    
    }
  };



  const placeOrder = async () => {
    try {
      // Create order items from cart
      const orderItems = cart.map(item => ({
        title: item.title,
        images: item.images,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity || 1
      }));

      await addOrder(orderItems, formData);
      alert("Order placed successfully");
      <Navigate to='/' />

    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed");
    }
  };

  if(isAdmin){
    return (
      <Navigate to='/'/>
    )
  }

  return (
    <div>
      {cart.map((prd, index) => (
        <div key={index} className='detail'>
          <div className='product_detail_img'>
            <img src={prd.images} alt='' />
          </div>
          <div className='box_detail'>
            <div className='row'>
              <h2>{prd.title}</h2>
              <h6>{prd.product_id}</h6>
            </div>
            <span>${prd.price}</span>
            <p>{prd.description}</p>
            <p>{prd.content}</p>
            <p>Sold: {prd.sold}</p>
            <button className='cart' onClick={() => removeFromCart(prd._id)}>Remove</button>
          </div>
        </div>
      ))}

     <div className="order-summary">
  <input
    type="text"
    name="address"
    placeholder="Enter your full address"
    onChange={handleInput}
    value={formData.address}
    required
    className="address-input"
  />
  <h3 className="total-amount">Total: ₹{amount}</h3>
  <button className="place-order-btn" onClick={handlePayment}>Place Order</button>
</div>

    </div>
  );
}

export default Cart;
