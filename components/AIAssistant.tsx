
import React, { useState, useEffect } from 'react';
import { getSmartPoolingAdvice, getMarketTrends } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const result = await getMarketTrends();
      setTrends(result);
    };
    fetchTrends();
  }, []);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    const result = await getSmartPoolingAdvice(query);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50 border-4 border-white"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[90vw] glass border border-emerald-100 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[70vh]">
          <div className="bg-emerald-600 p-4 text-white">
            <h3 className="font-bold flex items-center gap-2">
              <i className="fas fa-sparkles"></i> KioskConnect Assistant
            </h3>
            <p className="text-xs opacity-90">AI-powered wholesale insights</p>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {trends.length > 0 && !advice && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Today's Market Trends</p>
                {trends.map((t, idx) => (
                  <div key={idx} className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    <p className="text-sm font-semibold text-emerald-800">{t.item}</p>
                    <p className="text-xs text-emerald-600">{t.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {advice && (
              <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {advice.savingsPercent}% Pot. Savings
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-medium">"{advice.recommendation}"</p>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Pro Tip</p>
                  <p className="text-xs text-slate-600 italic">{advice.demandTip}</p>
                </div>
                <button 
                  onClick={() => setAdvice(null)}
                  className="text-xs text-emerald-600 font-bold"
                >
                  <i className="fas fa-arrow-left mr-1"></i> Back to trends
                </button>
              </div>
            )}

            {!loading && !advice && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500">Ask me about any product or stock strategy...</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Sugar prices next week?"
                    className="flex-1 text-sm bg-slate-100 border-none rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  />
                  <button 
                    onClick={handleAsk}
                    className="bg-emerald-600 text-white p-2 rounded-lg"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center py-8">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-slate-500 mt-2">Thinking...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
