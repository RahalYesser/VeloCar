import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


// Pages existantes
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Nouvelles pages
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminFeedbackPage from './pages/AdminFeedbackPage';

function App() {
  return (
    <Router>
      {/* Simple menu de navigation */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/feedback">Feedback</Link> 
        <Link to="/admin-feedbacks">Admin Feedbacks</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Login />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/admin-feedbacks" element={<AdminFeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
