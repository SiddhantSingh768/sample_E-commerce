import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { Toaster } from 'sonner';
import { products } from '../data/products';

export function Layout() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const liveResults = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      <Toaster position="top-center" />
      
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="p-2 -ml-2 mr-2 md:hidden text-neutral-600 hover:text-neutral-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                LUMINA
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/products" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors">Shop All</Link>
              <Link to="/products?category=Clothing" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors">Clothing</Link>
              <Link to="/products?category=Electronics" className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors">Electronics</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-neutral-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              <button 
                className="p-2 text-neutral-600 hover:text-indigo-600 transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b border-neutral-200 p-4 shadow-md z-50">
            <div className="max-w-3xl mx-auto relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 border border-neutral-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-rose-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </form>

              {searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
                  {liveResults.length > 0 ? (
                    <ul className="max-h-96 overflow-y-auto">
                      {liveResults.map(product => (
                        <li key={product.id} className="border-b border-neutral-100 last:border-0">
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-indigo-50 transition-colors"
                          >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md shadow-sm" />
                            <div>
                              <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                              <p className="text-sm font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                      <li className="p-2 bg-neutral-50 text-center border-t border-neutral-100">
                         <button onClick={handleSearch} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline py-2 w-full">
                           View all results for "{searchQuery}"
                         </button>
                      </li>
                    </ul>
                  ) : (
                    <div className="p-8 text-center text-sm text-neutral-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-indigo-50">Home</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-indigo-50">Shop All</Link>
            <Link to="/products?category=Clothing" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-indigo-50">Clothing</Link>
            <Link to="/products?category=Electronics" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-indigo-50">Electronics</Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-neutral-900 text-white py-16 border-t-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">LUMINA</span>
              <p className="mt-4 text-sm text-neutral-400 max-w-xs leading-relaxed">
                Curated essentials for modern living. Quality products designed to elevate your everyday experience.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/products" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">All Products</Link></li>
                <li><Link to="/products?category=Clothing" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">Clothing</Link></li>
                <li><Link to="/products?category=Electronics" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">Electronics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500">&copy; 2026 Lumina E-Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}
