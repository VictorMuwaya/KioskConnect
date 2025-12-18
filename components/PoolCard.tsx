
import React, { useState } from 'react';
import { Pool, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface PoolCardProps {
  pool: Pool;
  onClick?: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, onClick }) => {
  const [imgError, setImgError] = useState(false);
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
      <div className="relative h-32 bg-slate-100 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300">
            <i className="fas fa-box-open text-3xl"></i>
          </div>
        )}
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-emerald-700 shadow-sm border border-emerald-50">
          Save {(100 - (product.wholesalePrice / product.retailPrice * 100)).toFixed(0)}%
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-600 text-white rounded text-[8px] font-black uppercase tracking-tighter">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-slate-800 truncate">{product.name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <i className="fas fa-map-marker-alt text-emerald-500 text-[10px]"></i>
            <span className="truncate">{pool.dropPointName}</span>
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-emerald-600">{pool.currentQty} / {pool.targetQty} {product.unit}s</span>
            <span className="text-slate-400">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${progress >= 100 ? 'bg-green-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="text-[10px]">
            <p className="text-slate-400 font-medium">Time left</p>
            <p className={`font-bold ${hoursLeft < 12 ? 'text-red-500' : 'text-slate-700'}`}>
              {hoursLeft > 24 ? `${Math.floor(hoursLeft/24)}d ${hoursLeft%24}h` : `${hoursLeft}h left`}
            </p>
          </div>
          <button className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
