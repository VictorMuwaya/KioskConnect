
import React from 'react';
import { CURRENT_SHOP } from '../constants';

interface NavbarProps {
  onNavigate: (view: 'dashboard' | 'marketplace' | 'pools') => void;
  activeView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeView }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="bg-emerald-600 text-white p-2 rounded-lg">
            <i className="fas fa-layer-group"></i>
          </div>
          <span className="font-bold text-xl text-emerald-800 tracking-tight">KioskConnect</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`${activeView === 'dashboard' ? 'text-emerald-600' : 'text-slate-500'} hover:text-emerald-600 transition-colors`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('marketplace')}
            className={`${activeView === 'marketplace' ? 'text-emerald-600' : 'text-slate-500'} hover:text-emerald-600 transition-colors`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => onNavigate('pools')}
            className={`${activeView === 'pools' ? 'text-emerald-600' : 'text-slate-500'} hover:text-emerald-600 transition-colors`}
          >
            My Pools
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{CURRENT_SHOP.name}</p>
            <p className="text-xs text-slate-500">{CURRENT_SHOP.owner}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-emerald-200">
            {CURRENT_SHOP.owner[0]}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex border-t border-slate-100">
        <button onClick={() => onNavigate('dashboard')} className={`flex-1 p-3 text-center text-xs flex flex-col items-center gap-1 ${activeView === 'dashboard' ? 'text-emerald-600' : 'text-slate-500'}`}>
          <i className="fas fa-chart-line text-lg"></i>
          Home
        </button>
        <button onClick={() => onNavigate('marketplace')} className={`flex-1 p-3 text-center text-xs flex flex-col items-center gap-1 ${activeView === 'marketplace' ? 'text-emerald-600' : 'text-slate-500'}`}>
          <i className="fas fa-store text-lg"></i>
          Market
        </button>
        <button onClick={() => onNavigate('pools')} className={`flex-1 p-3 text-center text-xs flex flex-col items-center gap-1 ${activeView === 'pools' ? 'text-emerald-600' : 'text-slate-500'}`}>
          <i className="fas fa-users text-lg"></i>
          Pools
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
