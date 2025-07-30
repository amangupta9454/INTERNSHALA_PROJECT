import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, LogIn, Calendar, LogOut, LayoutDashboard, Heart } from 'lucide-react';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={isAuthenticated ? "/dashboard" : "/"} 
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className='text-green-500'>Wellness Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Home</span>
                </Link>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Login</span>
                </Link>
                <Link 
                  to="/my-sessions" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Sessions</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 group"
                >
                  <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl mt-2 p-4 space-y-3 border border-gray-200">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Home</span>
                </Link>
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                >
                  <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Login</span>
                </Link>
                <Link 
                  to="/my-sessions" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Sessions</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                >
                  <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                  <span className='text-white'>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 w-full shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;