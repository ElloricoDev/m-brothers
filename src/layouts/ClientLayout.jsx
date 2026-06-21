import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../components/Icon';
import logo from '../assets/logo.jpg';

export default function ClientLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logo}
                  alt="MBrothers logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                />
                <h3 className="text-lg font-bold">MBrothers</h3>
              </div>
              <p className="text-gray-400">M-Brothers Main Motorcycle Gears Trading.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/products" className="hover:text-white transition">Products</a></li>
                <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Info</h3>
              <p className="text-gray-400 flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4" />
                Support: (555) 123-4567
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4" />
                Email: support@mbrothers.ph
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 MBrothers E-Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
