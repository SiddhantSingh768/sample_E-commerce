import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: Product; key?: React.Key }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-indigo-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-indigo-600 hover:text-white"
        >
          <ShoppingBag size={16} />
          Quick Add
        </button>
      </div>
      
      <div className="flex flex-col gap-1.5 mt-4">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category}</p>
        <h3 className="text-base font-medium text-neutral-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <p className="text-sm font-bold text-neutral-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
