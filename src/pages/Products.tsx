import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const sortParam = searchParams.get('sort') || 'featured';
  const searchParam = searchParams.get('q') || '';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (categoryParam !== 'All') {
      result = result.filter(p => p.category === categoryParam);
    }

    // Filter by search
    if (searchParam) {
      const lowerQuery = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    switch (sortParam) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Mock newest by reversing
        result.reverse();
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [categoryParam, sortParam, searchParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            {categoryParam === 'All' ? 'All Products' : categoryParam}
          </h1>
          <p className="mt-2 text-neutral-500">
            Showing {filteredProducts.length} results
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={16} />
          </form>

          <button 
            className="md:hidden p-2 border border-neutral-300 rounded-full text-neutral-600"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-indigo-600" /> Categories
              </h3>
              <ul className="space-y-3">
                {CATEGORIES.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`text-sm transition-all ${
                        categoryParam === category 
                          ? 'font-semibold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full w-full text-left' 
                          : 'text-neutral-500 hover:text-indigo-600 px-4 py-2 w-full text-left'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">Sort By</h3>
              <select
                value={sortParam}
                onChange={handleSortChange}
                className="w-full border border-neutral-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-neutral-900 mb-2">No products found</h3>
              <p className="text-neutral-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setSearchQuery('');
                }}
                className="mt-6 inline-flex items-center justify-center px-6 py-2 border border-neutral-300 rounded-full text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
