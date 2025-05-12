import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// Pages existantes
//import Login from './pages/Login';
//import Register from './pages/Register';
//import Profile from './pages/Profile';

// Nouvelles pages
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminFeedbackPage from './pages/AdminFeedbackPage';
import Dashboard from './views/Index';
import Landing from "./views/Landing.js";
// views
import Login from "./views/auth/Login.js";
import Register from "./views/auth/Register.js";
import Profile from "./views/Profile.js";
import Admin from './layouts/Admin.js';
import Auth from "./layouts/Auth.js";
import Tables from "./views/admin/Tables.js";


function App() {
  return (
    <Router>
      {/* Simple menu de navigation 
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/feedback">Feedback</Link> 
        <Link to="/admin-feedbacks">Admin Feedbacks</Link>
      </nav>*/}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />
        {/*<Route path="/admin" element={<AdminPage />} />*/}
        <Route path="*" element={<Login />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/admin-feedbacks" element={<AdminFeedbackPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Landing/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/tables" element={<Tables />} />
        
      </Routes>
    </Router>
  );
}

export default App;
