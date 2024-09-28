import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

// Functional component for rendering the navigation bar
const Navbar = () => {
  return (
    <nav className="bg-prime p-3"> {/* Navigation container with background color and padding */}
      <div className="flex justify-between items-center"> {/* Flex container to space out elements */}

        {/* Left section: Logo and title */}
        <div className="flex items-center pl-4">
          {/* Link to home with logo and dashboard title */}
          <Link to="/" className="flex items-center text-black text-xl font-bold">
            {/* Display logo image */}
            <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
            Software Sustainability Dashboard
          </Link>
        </div>

        {/* Right section: Navigation links */}
        <div className="flex space-x-4 pr-4">
          {/* Links to different pages in the dashboard */}
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
