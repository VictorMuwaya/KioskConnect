
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pool } from '../types';
import PoolCard from '../components/PoolCard';

interface DashboardProps {
  pools: Pool[];
}

const data = [
  { name: 'Mon', saved: 40 },
  { name: 'Tue', saved: 65 },
  { name: 'Wed', saved: 45 },
  { name: 'Thu', saved: 90 },
  { name: 'Fri', saved: 120 },
  { name: 'Sat', saved: 85 },
  { name: 'Sun', saved: 150 },
];

const Dashboard: React.FC<DashboardProps> = ({ pools }) => {
  return (
    <div className="space-y-8 pb-20">
      {/* Hero Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Est. Savings', value: '$342.50', icon: 'fa-hand-holding-dollar', color: 'emerald' },
          { label: 'Active Pools', value: pools.length.toString(), icon: 'fa-users-viewfinder', color: 'blue' },
          { label: 'Completed', value: '12', icon: 'fa-circle-check', color: 'purple' },
          { label: 'Community', value: '84 Shops', icon: 'fa-store', color: 'amber' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-${stat.color}-100 text-${stat.color}-600`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Analytics */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-slate-800">Savings History</h2>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md font-bold">+12% vs last week</span>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="saved" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorSaved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Nearby Active Pools */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-slate-800">Active Pools Nearby</h2>
          <button className="text-sm font-bold text-emerald-600 hover:underline">See all pools</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.filter(p => p.status === 'active').map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
          {/* Quick Action Card */}
          <div className="bg-emerald-600 rounded-2xl p-6 text-white flex flex-col justify-between items-start shadow-lg hover:shadow-emerald-200 transition-shadow">
            <div>
              <h3 className="font-bold text-xl mb-2">Need something else?</h3>
              <p className="text-emerald-100 text-sm">Start a new pool and invite neighboring shop owners to reach wholesale thresholds together.</p>
            </div>
            <button className="mt-4 bg-white text-emerald-600 px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-emerald-50 transition-colors">
              Start Pool
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
