import { NavLink, Outlet, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';
import logo from '../assets/logo.jpg';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: 'chart', end: true },
  { to: '/admin/orders', label: 'Orders', icon: 'receipt' },
  { to: '/admin/products', label: 'Products', icon: 'package' },
];

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-gray-950 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src={logo}
              alt="MBrothers logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
            />
            <div>
              <p className="text-xl font-bold">MBrothers</p>
              <p className="text-xs text-amber-200">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 flex-1 space-y-2">
          {adminLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-900 hover:text-amber-200'
                }`
              }
            >
              <Icon name={link.icon} className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-3">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-amber-200 transition">
            <Icon name="home" className="w-5 h-5" />
            Client Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-amber-200 transition cursor-pointer"
          >
            <Icon name="logOut" className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="fixed top-0 left-72 right-0 z-40 h-24 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-red-600">Management</p>
            <h1 className="text-2xl font-bold text-gray-900">Admin Workspace</h1>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="font-semibold text-gray-900">{currentUser?.name}</p>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center">
              <Icon name="admin" className="w-5 h-5" />
            </div>
          </div>
        </header>

        <main className="p-8 pt-32 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
