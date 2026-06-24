export const PAYMENT_METHODS = {
  gcash: 'GCash',
  cod: 'Cash on Delivery',
};

export const FULFILLMENT_STATUSES = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800',
  },
  processing: {
    label: 'Processing',
    className: 'bg-purple-100 text-purple-800',
  },
  packed: {
    label: 'Packed',
    className: 'bg-blue-100 text-blue-800',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-emerald-100 text-emerald-800',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800',
  },
};

export const PAYMENT_STATUSES = {
  pending_verification: {
    label: 'Pending GCash Verification',
    className: 'bg-sky-100 text-sky-800',
  },
  verified: {
    label: 'Payment Verified',
    className: 'bg-green-100 text-green-800',
  },
  pay_on_delivery: {
    label: 'Pay on Delivery',
    className: 'bg-amber-100 text-amber-800',
  },
  collected: {
    label: 'COD Collected',
    className: 'bg-green-100 text-green-800',
  },
  failed: {
    label: 'Payment Issue',
    className: 'bg-red-100 text-red-800',
  },
};

export const formatPeso = (amount = 0) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

export const calculateOrderTotals = (items = []) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const vatIncluded = subtotal - subtotal / 1.12;

  return {
    subtotal,
    shipping,
    vatIncluded,
    total: subtotal + shipping,
  };
};

export const loadOrders = () => {
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

export const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const getOrderItemsCount = (order) => {
  return (order.items || []).reduce((sum, item) => sum + item.quantity, 0);
};

export const getOrdersForUser = (orders, user) => {
  if (!user) {
    return [];
  }

  return orders.filter(order => order.userId === user.id || order.email === user.email);
};

export const getFulfillmentStatus = (order) => {
  return order.fulfillmentStatus || order.status || 'pending';
};

export const getPaymentStatus = (order) => {
  if (order.paymentStatus) {
    return order.paymentStatus;
  }

  return order.paymentMethod === 'gcash' ? 'pending_verification' : 'pay_on_delivery';
};

export const getFulfillmentStatusMeta = (status) => {
  return FULFILLMENT_STATUSES[status] || FULFILLMENT_STATUSES.pending;
};

export const getPaymentStatusMeta = (status) => {
  return PAYMENT_STATUSES[status] || PAYMENT_STATUSES.pay_on_delivery;
};

export const getPaymentMethodLabel = (method) => {
  return PAYMENT_METHODS[method] || (method || 'Payment').replace('-', ' ');
};

export const formatOrderDate = (order) => {
  const value = order.createdAt || order.date;
  if (!value) {
    return 'No date';
  }

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
};

export const formatShippingAddress = (order) => {
  if (order.shippingAddress) {
    const { street, barangay, city, province, postalCode } = order.shippingAddress;
    return [street, barangay, city, province, postalCode].filter(Boolean).join(', ');
  }

  return order.address || 'No shipping address';
};

export const createOrderFromCheckout = ({ cart, currentUser, formData }) => {
  const totals = calculateOrderTotals(cart);
  const paymentStatus = formData.paymentMethod === 'gcash'
    ? 'pending_verification'
    : 'pay_on_delivery';
  const createdAt = new Date().toISOString();
  const shippingAddress = {
    street: formData.street,
    barangay: formData.barangay,
    city: formData.city,
    province: formData.province,
    postalCode: formData.postalCode,
  };

  return {
    orderId: `ORD-${Date.now()}`,
    customerName: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phone,
    address: formatShippingAddress({ shippingAddress }),
    shippingAddress,
    deliveryNotes: formData.deliveryNotes,
    items: cart,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    vatIncluded: totals.vatIncluded,
    tax: 0,
    total: totals.total,
    paymentMethod: formData.paymentMethod,
    paymentStatus,
    paymentDetails: formData.paymentMethod === 'gcash'
      ? {
          accountName: formData.gcashName,
          referenceNumber: formData.gcashReference,
        }
      : {},
    fulfillmentStatus: 'pending',
    status: 'pending',
    date: createdAt.split('T')[0],
    createdAt,
    userId: currentUser.id,
  };
};
