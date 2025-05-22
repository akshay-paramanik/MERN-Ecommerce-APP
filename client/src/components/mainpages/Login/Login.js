import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';

function Login() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/user/login', user, {
        withCredentials: true,
      });

      // Set global state
      setIsLogged(true);
      setIsAdmin(res.data.isAdmin); // assuming response has isAdmin
      localStorage.setItem('firstLogin', true);

      navigate('/'); // redirect to home
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  if (isLogged) return <Navigate to="/" replace />;

  return (
    <div  className="auth-page">
      <form className="auth-form"  onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="auth-actions">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
