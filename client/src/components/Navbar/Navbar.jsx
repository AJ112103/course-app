import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>My App</Link>
      <div className={styles.links}>
        {!token && (
          <>
            <Link to="/user/signup">User Signup</Link>
            <Link to="/user/signin">User Signin</Link>
            <Link to="/admin/signup">Admin Signup</Link>
            <Link to="/admin/signin">Admin Signin</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/user/purchases">My Purchases</Link>
            <Link to="/courses/preview">Courses Preview</Link>
            <Link to="/purchase">Purchase Course</Link>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
