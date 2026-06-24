import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';
import {
  formatOrderDate,
  formatPeso,
  formatShippingAddress,
  getFulfillmentStatus,
  getFulfillmentStatusMeta,
  getPaymentMethodLabel,
  getPaymentStatus,
  getPaymentStatusMeta,
} from '../utils/orders';

export default function SuccessPage() {
  const { orderId } = useParams();
  const { isAdmin } = useAuth();
  const order = useMemo(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find(o => o.orderId === orderId);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="text-center bg-white rounded-lg shadow-2xl p-5 sm:p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <Icon name="checkCircle" className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-600 mx-auto mb-4" />

        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">Thank you for your purchase. Your order has been successfully placed.</p>

        {/* Order Details */}
        {order && (
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <p className="text-gray-600 font-semibold flex items-center gap-2 text-sm">
                  <Icon name="receipt" className="w-4 h-4 text-red-600 shrink-0" />
                  Order Number
                </p>
                <p className="text-xl sm:text-2xl font-bold text-red-600 break-all">{order.orderId}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold flex items-center gap-2 text-sm">
                  <Icon name="calendar" className="w-4 h-4 text-amber-600 shrink-0" />
                  Order Date
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatOrderDate(order)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-gray-600 font-semibold mb-2">Customer Name</p>
                <p className="text-gray-800">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2">Contact</p>
                <p className="text-gray-800">{order.email}</p>
                {order.phone && <p className="text-gray-800">{order.phone}</p>}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 font-semibold mb-2">Shipping Address</p>
              <p className="text-gray-800">{formatShippingAddress(order)}</p>
              {order.deliveryNotes && <p className="text-gray-600 text-sm mt-1">Note: {order.deliveryNotes}</p>}
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <p className="text-gray-600 font-semibold mb-3">Items Ordered</p>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm sm:text-base text-gray-800">
                    <span className="min-w-0 truncate">{item.name} x {item.quantity}</span>
                    <span className="shrink-0">{formatPeso(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-800">{formatPeso(order.subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">VAT included:</span>
                <span className="font-semibold text-gray-800">{formatPeso(order.vatIncluded || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Shipping:</span>
                <span className="font-semibold text-gray-800">{formatPeso(order.shipping || 0)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-red-600">
                <span>Total:</span>
                <span>{formatPeso(order.total)}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-gray-700"><strong>Payment Method:</strong> {getPaymentMethodLabel(order.paymentMethod)}</p>
              {order.paymentDetails?.referenceNumber && (
                <p className="text-gray-700"><strong>GCash Reference:</strong> {order.paymentDetails.referenceNumber}</p>
              )}
              <p className="text-gray-700">
                <strong>Payment:</strong>{' '}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusMeta(getPaymentStatus(order)).className}`}>
                  {getPaymentStatusMeta(getPaymentStatus(order)).label}
                </span>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Fulfillment:</strong>{' '}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getFulfillmentStatusMeta(getFulfillmentStatus(order)).className}`}>
                  {getFulfillmentStatusMeta(getFulfillmentStatus(order)).label}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Information Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Icon name="truck" className="w-5 h-5 text-emerald-600" />
            What's Next?
          </h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4 text-emerald-600" />A confirmation has been saved to your account</li>
            <li className="flex items-center gap-2"><Icon name="receipt" className="w-4 h-4 text-emerald-600" />You can track your order in My Orders</li>
            <li className="flex items-center gap-2"><Icon name="truck" className="w-4 h-4 text-emerald-600" />Metro and provincial delivery updates appear after admin processing</li>
            <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-600" />GCash orders are manually verified before fulfillment</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link to="/products" className="flex-1">
            <Button 
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Icon name="package" className="w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>
          <Link to={isAdmin ? '/admin' : '/orders'} className="flex-1">
            <Button 
              variant="secondary"
              size="lg"
              className="w-full"
            >
              <Icon name={isAdmin ? 'admin' : 'receipt'} className="w-5 h-5" />
              {isAdmin ? 'View Admin Dashboard' : 'Track My Order'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
