import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import UserSignUp from './Pages/UserSignUp/UserSignUp';
import UserSignIn from './Pages/UserSignIn/UserSignIn';
import UserPurchases from './Pages/UserPurchases/UserPurchases';
import AdminSignUp from './Pages/AdminSignUp/AdminSignUp';
import AdminSignIn from './Pages/AdminSignIn/AdminSignIn';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import CoursesPreview from './Pages/CoursesPreview/CoursesPreview';
import PurchaseCourse from './Pages/PurchaseCourse/PurchaseCourse';
import ProtectedRoute from './components/ProtectedRoute';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/user/signin" element={<UserSignIn />} />
          <Route
            path="/user/purchases"
            element={
              <ProtectedRoute>
                <UserPurchases />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/courses/preview" element={<CoursesPreview />} />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute>
                <PurchaseCourse />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
