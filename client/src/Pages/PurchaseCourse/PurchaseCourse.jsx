import React, { useState } from 'react';
import { z } from 'zod';
import axiosInstance from '../../api/axiosConfig';
import styles from './PurchaseCourse.module.css';

const purchaseSchema = z.object({ courseId: z.string() });

export default function PurchaseCourse() {
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      purchaseSchema.parse({ courseId });
      const res = await axiosInstance.post('/course/purchase', { courseId });
      setMessage(res.data.message);
    } catch (err) {
      if (err.name === 'ZodError') {
        setError('Invalid Course ID');
      } else {
        setError(err.response?.data || 'Error purchasing course');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Purchase Course</h2>
      <form onSubmit={handlePurchase} className={styles.form}>
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="submit">Purchase</button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}
    </div>
  );
}
