import { Link } from 'react-router-dom';
import { mockProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 6);

  return (
    <>
      <section className="-mt-16 md:-mt-20 pt-16 md:pt-20 bg-gradient-to-r from-gray-950 via-red-900 to-amber-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-100 px-3 sm:px-4 py-2 rounded-full mb-4 max-w-full">
            <Icon name="bike" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="font-semibold text-xs sm:text-sm truncate">M-Brothers Main Motorcycle Gears Trading</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to MBrothers</h1>
          <p className="text-base sm:text-xl mb-8 text-amber-100">Your source for motorcycle gears, accessories, and riding essentials</p>
          <Link to="/products">
            <Button variant="secondary" size="lg">
              <Icon name="package" className="w-5 h-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
            <Icon name="tag" className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 shrink-0" />
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-amber-100 hover:border-amber-300"
              >
                <Icon name="package" className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                <p className="font-semibold text-gray-700 hover:text-red-600">{category}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
            <Icon name="shield" className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 shrink-0" />
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Ride?</h2>
            <p className="text-base sm:text-xl mb-8 text-amber-100">Browse our complete collection of motorcycle gears and accessories</p>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                <Icon name="cart" className="w-5 h-5" />
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
