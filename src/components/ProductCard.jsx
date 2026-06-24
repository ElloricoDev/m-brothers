import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { formatPeso } from '../utils/orders';
import Button from './Button';
import Icon from './Icon';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-36 sm:h-48 object-cover"
        />
      </Link>
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`} className="block">
          <p className="text-xs sm:text-sm text-amber-700 font-semibold mb-1 flex items-center gap-1">
            <Icon name="tag" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{product.category}</span>
          </p>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 hover:text-red-600 transition">
            {product.name}
          </h3>
          <p className="hidden sm:block text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-3 sm:mb-4">
            <span className="text-lg sm:text-2xl font-bold text-red-600">
              {formatPeso(product.price)}
            </span>
            <span className="text-xs sm:text-sm text-emerald-700 font-semibold">
              Stock: {product.stock}
            </span>
          </div>
        </Link>
        <Button 
          variant="primary"
          size="full"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 && <Icon name="plus" className="w-4 h-4" />}
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
