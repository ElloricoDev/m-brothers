import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';
import logo from '../assets/logo.jpg';

const getRedirectPath = (user, location) => {
  const requestedPath = location.state?.from?.pathname;

  if (user.role === 'admin') {
    return '/admin';
  }

  return requestedPath || '/';
};

export default function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login, register } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const redirectPath = useMemo(() => {
    if (!currentUser) {
      return null;
    }

    return getRedirectPath(currentUser, location);
  }, [currentUser, location]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const result = isRegister ? register(formData) : login(formData);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(getRedirectPath(result.user, location), { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-xl overflow-hidden border border-amber-100">
        <div className="bg-gradient-to-br from-gray-950 via-red-900 to-amber-700 text-white p-8 flex flex-col justify-between">
          <div>
            <img
              src={logo}
              alt="MBrothers logo"
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-300 mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">MBrothers</h1>
            <p className="text-amber-100 text-lg">
              Sign in to place orders, track purchases, and access the right dashboard for your account.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 text-sm text-amber-50">
            <div className="flex items-center gap-3">
              <Icon name="cart" className="w-5 h-5" />
              Guests can browse and add items to cart.
            </div>
            <div className="flex items-center gap-3">
              <Icon name="lock" className="w-5 h-5" />
              Login is required before placing an order.
            </div>
            <div className="flex items-center gap-3">
              <Icon name="admin" className="w-5 h-5" />
              Admin accounts go straight to the admin panel.
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-red-600 mb-2">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {isRegister ? 'Register' : 'Login'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isRegister
                ? 'Choose customer for shopping or admin for dashboard access.'
                : 'Use your account to continue to checkout or admin tools.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Juan Dela Cruz"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Minimum 6 characters"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'customer', label: 'Customer', icon: 'user' },
                    { value: 'admin', label: 'Admin', icon: 'admin' },
                  ].map(role => (
                    <label
                      key={role.value}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${
                        formData.role === role.value
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 text-gray-700 hover:border-amber-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <Icon name={role.icon} className="w-5 h-5" />
                      <span className="font-semibold">{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full">
              <Icon name={isRegister ? 'userPlus' : 'logIn'} className="w-5 h-5" />
              {isRegister ? 'Create Account' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            {isRegister ? (
              <p>
                Already have an account?{' '}
                <Link to="/login" state={location.state} className="font-semibold text-red-600 hover:text-red-700">
                  Login
                </Link>
              </p>
            ) : (
              <p>
                New to MBrothers?{' '}
                <Link to="/register" state={location.state} className="font-semibold text-red-600 hover:text-red-700">
                  Register
                </Link>
              </p>
            )}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900 mb-1">Demo admin account</p>
            <p>Email: admin@mbrothers.ph</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
