import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">VeloCar</h1>
        <ul className="flex space-x-4">
          <li><Link to="/login" className="hover:underline">Login</Link></li>
          <li><Link to="/register" className="hover:underline">Register</Link></li>
          <li><Link to="/profile" className="hover:underline">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
