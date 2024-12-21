import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './UserSignIn.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const res = await axiosInstance.post('/user/signin', formData);
      localStorage.setItem('token', res.data); 
      navigate('/user/purchases');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Sign In</h2>
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
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
