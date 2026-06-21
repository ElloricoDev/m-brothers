import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function CartPage() {
  const { cart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const total = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center bg-white rounded-lg p-12 max-w-md">
          <Icon name="cart" className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart!</p>
          <Link to="/products">
            <Button variant="primary" size="lg" className="w-full">
              <Icon name="package" className="w-5 h-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Icon name="cart" className="w-8 h-8 text-red-600" />
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Link to="/products">
              <Button variant="ghost" size="md">
                <Icon name="arrowLeft" className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit border border-amber-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon name="receipt" className="w-6 h-6 text-amber-600" />
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-red-600">${(total * 1.1).toFixed(2)}</span>
            </div>

            <Link
              to={isAuthenticated ? '/checkout' : '/login'}
              state={isAuthenticated ? undefined : { from: { pathname: '/checkout' } }}
              className="w-full"
            >
              <Button 
                variant="primary"
                size="lg"
                className="w-full mb-3"
              >
                <Icon name="creditCard" className="w-5 h-5" />
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
            </Link>

            <Link to="/products" className="w-full">
              <Button 
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <Icon name="package" className="w-5 h-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
