import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
        const storedUsers = localStorage.getItem('registeredUsers');
        const registeredUsers = storedUsers ? JSON.parse(storedUsers) : [];
        
        if (!Array.isArray(registeredUsers)) {
          throw new Error('User data corrupted. Please register again.');
        }

        const user = registeredUsers.find(
          user => user.email === email && user.password === password
        );

        if (user) {
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

  const handleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: 'Email is required for password reset.' });
    } else {
      alert(`Password reset link sent to ${email}`);
    }
  };

  return (
    <div 
      className="login-page relative flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">Please login to your account</p>
        <form onSubmit={showForgotPassword ? handlePasswordReset : handleSubmit}>
          {!showForgotPassword && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </>
          )}
          
          {showForgotPassword && (
            <div className="mb-4">
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">Enter your email:</label>
              <input
                type="email"
                id="reset-email"
                name="reset-email"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          )}
          
          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            {showForgotPassword ? 'Reset Password' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          <a 
            href="#" 
            className="text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            {showForgotPassword ? 'Back to Login' : 'Forget Password?'}
          </a>
        </p>
        <p className="mt-6 text-sm text-center text-gray-600">
          {!showForgotPassword && (
            <a href="/register" className="text-blue-500 hover:underline">Register here</a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;