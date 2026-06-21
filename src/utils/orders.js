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
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const getOrdersForUser = (orders, user) => {
  if (!user) {
    return [];
  }

  return orders.filter(order => order.userId === user.id || order.email === user.email);
};
