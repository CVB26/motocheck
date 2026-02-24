import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Bike, 
  Gauge, 
  Plus, 
  RotateCw, 
  Wrench, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

// --- COMPONENTES INTERNOS ---
const MaintenanceCard = ({ item, lastKm, nextKm, currentKm, status }: any) => {
  const progress = Math.min(100, ((currentKm - lastKm) / (nextKm - lastKm)) * 100);
  return (
    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-white text-sm">{item}</span>
        {status === 'ok' ? 
          <CheckCircle2 className="text-green-400" size={18} /> : 
          <AlertTriangle className="text-orange-400" size={18} />
        }
      </div>
      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${progress > 80 ? 'bg-orange-500' : 'bg-green-500'}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400">
        <span>Última: {lastKm} km</span>
        <span>Próxima: {nextKm} km</span>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
const App = () => {
  const [currentKm, setCurrentKm] = useState(12500);
  const [showKmModal, setShowKmModal] = useState(false);

  const maintenances = [
    { id: 1, item: 'Óleo e Filtro', lastKm: 10000, nextKm: 15000, status: 'ok' },
    { id: 2, item: 'Pneus (Relação)', lastKm: 0, nextKm: 20000, status: 'warning' },
    { id: 3, item: 'Pastilhas de Freio', lastKm: 8000, nextKm: 18000, status: 'ok' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 py-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Bike className="text-orange-500" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tight text-orange-500">MotoCheck</h1>
        </div>
        <button 
          onClick={() => setShowKmModal(true)}
          className="bg-slate-800 p-2 rounded-lg border border-slate-700 hover:bg-slate-700 transition"
        >
          <RotateCw size={18} />
        </button>
      </header>

      {/* Card de Status Geral */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-3xl border border-slate-700 mb-8 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Sua Máquina</p>
            <h2 className="text-lg font-bold">Honda CB 500X</h2>
            <p className="text-xs text-slate-500">Ano 2024</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-orange-500 mb-1">
              <Gauge size={14} />
              <span className="text-[10px] font-bold uppercase">km atual</span>
            </div>
            <p className="text-3xl font-mono font-black">{currentKm.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Seção de Manutenções */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-400 uppercase tracking-wider">
          <Wrench size={16} /> Status de Manutenção
        </h3>
        <div className="grid gap-3">
          {maintenances.map((m) => (
            <MaintenanceCard key={m.id} {...m} currentKm={currentKm} />
          ))}
        </div>
      </div>

      {/* Chat de IA */}
      <div className="mt-8 bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-2xl">
        <div className="flex items-center gap-2 mb-2 text-orange-500">
          <MessageSquare size={18} />
          <span className="font-bold text-xs">Dica do Especialista</span>
        </div>
        <p className="text-xs text-slate-300 italic leading-relaxed">
          "Baseado na sua quilometragem, seus pneus estão a 62% de uso. Mantenha a calibragem em 36psi para maior durabilidade."
        </p>
      </div>

      {/* FAB - Botão de Adicionar */}
      <button className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-2xl shadow-orange-500/20 shadow-2xl hover:scale-105 transition active:scale-95">
        <Plus size={24} />
      </button>

      {/* Modal Simples de KM */}
      {showKmModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-slate-800 p-6 rounded-3xl w-full max-w-xs border border-slate-700">
            <h3 className="font-bold mb-4">Atualizar Odômetro</h3>
            <input 
              type="number" 
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4 text-center text-xl font-bold focus:outline-none focus:border-orange-500"
              placeholder={currentKm.toString()}
              onChange={(e) => setCurrentKm(Number(e.target.value))}
            />
            <button 
              onClick={() => setShowKmModal(false)}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              Salvar KM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
