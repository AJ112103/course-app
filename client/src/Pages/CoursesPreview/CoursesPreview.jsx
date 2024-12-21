import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './CoursesPreview.module.css';

export default function CoursesPreview() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/course/preview');
        setCourses(res.data);
      } catch (err) {
        setError(err.response?.data || 'Error fetching courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Courses Preview</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.grid}>
        {courses.map(course => (
          <div key={course._id} className={styles.card}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            <img src={course.imageUrl} alt={course.title} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}
