import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './UserPurchases.module.css';

export default function UserPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axiosInstance.get('/user/purchases');
        setPurchases(res.data.purchases);
        setCourses(res.data.courseContent);
      } catch (err) {
        setError(err.response?.data || 'Error fetching purchases');
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className={styles.container}>
      <h2>My Purchases</h2>
      {error && <div className={styles.error}>{error}</div>}
      {purchases && purchases.length > 0 ? (
        <div className={styles.grid}>
          {courses.map(course => (
            <div className={styles.card} key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: {course.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no purchased courses.</p>
      )}
    </div>
  );
}
