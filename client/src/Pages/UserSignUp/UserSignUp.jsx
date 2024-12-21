import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './UserSignUp.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/user/signup', formData);
      navigate('/user/signin');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name (optional)"
          value={formData.lastName}
          onChange={handleChange}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
