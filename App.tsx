
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import Marketplace from './views/Marketplace';
import AIAssistant from './components/AIAssistant';
import { MOCK_POOLS, CURRENT_SHOP, MOCK_PRODUCTS } from './constants';
import { Pool, Product } from './types';
import PoolCard from './components/PoolCard';

type View = 'dashboard' | 'marketplace' | 'pools';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [pools, setPools] = useState<Pool[]>(MOCK_POOLS);

  const myPools = useMemo(() => {
    return pools.filter(p => p.participants.some(part => part.shopId === CURRENT_SHOP.id));
  }, [pools]);

  const joinPool = (productId: string, quantity: number) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setPools(prevPools => {
      const existingPoolIdx = prevPools.findIndex(p => p.productId === productId && p.status === 'active');

      if (existingPoolIdx > -1) {
        const updatedPools = [...prevPools];
        const pool = { ...updatedPools[existingPoolIdx] };
        
        // Check if user is already in this pool to update their share instead of adding a new participant entry
        const userPartIdx = pool.participants.findIndex(part => part.shopId === CURRENT_SHOP.id);
        
        if (userPartIdx > -1) {
          const participant = { ...pool.participants[userPartIdx] };
          participant.quantity += quantity;
          participant.contribution += (quantity * product.wholesalePrice);
          pool.participants = [...pool.participants];
          pool.participants[userPartIdx] = participant;
        } else {
          pool.participants = [...pool.participants, {
            shopId: CURRENT_SHOP.id,
            shopName: CURRENT_SHOP.name,
            quantity,
            contribution: quantity * product.wholesalePrice
          }];
        }
        
        pool.currentQty += quantity;
        
        // If target reached, we could update status but for now let's keep it active
        if (pool.currentQty >= pool.targetQty) {
          // pool.status = 'completed'; // Optional logic
        }

        updatedPools[existingPoolIdx] = pool;
        return updatedPools;
      } else {
        const newPool: Pool = {
          id: `pool-${Date.now()}`,
          productId,
          status: 'active',
          currentQty: quantity,
          targetQty: product.minWholesaleQty,
          deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
          dropPointId: CURRENT_SHOP.id,
          dropPointName: `${CURRENT_SHOP.name} (Me)`,
          participants: [{
            shopId: CURRENT_SHOP.id,
            shopName: CURRENT_SHOP.name,
            quantity,
            contribution: quantity * product.wholesalePrice
          }]
        };
        return [...prevPools, newPool];
      }
    });

    // Automatically navigate to 'My Pools' to show success
    setCurrentView('pools');
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard pools={pools} />;
      case 'marketplace':
        return <Marketplace onJoinPool={joinPool} />;
      case 'pools':
        return (
          <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold text-slate-800">My Active Pools</h1>
            {myPools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPools.map(pool => (
                  <PoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-3xl">
                  <i className="fas fa-boxes-packing"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800">No pools joined yet</h2>
                <p className="text-slate-500 max-w-xs">You aren't participating in any active pools right now. Head to the Marketplace to save!</p>
                <button 
                  onClick={() => setCurrentView('marketplace')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>
        );
      default:
        return <Dashboard pools={pools} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentView} activeView={currentView} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-800">
          <div className="bg-emerald-200 p-2 rounded-full animate-pulse">
            <i className="fas fa-bullhorn"></i>
          </div>
          <p className="text-sm font-medium">
            <span className="font-bold">Neighborhood Alert:</span> {pools.length} active wholesale pools are currently forming nearby!
          </p>
        </div>

        {renderView()}
      </main>

      <AIAssistant />

      <footer className="p-4 text-center border-t border-slate-100 bg-white">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Connected to local mesh network (PWA Mode Active)
        </div>
      </footer>
    </div>
  );
};

export default App;
