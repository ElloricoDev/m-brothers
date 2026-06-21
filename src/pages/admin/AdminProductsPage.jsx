import { mockProducts } from '../../data/products';
import Icon from '../../components/Icon';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="package" className="w-8 h-8 text-red-600" />
          Products
        </h2>
        <p className="text-gray-600 mt-2">Review product pricing, categories, and stock levels.</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Stock</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map(product => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{product.category}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
