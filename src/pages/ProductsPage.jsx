import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import Button from '../components/Button';

function ProductFilters({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) {
  return (
    <>
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cursor-pointer"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All Products');
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All Products' ? 1 : 0) + (sortBy !== 'name' ? 1 : 0);

  const closeFilters = () => setIsFilterOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
          <Icon name="bike" className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 shrink-0" />
          <span>Motorcycle Accessories</span>
        </h1>

        <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-4 py-2.5 text-gray-800 font-semibold shadow-sm hover:border-amber-400 transition"
          >
            <Icon name="filter" className="w-5 h-5 text-amber-600" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-amber-400 text-gray-950 text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <p className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={closeFilters}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Icon name="filter" className="w-5 h-5 text-amber-600" />
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={closeFilters}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                  aria-label="Close filters"
                >
                  <Icon name="close" className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <Button variant="primary" size="lg" className="w-full" onClick={closeFilters}>
                  Show {filteredAndSortedProducts.length} Product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block bg-white rounded-lg shadow-md p-6 h-fit border border-amber-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="filter" className="w-5 h-5 text-amber-600" />
              Filters
            </h3>
            <ProductFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-amber-100">
                <Icon name="package" className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <p className="text-lg sm:text-xl text-gray-600">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
