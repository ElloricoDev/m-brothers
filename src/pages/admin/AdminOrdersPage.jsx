import { useState } from 'react';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { getOrderItemsCount, loadOrders, saveOrders } from '../../utils/orders';

export default function AdminOrdersPage() {
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
    saveOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Icon name="receipt" className="w-8 h-8 text-red-600" />
            Orders
          </h2>
          <p className="text-gray-600 mt-2">Review customer orders and update fulfillment status.</p>
        </div>
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

      <div className="bg-white rounded-lg shadow-lg p-6">
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
                        {getOrderItemsCount(order)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-700">{order.date}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(event) => handleStatusChange(order.orderId, event.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}
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
            <p className="text-gray-600 text-lg">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
