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
    <>
    <div className="container mx-auto px-4 h-full pt-16">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Sign in with</h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white text-blueGray-700 font-normal px-4 py-2 rounded shadow hover:shadow-md inline-flex items-center text-xs"
                  type="button"
                >
                  <img
                    alt="Google"
                    className="w-5 mr-1"
                    src={require('../../assets/img/google.svg').default}
                  />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full focus:outline-none focus:ring ease-linear transition-all duration-150 ${
                      errors.email ? 'border border-red-500' : 'border-none'
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full focus:outline-none focus:ring ease-linear transition-all duration-150 ${
                      errors.password ? 'border border-red-500' : 'border-none'
                    }`}
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {apiError && <p className="text-red-500 text-sm mb-2">{apiError}</p>}

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-blueGray-600"
              >
                <small>Forgot password?</small>
              </a>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/register" className="text-blueGray-600">
                <small>Create new account</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
