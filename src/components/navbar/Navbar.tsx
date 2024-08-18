import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-prime p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center pl-4">
          <Link to="/" className="flex items-center text-black text-xl font-bold">
            <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
            Software Sustainability Dashboard
          </Link>
        </div>
        <div className="flex space-x-4 pr-4">
          <Link to="/" className="text-black hover:text-green-200">Home</Link>
          <Link to="/projects" className="text-black hover:text-green-200">Projects</Link>
          <Link to="/settings" className="text-black hover:text-green-200">Settings</Link>
          <Link to="/documentation" className="text-black hover:text-green-200">Documentation</Link>
          <Link to="/profile" className="text-black hover:text-green-200">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
