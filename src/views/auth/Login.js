import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Welcome Back
            </h2>
            
            <div className="space-y-6">
              {/* Social Sign In */}
              <div>
                <button
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
                  type="button"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5 mr-2"
                    src={require('../../assets/img/google.svg').default}
                  />
                  Sign in with Google
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full px-4 py-3 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>

                {apiError && (
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm text-red-600">{apiError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
