import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { useAuth } from '../context/useAuth';

export default function SuccessPage() {
  const { orderId } = useParams();
  const { isAdmin } = useAuth();
  const order = useMemo(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find(o => o.orderId === orderId);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="text-center bg-white rounded-lg shadow-2xl p-8 max-w-2xl">
        {/* Success Icon */}
        <Icon name="checkCircle" className="w-16 h-16 text-emerald-600 mx-auto mb-4" />

        <h1 className="text-4xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-8">Thank you for your purchase. Your order has been successfully placed.</p>

        {/* Order Details */}
        {order && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600 font-semibold flex items-center gap-2">
                  <Icon name="receipt" className="w-4 h-4 text-red-600" />
                  Order Number
                </p>
                <p className="text-2xl font-bold text-red-600">{order.orderId}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold flex items-center gap-2">
                  <Icon name="calendar" className="w-4 h-4 text-amber-600" />
                  Order Date
                </p>
                <p className="text-2xl font-bold text-gray-800">{order.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-gray-600 font-semibold mb-2">Customer Name</p>
                <p className="text-gray-800">{order.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold mb-2">Email</p>
                <p className="text-gray-800">{order.email}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 font-semibold mb-2">Shipping Address</p>
              <p className="text-gray-800">{order.address}</p>
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <p className="text-gray-600 font-semibold mb-3">Items Ordered</p>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-800">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-800">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Tax (10%):</span>
                <span className="font-semibold text-gray-800">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-red-600">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-gray-700"><strong>Payment Method:</strong> {order.paymentMethod.replace('-', ' ')}</p>
              <p className="text-gray-700"><strong>Status:</strong> <span className="text-orange-600 font-semibold capitalize">{order.status}</span></p>
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
            <li className="flex items-center gap-2"><Icon name="mail" className="w-4 h-4 text-emerald-600" />A confirmation email has been sent to your address</li>
            <li className="flex items-center gap-2"><Icon name="receipt" className="w-4 h-4 text-emerald-600" />You can track your order in My Orders</li>
            <li className="flex items-center gap-2"><Icon name="truck" className="w-4 h-4 text-emerald-600" />Your order will be shipped within 2-3 business days</li>
            <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-600" />Free shipping on all orders</li>
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
