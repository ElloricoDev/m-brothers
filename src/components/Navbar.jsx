import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import Icon from './Icon';
import logo from '../assets/logo.jpg';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 transition ${
    isActive ? 'text-amber-300 font-semibold' : 'text-white hover:text-amber-200'
  }`;

const cartLinkClass = ({ isActive }) =>
  `relative flex items-center gap-2 transition ${
    isActive ? 'text-amber-300 font-semibold' : 'text-white hover:text-amber-200'
  }`;

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { currentUser, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getTotalItems();

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 text-xl sm:text-2xl font-bold hover:text-amber-200 transition min-w-0">
          <img
            src={logo}
            alt="MBrothers logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-400 shrink-0"
          />
          <span className="truncate">MBrothers</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} className="w-6 h-6" />
        </button>

        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <NavLink 
              to="/" 
              end
              className={navLinkClass}
            >
              <Icon name="home" className="w-4 h-4" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={navLinkClass}
            >
              <Icon name="package" className="w-4 h-4" />
              Products
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={navLinkClass}
              >
                <Icon name="admin" className="w-4 h-4" />
                Admin
              </NavLink>
            </li>
          )}
          {currentUser && !isAdmin && (
            <>
              <li>
                <NavLink
                  to="/orders"
                  className={navLinkClass}
                >
                  <Icon name="receipt" className="w-4 h-4" />
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={navLinkClass}
                >
                  <Icon name="user" className="w-4 h-4" />
                  Profile
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink 
              to="/cart" 
              className={cartLinkClass}
            >
              <Icon name="cart" className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-amber-200 transition cursor-pointer"
              >
                <Icon name="logOut" className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={navLinkClass}
              >
                <Icon name="logIn" className="w-4 h-4" />
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-3">
          <ul className="space-y-1">
            <li>
              <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
                <Icon name="home" className="w-4 h-4" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={navLinkClass} onClick={closeMenu}>
                <Icon name="package" className="w-4 h-4" />
                Products
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  <Icon name="admin" className="w-4 h-4" />
                  Admin
                </NavLink>
              </li>
            )}
            {currentUser && !isAdmin && (
              <>
                <li>
                  <NavLink to="/orders" className={navLinkClass} onClick={closeMenu}>
                    <Icon name="receipt" className="w-4 h-4" />
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
                    <Icon name="user" className="w-4 h-4" />
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/cart" className={cartLinkClass} onClick={closeMenu}>
                <Icon name="cart" className="w-4 h-4" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 bg-amber-400 text-gray-950 text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {currentUser ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-amber-200 transition cursor-pointer"
                >
                  <Icon name="logOut" className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                  <Icon name="logIn" className="w-4 h-4" />
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
