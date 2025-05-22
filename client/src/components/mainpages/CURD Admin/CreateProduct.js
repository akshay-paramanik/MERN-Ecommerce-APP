import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProduct() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [categories] = state.catagoryAPI.catagory;
  const [token] = state.token;

  const [product, setProduct] = useState({
    product_id: '',
    title: '',
    description: '',
    category: '',
    price: '',
    content: '',
    images: '',
    quantity: ''
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, images: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      await axios.post('http://localhost:5000/api/products', formData, {
        withCredentials: true,
        headers: { Authorization: token }
      });

      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Product creation failed');
    }
  };

  if (!isLogged) return <Navigate to="/login" replace />;
  if (!isAdmin && isLogged) return <Navigate to="/" replace />;

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="product_id" placeholder="Product ID" value={product.product_id} onChange={onChangeInput} required />
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={onChangeInput} required />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={onChangeInput} required />
        
        <label>Select Category</label>
        <select name="category" value={product.category} onChange={onChangeInput} required>
          <option value="">-- Select --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <input type="number" name="price" placeholder="Price" value={product.price} onChange={onChangeInput} required />
        <input type="text" name="content" placeholder="Content" value={product.content} onChange={onChangeInput} required />
        <input type="file" name="images" onChange={handleUpload} accept="image/*" required />
        <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={onChangeInput} required />

        <input type="submit" value="Create Product" />
      </form>
    </div>
  );
}

export default CreateProduct;
