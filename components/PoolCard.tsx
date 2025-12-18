
import React from 'react';
import { Pool, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface PoolCardProps {
  pool: Pool;
  onClick?: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, onClick }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === pool.productId);
  const progress = (pool.currentQty / pool.targetQty) * 100;
  
  if (!product) return null;

  const timeLeft = Math.max(0, new Date(pool.deadline).getTime() - Date.now());
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
    >
      <div className="relative h-32">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-[10px] font-bold text-emerald-700 shadow-sm">
          Save {(100 - (product.wholesalePrice / product.retailPrice * 100)).toFixed(0)}%
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-slate-800 truncate">{product.name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <i className="fas fa-map-marker-alt text-emerald-500"></i>
            {pool.dropPointName}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-emerald-600">{pool.currentQty} / {pool.targetQty} {product.unit}s</span>
            <span className="text-slate-400">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${progress >= 100 ? 'bg-green-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="text-xs">
            <p className="text-slate-400">Time left</p>
            <p className={`font-bold ${hoursLeft < 12 ? 'text-red-500' : 'text-slate-700'}`}>
              {hoursLeft > 24 ? `${Math.floor(hoursLeft/24)}d ${hoursLeft%24}h` : `${hoursLeft}h left`}
            </p>
          </div>
          <button className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
