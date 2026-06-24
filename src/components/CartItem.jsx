import { useCart } from '../context/useCart';
import { formatPeso } from '../utils/orders';
import Button from './Button';
import Icon from './Icon';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-amber-100">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
        <p className="text-gray-600 text-sm mb-2">{formatPeso(item.price)} each</p>
        
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-600">Qty:</label>
          <select 
            id={`qty-${item.id}`}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <p className="text-lg font-semibold text-red-600 mb-2">
          Subtotal: {formatPeso(item.price * item.quantity)}
        </p>

        <Button 
          variant="danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="w-full sm:w-auto"
        >
          <Icon name="trash" className="w-4 h-4" />
          Remove
        </Button>
      </div>
    </div>
  );
}
