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
    <div className="min-h-screen bg-gray-100 lg:flex">
      <aside className="bg-gray-950 text-white lg:w-72 lg:min-h-screen lg:flex lg:flex-col">
        <div className="p-4 lg:p-6 border-b border-gray-800">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src={logo}
              alt="MBrothers logo"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-amber-400"
            />
            <div>
              <p className="text-lg lg:text-xl font-bold">MBrothers</p>
              <p className="text-xs text-amber-200">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-3 lg:p-4 lg:flex-1 flex lg:block gap-2 overflow-x-auto lg:space-y-2">
          {adminLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition whitespace-nowrap ${
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

        <div className="p-3 lg:p-4 border-t border-gray-800 flex lg:block gap-2 lg:space-y-3 overflow-x-auto">
          <Link to="/" className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-amber-200 transition whitespace-nowrap">
            <Icon name="home" className="w-5 h-5" />
            Client Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="lg:w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-amber-200 transition cursor-pointer whitespace-nowrap"
          >
            <Icon name="logOut" className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:sticky lg:top-0 lg:z-40">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-red-600">Management</p>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Admin Workspace</h1>
          </div>
          <div className="flex items-center gap-3 sm:text-right min-w-0">
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{currentUser?.name}</p>
              <p className="text-sm text-gray-500 truncate">{currentUser?.email}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center shrink-0">
              <Icon name="admin" className="w-5 h-5" />
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
