import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [updateForm, setUpdateForm] = useState({
    courseId: '',
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [deleteId, setDeleteId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get('/admin/course/bulk');
      setCourses(res.data);
    } catch (err) {
      setError(err.response?.data || 'Error fetching courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateChange = (e) => {
    setCreateForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdateChange = (e) => {
    setUpdateForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createCourse = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axiosInstance.post('/admin/course', createForm);
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data || 'Error creating course');
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axiosInstance.put('/admin/course', updateForm);
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data || 'Error updating course');
    }
  };

  const deleteCourse = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axiosInstance.delete('/admin/course', {
        data: { courseId: deleteId }
      });
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data || 'Error deleting course');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Create Course</h3>
          <form onSubmit={createCourse}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={createForm.title}
              onChange={handleCreateChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={createForm.description}
              onChange={handleCreateChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={createForm.price}
              onChange={handleCreateChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={createForm.imageUrl}
              onChange={handleCreateChange}
              required
            />
            <button type="submit">Create</button>
          </form>
        </div>

        <div className={styles.card}>
          <h3>Update Course</h3>
          <form onSubmit={updateCourse}>
            <input
              type="text"
              name="courseId"
              placeholder="Course ID"
              value={updateForm.courseId}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="New Title"
              value={updateForm.title}
              onChange={handleUpdateChange}
            />
            <textarea
              name="description"
              placeholder="New Description"
              value={updateForm.description}
              onChange={handleUpdateChange}
            />
            <input
              type="number"
              name="price"
              placeholder="New Price"
              value={updateForm.price}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="New Image URL"
              value={updateForm.imageUrl}
              onChange={handleUpdateChange}
            />
            <button type="submit">Update</button>
          </form>
        </div>

        <div className={styles.card}>
          <h3>Delete Course</h3>
          <form onSubmit={deleteCourse}>
            <input
              type="text"
              placeholder="Course ID"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              required
            />
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>

      <hr/>
      <h3>Courses You Created</h3>
      <div className={styles.coursesList}>
        {courses.map(course => (
          <div key={course._id} className={styles.courseCard}>
            <h4>{course.title}</h4>
            <p>ID: {course._id}</p>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            <img src={course.imageUrl} alt={course.title} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}
