import React from 'react';
import { Link } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 via-indigo-900/60 to-black/40 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg"
          >
            Elevate Your Everyday
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-50 mb-10 max-w-2xl mx-auto font-light drop-shadow-md"
          >
            Discover our curated collection of premium essentials designed for modern living.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-indigo-900 bg-white rounded-full hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl shadow-indigo-900/20"
            >
              Shop the Collection
              <ArrowRight className="ml-2 text-indigo-600" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.filter(c => c !== 'All').slice(0, 3).map((category, index) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-100"
              >
                <img 
                  src={
                    category === 'Clothing' ? 'https://images.unsplash.com/photo-1489987707023-af823c576fce?auto=format&fit=crop&q=80&w=800' :
                    category === 'Electronics' ? 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' :
                    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
                  }
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-indigo-900/90 group-hover:via-indigo-900/40 transition-all duration-500" />
                <div className="absolute inset-0 flex items-end justify-start p-8">
                  <h3 className="text-3xl font-bold text-white tracking-wide flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                    {category} <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Featured Arrivals</h2>
              <p className="mt-2 text-neutral-500">Handpicked selections for the season.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
