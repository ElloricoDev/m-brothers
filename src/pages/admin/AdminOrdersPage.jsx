import { useMemo, useState } from 'react';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  FULFILLMENT_STATUSES,
  PAYMENT_STATUSES,
  formatOrderDate,
  formatPeso,
  formatShippingAddress,
  getFulfillmentStatus,
  getFulfillmentStatusMeta,
  getOrderItemsCount,
  getPaymentMethodLabel,
  getPaymentStatus,
  getPaymentStatusMeta,
  loadOrders,
  saveOrders,
} from '../../utils/orders';

const paymentMethods = {
  all: 'All methods',
  gcash: 'GCash',
  cod: 'COD',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(loadOrders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesFulfillment = filterStatus === 'all' || getFulfillmentStatus(order) === filterStatus;
      const matchesPaymentMethod = filterPaymentMethod === 'all' || order.paymentMethod === filterPaymentMethod;
      const matchesPaymentStatus = filterPaymentStatus === 'all' || getPaymentStatus(order) === filterPaymentStatus;

      return matchesFulfillment && matchesPaymentMethod && matchesPaymentStatus;
    });
  }, [orders, filterStatus, filterPaymentMethod, filterPaymentStatus]);

  const persistOrders = (updatedOrders) => {
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  const handleFulfillmentChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId
        ? { ...order, fulfillmentStatus: newStatus, status: newStatus }
        : order
    );
    persistOrders(updatedOrders);
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, paymentStatus: newStatus } : order
    );
    persistOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    persistOrders(updatedOrders);
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Icon name="receipt" className="w-8 h-8 text-red-600" />
            Orders
          </h2>
          <p className="text-gray-600 mt-2">Verify payments, prepare orders, and update delivery movement.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
          >
            <option value="all">All fulfillment</option>
            {Object.entries(FULFILLMENT_STATUSES).map(([status, meta]) => (
              <option key={status} value={status}>{meta.label}</option>
            ))}
          </select>
          <select
            value={filterPaymentMethod}
            onChange={(event) => setFilterPaymentMethod(event.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
          >
            {Object.entries(paymentMethods).map(([method, label]) => (
              <option key={method} value={method}>{label}</option>
            ))}
          </select>
          <select
            value={filterPaymentStatus}
            onChange={(event) => setFilterPaymentStatus(event.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
          >
            <option value="all">All payments</option>
            {Object.entries(PAYMENT_STATUSES).map(([status, meta]) => (
              <option key={status} value={status}>{meta.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {filteredOrders.length > 0 ? (
          <>
          <div className="lg:hidden space-y-4">
            {filteredOrders.map(order => {
              const fulfillmentMeta = getFulfillmentStatusMeta(getFulfillmentStatus(order));
              const paymentMeta = getPaymentStatusMeta(getPaymentStatus(order));

              return (
                <article key={order.orderId} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-red-600">{order.orderId}</p>
                      <p className="text-xs text-gray-500">{formatOrderDate(order)}</p>
                    </div>
                    <p className="font-bold text-green-600 text-right">{formatPeso(order.total)}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600 break-words">{order.email}</p>
                    {order.phone && <p className="text-sm text-gray-600">{order.phone}</p>}
                    <p className="text-sm text-gray-500 mt-2">{formatShippingAddress(order)}</p>
                    {order.deliveryNotes && <p className="text-sm text-amber-700 mt-1">Note: {order.deliveryNotes}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-500">Items</p>
                      <p className="font-semibold text-gray-900">{getOrderItemsCount(order)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-500">Payment</p>
                      <p className="font-semibold text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</p>
                    </div>
                  </div>

                  {(order.paymentDetails?.accountName || order.paymentDetails?.referenceNumber) && (
                    <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-sm text-gray-700">
                      {order.paymentDetails?.accountName && <p>Name: {order.paymentDetails.accountName}</p>}
                      {order.paymentDetails?.referenceNumber && <p>Ref: {order.paymentDetails.referenceNumber}</p>}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Fulfillment
                      <select
                        value={getFulfillmentStatus(order)}
                        onChange={(event) => handleFulfillmentChange(order.orderId, event.target.value)}
                        className={`mt-2 w-full px-3 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer ${fulfillmentMeta.className}`}
                      >
                        {Object.entries(FULFILLMENT_STATUSES).map(([status, meta]) => (
                          <option key={status} value={status}>{meta.label}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm font-semibold text-gray-700">
                      Payment Status
                      <select
                        value={getPaymentStatus(order)}
                        onChange={(event) => handlePaymentStatusChange(order.orderId, event.target.value)}
                        className={`mt-2 w-full px-3 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer ${paymentMeta.className}`}
                      >
                        {Object.entries(PAYMENT_STATUSES).map(([status, meta]) => (
                          <option key={status} value={status}>{meta.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteOrder(order.orderId)}
                    className="w-full"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                    Delete
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Order</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Payment</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Items</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Fulfillment</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Payment Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const fulfillmentMeta = getFulfillmentStatusMeta(getFulfillmentStatus(order));
                  const paymentMeta = getPaymentStatusMeta(getPaymentStatus(order));

                  return (
                    <tr key={order.orderId} className="border-b border-gray-200 align-top hover:bg-gray-50">
                      <td className="px-4 py-4 min-w-44">
                        <p className="font-semibold text-red-600">{order.orderId}</p>
                        <p className="text-gray-600 text-xs">{formatOrderDate(order)}</p>
                      </td>
                      <td className="px-4 py-4 min-w-64">
                        <p className="font-semibold text-gray-800">{order.customerName}</p>
                        <p className="text-gray-600 text-xs">{order.email}</p>
                        {order.phone && <p className="text-gray-600 text-xs">{order.phone}</p>}
                        <p className="text-gray-500 text-xs mt-2 max-w-xs">{formatShippingAddress(order)}</p>
                        {order.deliveryNotes && <p className="text-amber-700 text-xs mt-1">Note: {order.deliveryNotes}</p>}
                      </td>
                      <td className="px-4 py-4 min-w-52">
                        <p className="font-semibold text-gray-800">{getPaymentMethodLabel(order.paymentMethod)}</p>
                        {order.paymentDetails?.accountName && (
                          <p className="text-gray-600 text-xs">Name: {order.paymentDetails.accountName}</p>
                        )}
                        {order.paymentDetails?.referenceNumber && (
                          <p className="text-gray-600 text-xs">Ref: {order.paymentDetails.referenceNumber}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                          <Icon name="boxes" className="w-3 h-3" />
                          {getOrderItemsCount(order)}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-green-600">{formatPeso(order.total)}</td>
                      <td className="px-4 py-4 min-w-44">
                        <select
                          value={getFulfillmentStatus(order)}
                          onChange={(event) => handleFulfillmentChange(order.orderId, event.target.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer ${fulfillmentMeta.className}`}
                        >
                          {Object.entries(FULFILLMENT_STATUSES).map(([status, meta]) => (
                            <option key={status} value={status}>{meta.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 min-w-56">
                        <select
                          value={getPaymentStatus(order)}
                          onChange={(event) => handlePaymentStatusChange(order.orderId, event.target.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer ${paymentMeta.className}`}
                        >
                          {Object.entries(PAYMENT_STATUSES).map(([status, meta]) => (
                            <option key={status} value={status}>{meta.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
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
                  );
                })}
              </tbody>
            </table>
          </div>
          </>
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
