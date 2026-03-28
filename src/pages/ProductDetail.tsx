import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product not found</h2>
        <Link to="/products" className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4">
          Return to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Images */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
            {[product.image, ...product.thumbnails].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-neutral-100 transition-all ${
                  activeImage === img ? 'ring-2 ring-indigo-600 ring-offset-2' : 'ring-1 ring-transparent hover:ring-indigo-300'
                }`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 lg:mt-0">
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">{product.name}</h1>
          
          <div className="mt-4">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-neutral-600 space-y-6 leading-relaxed">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between border border-neutral-300 rounded-full px-4 py-3 sm:w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="text-neutral-900 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                <Truck size={24} />
              </div>
              <h4 className="text-sm font-semibold text-neutral-900">Free Shipping</h4>
              <p className="text-xs text-neutral-500 mt-1">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                <RefreshCcw size={24} />
              </div>
              <h4 className="text-sm font-semibold text-neutral-900">Easy Returns</h4>
              <p className="text-xs text-neutral-500 mt-1">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-sm font-semibold text-neutral-900">Secure Checkout</h4>
              <p className="text-xs text-neutral-500 mt-1">100% protected payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
