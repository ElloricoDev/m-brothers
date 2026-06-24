import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { useCart } from '../context/useCart';
import { formatPeso } from '../utils/orders';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              <Icon name="arrowLeft" className="w-5 h-5" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-gray-600 text-sm sm:text-base break-words">
          <Link to="/products" className="hover:text-red-600">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border border-amber-100">
          {/* Product Image */}
          <div>
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-4"
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="text-amber-700 text-sm font-semibold mb-2 flex items-center gap-1">
              <Icon name="tag" className="w-4 h-4" />
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <p className="text-gray-600 text-base sm:text-lg mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-3xl sm:text-4xl font-bold text-red-600">{formatPeso(product.price)}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <p className="text-base sm:text-lg">
                <span className="font-semibold">Availability:</span>{' '}
                <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Button 
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full sm:flex-1"
              >
                <Icon name="cart" className="w-5 h-5" />
                Add to Cart
              </Button>
              <Link to="/products" className="w-full sm:flex-1">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <Icon name="arrowLeft" className="w-5 h-5" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Icon name="shield" className="w-5 h-5 text-emerald-600" />
                Product Information
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-start gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />Premium quality motorcycle accessories</li>
                <li className="flex items-start gap-2"><Icon name="truck" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />Nationwide shipping available</li>
                <li className="flex items-start gap-2"><Icon name="shield" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />30-day money-back guarantee</li>
                <li className="flex items-start gap-2"><Icon name="phone" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />Free technical support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="package" className="w-6 h-6 text-amber-600" />
            Other {product.category} Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100"
                >
                  <img 
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-red-600 font-bold">{formatPeso(relatedProduct.price)}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
