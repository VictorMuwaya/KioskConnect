
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface MarketplaceProps {
  onJoinPool: (productId: string, quantity: number) => void;
}

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
        <h1 className="text-2xl font-bold text-slate-800">Wholesale Marketplace</h1>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === cat ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-slate-200'
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
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  Wholesale Deal
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-slate-800 h-10 overflow-hidden">{product.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-emerald-700">${product.wholesalePrice.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 line-through pb-1">${product.retailPrice.toFixed(2)}</span>
                  <span className="text-xs font-bold text-green-600 pb-1">-{savings}%</span>
                </div>
                <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Min Qty: {product.minWholesaleQty} {product.unit}s</p>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors"
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-600 p-6 text-white relative">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
              <h3 className="text-xl font-bold mb-1">Join Wholesale Pool</h3>
              <p className="text-emerald-100 text-sm">{selectedProduct.name}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity ({selectedProduct.unit}s)</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-200"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center text-2xl font-bold bg-white border-2 border-slate-100 rounded-xl p-2 focus:border-emerald-500 focus:outline-none"
                  />
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Unit Wholesale Price:</span>
                  <span className="font-bold text-slate-800">${selectedProduct.wholesalePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-emerald-800">Your Contribution:</span>
                  <span className="font-black text-emerald-700">${(qty * selectedProduct.wholesalePrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-emerald-600 font-bold border-t border-emerald-100 pt-2">
                  <span>SAVING YOU:</span>
                  <span>${(qty * (selectedProduct.retailPrice - selectedProduct.wholesalePrice)).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleJoin}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-check-circle"></i> Confirm & Join
              </button>
              <p className="text-[10px] text-center text-slate-400">
                By joining, you agree to drop-off coordination at the cluster point.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
