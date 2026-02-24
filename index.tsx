import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bike, Gauge, Plus, RotateCw, Wrench, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [currentKm, setCurrentKm] = useState(12500);
  const [showModal, setShowModal] = useState(false);

  const maintenances = [
    { id: 1, item: 'Óleo (10W30)', last: 10000, next: 15000, status: 'ok' },
    { id: 2, item: 'Kit Relação', last: 0, next: 20000, status: 'warning' },
    { id: 3, item: 'Pastilhas de Freio', last: 8000, next: 18000, status: 'ok' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 pb-24">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
            <Bike className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            MOTOCHECK
          </h1>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-slate-800 p-2 rounded-xl border border-slate-700">
          <RotateCw size={20} className="text-slate-400" />
        </button>
      </header>

      <div className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 mb-8 orange-glow">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold mb-1">Painel Atual</p>
            <h2 className="text-xl font-bold">Honda CB 500X</h2>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-slate-500 text-[10px] font-bold uppercase">
              <Gauge size={12} /> km total
            </div>
            <p className="text-3xl font-black font-mono">{currentKm.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Wrench size={14} className="text-orange-500" /> Manutenções
        </h3>
        {maintenances.map(m => {
          const prog = Math.min(100, ((currentKm - m.last) / (m.next - m.last)) * 100);
          return (
            <div key={m.id} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between mb-3">
                <span className="font-bold text-sm">{m.item}</span>
                {m.status === 'ok' ? <CheckCircle2 size={16} className="text-green-500" /> : <AlertTriangle size={16} className="text-orange-500" />}
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${prog > 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${prog}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase">
                <span>{m.last} km</span>
                <span>{m.next} km</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-orange-500/5 border border-orange-500/20 p-5 rounded-3xl">
        <div className="flex items-center gap-2 mb-2 text-orange-500 font-black text-[10px] uppercase tracking-wider">
          <MessageSquare size={16} /> Inteligência Motocheck
        </div>
        <p className="text-sm text-slate-400 italic">"Sua relação está com 62% de uso. Evite arrancadas bruscas para prolongar a vida útil."</p>
      </div>

      <button className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-2xl shadow-2xl shadow-orange-600/20 active:scale-95 transition-all">
        <Plus size={28} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="bg-slate-900 p-8 rounded-[2rem] w-full max-w-sm border border-slate-800 text-center">
            <h3 className="text-xl font-bold mb-6">Novo KM</h3>
            <input 
              type="number" 
              className="w-full bg-black border border-slate-800 p-4 rounded-2xl mb-6 text-center text-3xl font-mono text-orange-500 focus:outline-none"
              placeholder={currentKm.toString()}
              onChange={(e) => setCurrentKm(Number(e.target.value))}
            />
            <button onClick={() => setShowModal(false)} className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl">SALVAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
