import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';
import {
  formatOrderDate,
  formatPeso,
  formatShippingAddress,
  getFulfillmentStatus,
  getFulfillmentStatusMeta,
  getOrderItemsCount,
  getOrdersForUser,
  getPaymentMethodLabel,
  getPaymentStatus,
  getPaymentStatusMeta,
  loadOrders,
} from '../utils/orders';

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const orders = getOrdersForUser(loadOrders(), currentUser).reverse();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Icon name="receipt" className="w-8 h-8 text-red-600" />
              My Orders
            </h1>
            <p className="text-gray-600 mt-2">Track your purchases and fulfillment status.</p>
          </div>
          <Link to="/products">
            <Button variant="secondary" size="md">
              <Icon name="package" className="w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map(order => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-md border border-amber-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <h2 className="text-xl font-bold text-red-600">{order.orderId}</h2>
                    <p className="text-sm text-gray-600 mt-1">Placed on {formatOrderDate(order)}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getFulfillmentStatusMeta(getFulfillmentStatus(order)).className}`}>
                      {getFulfillmentStatusMeta(getFulfillmentStatus(order)).label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusMeta(getPaymentStatus(order)).className}`}>
                      {getPaymentStatusMeta(getPaymentStatus(order)).label}
                    </span>
                    <p className="text-2xl font-bold text-gray-900">{formatPeso(order.total)}</p>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">{formatPeso(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Icon name="truck" className="w-5 h-5 text-emerald-600" />
                      Tracking Summary
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Items: {getOrderItemsCount(order)}</p>
                      <p>Payment: {getPaymentMethodLabel(order.paymentMethod)}</p>
                      <p>Ship to: {formatShippingAddress(order)}</p>
                      {order.deliveryNotes && <p>Notes: {order.deliveryNotes}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-amber-100 p-12 text-center">
            <Icon name="receipt" className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Once you place an order, you can track it here.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                <Icon name="package" className="w-5 h-5" />
                Shop Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
