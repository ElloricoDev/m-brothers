import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';
import {
  formatPeso,
  getFulfillmentStatus,
  getFulfillmentStatusMeta,
  getOrdersForUser,
  loadOrders,
} from '../utils/orders';

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const userOrders = getOrdersForUser(loadOrders(), currentUser);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const latestOrder = userOrders.at(-1);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = updateProfile(formData);
    setMessage(result.ok ? 'Profile updated successfully.' : result.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Icon name="user" className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 shrink-0" />
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your account details and shopping activity.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-amber-100 p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon name="user" className="w-6 h-6 text-amber-600" />
              Account Details
            </h2>

            {message && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg p-3 mb-4">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Role</label>
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 capitalize">
                  {currentUser?.role}
                </div>
              </div>
              <Button type="submit" variant="primary" size="lg">
                <Icon name="checkCircle" className="w-5 h-5" />
                Save Profile
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md border border-red-100 p-4 sm:p-6">
              <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
                <Icon name="receipt" className="w-5 h-5 text-red-600" />
                Orders
              </h3>
              <p className="text-2xl sm:text-4xl font-bold text-red-600">{userOrders.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-emerald-100 p-4 sm:p-6">
              <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
                <Icon name="dollar" className="w-5 h-5 text-emerald-600" />
                Total Spent
              </h3>
              <p className="text-2xl sm:text-4xl font-bold text-green-600">{formatPeso(totalSpent)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-amber-100 p-4 sm:p-6 col-span-2 lg:col-span-1">
              <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
                <Icon name="truck" className="w-5 h-5 text-amber-600" />
                Latest Order
              </h3>
              {latestOrder ? (
                <div>
                  <p className="font-bold text-red-600">{latestOrder.orderId}</p>
                  <p className="text-gray-600 text-sm">{getFulfillmentStatusMeta(getFulfillmentStatus(latestOrder)).label}</p>
                </div>
              ) : (
                <p className="text-gray-600">No order history yet.</p>
              )}
              <Link to="/orders" className="inline-flex mt-4 text-red-600 font-semibold hover:text-red-700">
                View orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
