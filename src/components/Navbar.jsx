import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import Icon from './Icon';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { currentUser, isAdmin, logout } = useAuth();
  const cartCount = getTotalItems();

  return (
    <nav className="bg-gray-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:text-amber-200 transition">
          <img
            src={logo}
            alt="MBrothers logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
          />
          <span>MBrothers</span>
        </Link>

        <ul className="flex gap-6 items-center">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:text-amber-200 transition"
            >
              <Icon name="home" className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="flex items-center gap-2 hover:text-amber-200 transition"
            >
              <Icon name="package" className="w-4 h-4" />
              Products
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-2 hover:text-amber-200 transition"
              >
                <Icon name="admin" className="w-4 h-4" />
                Admin
              </Link>
            </li>
          )}
          {currentUser && !isAdmin && (
            <>
              <li>
                <Link
                  to="/orders"
                  className="flex items-center gap-2 hover:text-amber-200 transition"
                >
                  <Icon name="receipt" className="w-4 h-4" />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-amber-200 transition"
                >
                  <Icon name="user" className="w-4 h-4" />
                  Profile
                </Link>
              </li>
            </>
          )}
          <li>
            <Link 
              to="/cart" 
              className="relative hover:text-amber-200 transition flex items-center gap-2"
            >
              <Icon name="cart" className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            {currentUser ? (
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 hover:text-amber-200 transition cursor-pointer"
              >
                <Icon name="logOut" className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-amber-200 transition"
              >
                <Icon name="logIn" className="w-4 h-4" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
