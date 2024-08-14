import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-prime p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-2xl font-bold">
          Software Sustainability Dashboard
        </Link>
        <div className="space-x-4">
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