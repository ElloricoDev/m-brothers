import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import {
  calculateOrderTotals,
  createOrderFromCheckout,
  formatPeso,
  getPaymentMethodLabel,
  loadOrders,
  saveOrders,
} from '../utils/orders';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ').slice(1).join(' ') || '',
    email: currentUser?.email || '',
    phone: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'gcash',
    gcashName: '',
    gcashReference: '',
  });

  const total = getTotalPrice();
  const totals = calculateOrderTotals(cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const order = createOrderFromCheckout({ cart, currentUser, formData });
      const orders = loadOrders();
      orders.push(order);
      saveOrders(orders);

      clearCart();
      navigate(`/success/${order.orderId}`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center bg-white rounded-lg p-12 max-w-md">
          <Icon name="cart" className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Please add items to your cart before checking out.</p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/products')}
            className="w-full"
          >
            <Icon name="package" className="w-5 h-5" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Icon name="creditCard" className="w-8 h-8 text-red-600" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="user" className="w-6 h-6 text-amber-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input 
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="09XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="mapPin" className="w-6 h-6 text-emerald-600" />
                  Shipping Address
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Street Address</label>
                  <input 
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="House no., street, subdivision"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Barangay</label>
                    <input 
                      type="text"
                      name="barangay"
                      value={formData.barangay}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Barangay"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City / Municipality</label>
                    <input 
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="City or municipality"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Province</label>
                    <input 
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Province"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Postal Code</label>
                    <input 
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">Delivery Notes</label>
                  <textarea
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Landmark, preferred delivery time, or rider instructions"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="creditCard" className="w-6 h-6 text-red-600" />
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['gcash', 'cod'].map(method => (
                    <label
                      key={method}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        formData.paymentMethod === method
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                        <Icon name={method === 'gcash' ? 'phone' : 'truck'} className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800 font-semibold">{getPaymentMethodLabel(method)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {method === 'gcash'
                          ? 'Submit your GCash reference for manual admin verification.'
                          : 'Pay the rider when your order arrives.'}
                      </p>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'gcash' && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-sky-50 border border-sky-100 rounded-lg p-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">GCash Account Name</label>
                      <input
                        type="text"
                        name="gcashName"
                        value={formData.gcashName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Name on GCash receipt"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">GCash Reference No.</label>
                      <input
                        type="text"
                        name="gcashReference"
                        value={formData.gcashReference}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="13-digit reference number"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                <Icon name={loading ? 'truck' : 'checkCircle'} className="w-5 h-5" />
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit border border-amber-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon name="receipt" className="w-6 h-6 text-amber-600" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-96 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPeso(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatPeso(total)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>VAT included</span>
                <span>{formatPeso(totals.vatIncluded)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-red-600">{formatPeso(totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
