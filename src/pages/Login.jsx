import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        // Get users from localStorage or initialize empty array
        const storedUsers = localStorage.getItem('registeredUsers');
        const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Verify we have an array
        if (!Array.isArray(registeredUsers)) {
          throw new Error('User data corrupted. Please register again.');
        }

        // Find matching user
        const user = registeredUsers.find(
          user => user.email === email && user.password === password
        );

        if (user) {
          // Store user data without password
          const { password: _, ...safeUserData } = user;
          localStorage.setItem('currentUser', JSON.stringify(safeUserData));
          navigate('/profile');
        } else {
          setApiError('Invalid email or password.');
        }
      } catch (error) {
        setApiError(error.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline">Register here</a>
      </p>
    </div>
  );
};

export default Login;