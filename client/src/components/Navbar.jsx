import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface-container-low/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40' : 'bg-transparent border-b border-transparent'}`}>
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1600px] mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white font-headline uppercase hover:scale-105 transition-transform duration-300">
              CHILLPAD
            </Link>
          </div>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white border-b-2 border-primary pb-1 font-headline font-bold tracking-tighter uppercase text-sm hover:scale-105 transition-all">Discover</Link>
            <Link to="/" className="text-on-surface-variant hover:text-white transition-colors duration-300 font-headline font-bold tracking-tighter uppercase text-sm hover:scale-105">Villas</Link>
            <Link to="/" className="text-on-surface-variant hover:text-white transition-colors duration-300 font-headline font-bold tracking-tighter uppercase text-sm hover:scale-105">Cabins</Link>
            <Link to="/" className="text-on-surface-variant hover:text-white transition-colors duration-300 font-headline font-bold tracking-tighter uppercase text-sm hover:scale-105">Beachfront</Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4 relative">
            <Link to="/create" className="hidden lg:block text-sm font-semibold text-white px-4 py-2 rounded-full hover:bg-white/5 cursor-pointer transition-all">
              Host your place
            </Link>
            
            <div 
                className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-full border border-white/5 hover:shadow-lg transition-all cursor-pointer relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="material-symbols-outlined text-white">menu</span>
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-surface-container-high border border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Account</p>
                        <p className="text-sm font-bold text-white truncate">{user.username}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-on-surface hover:bg-white/5 hover:text-white transition-colors">My Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm font-bold text-primary hover:bg-primary/10 transition-colors mt-1">Log Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm font-bold text-white hover:bg-white/5 transition-colors">Log In</Link>
                      <Link to="/register" className="block px-4 py-2 text-sm text-on-surface hover:bg-white/5 hover:text-white transition-colors">Sign Up</Link>
                    </>
                  )}
                  <div className="border-t border-white/5 my-2"></div>
                  <Link to="/create" className="block px-4 py-2 text-sm text-on-surface hover:bg-white/5 hover:text-white transition-colors">Host your place</Link>
                  <Link to="/" className="block px-4 py-2 text-sm text-on-surface hover:bg-white/5 hover:text-white transition-colors">Help Center</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Backdrop & Sheet (Optional but implemented as simple dropdown above) */}
    </>
  );
};

export default Navbar;
