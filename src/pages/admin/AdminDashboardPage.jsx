import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/products';
import Icon from '../../components/Icon';
import {
  formatPeso,
  getFulfillmentStatus,
  getFulfillmentStatusMeta,
  getOrderItemsCount,
  getPaymentStatus,
  loadOrders,
} from '../../utils/orders';

export default function AdminDashboardPage() {
  const orders = loadOrders();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) => sum + getOrderItemsCount(order), 0);
  const pendingOrders = orders.filter(order => getFulfillmentStatus(order) === 'pending').length;
  const gcashToVerify = orders.filter(order => getPaymentStatus(order) === 'pending_verification').length;
  const codOrders = orders.filter(order => order.paymentMethod === 'cod').length;
  const recentOrders = orders.slice(-5).reverse();
  const lowStockProducts = mockProducts.filter(product => product.stock <= 10);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="chart" className="w-8 h-8 text-red-600" />
          Dashboard
        </h2>
        <p className="text-gray-600 mt-2">Monitor sales, order movement, and product inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="receipt" className="w-5 h-5 text-red-600" />
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-red-600">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-emerald-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="dollar" className="w-5 h-5 text-emerald-600" />
            Revenue
          </h3>
          <p className="text-3xl font-bold text-green-600">{formatPeso(totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="boxes" className="w-5 h-5 text-purple-600" />
            Items Sold
          </h3>
          <p className="text-3xl font-bold text-purple-600">{totalItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="truck" className="w-5 h-5 text-orange-600" />
            Pending
          </h3>
          <p className="text-3xl font-bold text-orange-600">{pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-sky-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="phone" className="w-5 h-5 text-sky-600" />
            GCash Verify
          </h3>
          <p className="text-3xl font-bold text-sky-600">{gcashToVerify}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Icon name="truck" className="w-5 h-5 text-amber-600" />
            COD
          </h3>
          <p className="text-3xl font-bold text-amber-600">{codOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Icon name="receipt" className="w-5 h-5 text-amber-600" />
              Recent Orders
            </h3>
            <Link to="/admin/orders" className="text-red-600 font-semibold hover:text-red-700">View all</Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.orderId} className="flex items-center justify-between border border-gray-100 rounded-lg p-4">
                  <div>
                    <p className="font-bold text-red-600">{order.orderId}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatPeso(order.total)}</p>
                    <p className="text-sm text-gray-500">{getFulfillmentStatusMeta(getFulfillmentStatus(order)).label}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No orders yet.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Icon name="package" className="w-5 h-5 text-red-600" />
              Low Stock
            </h3>
            <Link to="/admin/products" className="text-red-600 font-semibold hover:text-red-700">Manage</Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 6).map(product => (
              <div key={product.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {product.stock}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
