# Motoshop E-Commerce Prototype

A full-featured frontend-only e-commerce prototype for motorcycle accessories built with React, Vite, and Tailwind CSS.

## 🚀 Features

### User Features
- ✅ **Product Browsing** - Browse all products with category filtering and sorting
- ✅ **Product Details** - View detailed product information with related products
- ✅ **Shopping Cart** - Add/remove items, update quantities, persistent storage
- ✅ **Checkout** - Complete checkout form with customer information and order processing
- ✅ **Order Confirmation** - Order tracking with order number and details
- ✅ **Responsive Design** - Mobile-first, works perfectly on all screen sizes

### Admin Features
- ✅ **Order Management** - View all orders with status tracking
- ✅ **Status Updates** - Change order status (pending, processing, shipped)
- ✅ **Product Catalog** - View all products with stock information
- ✅ **Sales Analytics** - Dashboard with order count, revenue, and sales stats
- ✅ **Order Operations** - Delete orders and manage inventory

## 📋 Quick Start

### Prerequisites
- Node.js 16+ (comes with npm)

### Installation

```bash
cd C:\motoshop-ecommerce
npm install
npm run dev
```

The app will start on `http://localhost:5174` (or next available port)

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with cart badge
│   ├── ProductCard.jsx     # Product card component
│   ├── CartItem.jsx        # Shopping cart item component
│   └── Button.jsx          # Reusable button component
├── pages/
│   ├── HomePage.jsx        # Home page with featured products
│   ├── ProductsPage.jsx    # Products listing with filters
│   ├── ProductDetailsPage.jsx  # Product detail view
│   ├── CartPage.jsx        # Shopping cart page
│   ├── CheckoutPage.jsx    # Order checkout form
│   ├── SuccessPage.jsx     # Order confirmation page
│   └── AdminDashboard.jsx  # Admin dashboard
├── context/
│   └── CartContext.jsx     # Global cart state management
├── data/
│   └── products.js         # Mock product data (10 products)
├── App.jsx                 # Main app with routing
├── index.css               # Global styles with Tailwind
└── main.jsx                # Entry point
```

## 🗺️ Page Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Featured products & categories |
| `/products` | ProductsPage | All products with filtering |
| `/product/:id` | ProductDetailsPage | Individual product details |
| `/cart` | CartPage | Shopping cart |
| `/checkout` | CheckoutPage | Order checkout |
| `/success/:orderId` | SuccessPage | Order confirmation |
| `/admin` | AdminDashboard | Admin panel |

## 💾 Data Storage

### localStorage Keys

**`cart-items`** - Current shopping cart
```json
[
  { "id": 1, "quantity": 2, "name": "...", "price": 249.99 }
]
```

**`orders`** - Completed orders
```json
[
  {
    "orderId": "ORD-1719022540000",
    "customerName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, New York, NY 10001",
    "items": [...],
    "subtotal": 500.00,
    "tax": 50.00,
    "total": 550.00,
    "paymentMethod": "credit-card",
    "date": "2026-06-22",
    "status": "pending"
  }
]
```

## 🎨 State Management

### CartContext
Global state for shopping cart using React Context API + localStorage sync

**Actions:**
- `addToCart(product)` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Clear entire cart
- `getTotalItems()` - Get total item count
- `getTotalPrice()` - Get total price

**Hook Usage:**
```javascript
const { cart, addToCart, removeFromCart } = useCart();
```

## 🛍️ Product Data

10 mock products included across 6 categories:
- **Safety**: Helmets, protective gear
- **Apparel**: Jackets, gloves, boots
- **Accessories**: Mirrors, grips, phone mounts
- **Protection**: Crash bars, guards
- **Maintenance**: Chain lube, air filters

Each product has:
- ID, name, price, category
- Description, image URL, stock count

## 🎯 Checkout Flow

1. User adds products to cart
2. Views cart and adjusts quantities
3. Proceeds to checkout
4. Fills customer information form
5. Selects payment method
6. Places order (saves to localStorage)
7. Receives order confirmation with order number
8. Order visible in Admin Dashboard

## 📊 Admin Dashboard Features

- **Stats Cards**: Total orders, revenue, items sold, average order
- **Orders Table**: Sortable/filterable order list with status management
- **Product Catalog**: Complete product inventory with stock levels
- **Status Updates**: Change order status in real-time
- **Order Deletion**: Remove orders from system

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Context API** - State management
- **localStorage** - Data persistence

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px (sm)
- **Tablet**: 641px - 1024px (md)
- **Desktop**: 1025px+ (lg)

All pages use Tailwind's responsive grid system for automatic layout adaptation.

## ✨ Key Features Breakdown

### Real-time Cart Updates
- Cart badge updates instantly when items added/removed
- Quantity changes reflect immediately
- Persists across page refreshes

### Product Filtering
- Filter by category
- Sort by name, price (low to high), price (high to low)
- Real-time filtering without page reload

### Order Persistence
- Orders saved to localStorage
- Displayed in admin dashboard
- Status can be updated after creation
- Complete order history maintained

### Form Validation
- All required fields validated
- Email format validation
- Proper error states

## 🚀 Performance

**Production Build:**
- JS Bundle: 270KB (81.7KB gzipped)
- CSS Bundle: 6.63KB (1.66KB gzipped)
- Total: ~277KB uncompressed

## 🎓 Learning Resources

This project demonstrates:
- React Router setup and navigation
- Context API for state management
- localStorage API for persistence
- Tailwind CSS for responsive design
- Form handling and validation
- Component composition and reusability

## 📝 Future Enhancements

Potential improvements for a production version:
- Backend API integration
- Real payment processing
- User authentication
- Email notifications
- Product search functionality
- Wishlist feature
- Product reviews
- Inventory management
- Analytics tracking

## 📄 License

This is a learning project. Feel free to modify and use as needed.

---

**Status**: ✅ All 7 development phases complete and tested
**Last Updated**: 2026-06-22
