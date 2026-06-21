import { useState } from 'react';
import { mockProducts } from '../data/products';
import Button from '../components/Button';
import Icon from '../components/Icon';

const loadOrders = () => {
  const savedOrders = localStorage.getItem('orders');
  if (!savedOrders) {
    return [];
  }

  try {
    return JSON.parse(savedOrders);
  } catch (error) {
    console.error('Failed to load orders:', error);
    return [];
  }
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState(loadOrders);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Calculate stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Icon name="admin" className="w-8 h-8 text-red-600" />
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
            <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <Icon name="receipt" className="w-5 h-5 text-red-600" />
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-red-600">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-emerald-100">
            <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <Icon name="dollar" className="w-5 h-5 text-emerald-600" />
              Total Revenue
            </h3>
            <p className="text-4xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <Icon name="boxes" className="w-5 h-5 text-purple-600" />
              Items Sold
            </h3>
            <p className="text-4xl font-bold text-purple-600">{totalItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
            <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <Icon name="chart" className="w-5 h-5 text-orange-600" />
              Average Order
            </h3>
            <p className="text-4xl font-bold text-orange-600">
              ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>

        {/* Filter and Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Icon name="receipt" className="w-6 h-6 text-amber-600" />
              Orders
            </h2>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'processing', 'shipped'].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Order ID</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Customer</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Items</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.orderId} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-red-600">{order.orderId}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-gray-800">{order.customerName}</p>
                          <p className="text-gray-600 text-xs">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                          <Icon name="boxes" className="w-3 h-3" />
                          {order.items.length}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-600">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-gray-700">{order.date}</td>
                      <td className="px-4 py-3">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              order.status === 'processing' ? 'bg-purple-100 text-purple-800' : 
                              'bg-green-100 text-green-800'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.orderId)}
                        >
                          <Icon name="trash" className="w-4 h-4" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="receipt" className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <p className="text-gray-600 text-lg">No orders found. When customers place orders, they will appear here.</p>
            </div>
          )}
        </div>

        {/* Product Sales Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Icon name="package" className="w-6 h-6 text-red-600" />
            Product Catalog Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Product Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Stock</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-gray-700">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
