
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface MarketplaceProps {
  onJoinPool: (productId: string, quantity: number) => void;
}

const ProductImage: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`bg-slate-100 flex items-center justify-center text-slate-300 ${className}`}>
        <i className="fas fa-boxes-stacked text-4xl"></i>
      </div>
    );
  }
  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`${className} object-cover`}
    />
  );
};

const Marketplace: React.FC<MarketplaceProps> = ({ onJoinPool }) => {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const categories = ['All', 'Grains', 'Oils', 'Household'];

  const handleJoin = () => {
    if (selectedProduct && qty > 0) {
      onJoinPool(selectedProduct.id, qty);
      setSelectedProduct(null);
      setQty(1);
    }
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Wholesale Marketplace</h1>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === cat ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.filter(p => filter === 'All' || p.category === filter).map(product => {
          const savings = ((product.retailPrice - product.wholesalePrice) / product.retailPrice * 100).toFixed(0);
          return (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group">
              <div className="relative h-48 overflow-hidden bg-slate-50">
                <ProductImage 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">
                  Wholesale
                </div>
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-700 shadow-sm border border-emerald-100">
                  Save {savings}%
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col space-y-3">
                <h3 className="font-bold text-slate-800 leading-tight min-h-[2.5rem] group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-black text-slate-900">${product.wholesalePrice.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 line-through pb-1">${product.retailPrice.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Min: {product.minWholesaleQty} {product.unit}s</p>
                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setQty(1);
                    }}
                    className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95"
                  >
                    Join Pool
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quantity Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="relative h-64 bg-slate-100">
              <ProductImage 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name} 
                className="w-full h-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500 text-white px-2 py-0.5 rounded-sm mb-3 inline-block">Direct Sourcing</span>
                <h3 className="text-3xl font-black leading-tight">{selectedProduct.name}</h3>
                <p className="text-emerald-300 text-sm font-semibold mt-1">Starting a pool at cluster wholesale prices</p>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Select Quantity ({selectedProduct.unit}s)</label>
                   <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">Target: {selectedProduct.minWholesaleQty}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <input 
                    type="number" 
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center text-3xl font-black bg-white border-2 border-slate-100 rounded-2xl p-2 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <i className="fas fa-plus text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4 border border-slate-100">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500 font-bold">Wholesale Price</span>
                  <span className="font-black text-slate-800">${selectedProduct.wholesalePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl items-center pt-3 border-t border-slate-200">
                  <span className="font-black text-slate-900">Contribution</span>
                  <span className="font-black text-emerald-700">${(qty * selectedProduct.wholesalePrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-700 font-black bg-emerald-50/50 -mx-6 -mb-6 p-4 rounded-b-[2rem] border-t border-emerald-100">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-piggy-bank text-emerald-500"></i>
                    SMART SAVING:
                  </span>
                  <span>+ ${(qty * (selectedProduct.retailPrice - selectedProduct.wholesalePrice)).toFixed(2)} over retail</span>
                </div>
              </div>

              <button 
                onClick={handleJoin}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Commit to Pool</span>
                <i className="fas fa-arrow-right text-sm group-hover:translate-x-2 transition-transform"></i>
              </button>
              
              <div className="flex items-center gap-3 justify-center py-2 opacity-60">
                <i className="fas fa-shield-check text-emerald-500"></i>
                <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-widest">
                  Verified Local Fulfillment
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
