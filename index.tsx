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
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// --- COMPONENTES QUE ESTAVAM FALTANDO (AGORA INCLUSOS AQUI) ---
const MaintenanceCard = ({ item, lastKm, nextKm, currentKm, status }: any) => {
  const progress = Math.min(100, ((currentKm - lastKm) / (nextKm - lastKm)) * 100);
  return (
    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg mb-3">
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
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 uppercase tracking-tighter">
        <span>Última: {lastKm} km</span>
        <span>Próxima: {nextKm} km</span>
      </div>
    </div>
  );
};

// --- APLICATIVO PRINCIPAL ---
const App = () => {
  const [currentKm, setCurrentKm] = useState(12500);
  const [showKmModal, setShowKmModal] = useState(false);

  const motoData = {
    model: "Honda CB 500X",
    year: 2024,
    maintenance: [
      { id: 1, item: 'Óleo e Filtro', lastKm: 10000, nextKm: 15000, status: 'ok' },
      { id: 2, item: 'Kit Relação', lastKm: 0, nextKm: 20000, status: 'warning' },
      { id: 3, item: 'Pastilhas de Freio', lastKm: 8000, nextKm: 18000, status: 'ok' },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 py-2 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-500/20 rounded-xl">
            <Bike className="text-orange-500" size={22} />
          </div>
          <h1 className="text-xl font-black tracking-tight text-orange-500">MotoCheck</h1>
        </div>
        <button 
          onClick={() => setShowKmModal(true)}
          className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-[10px] font-bold uppercase hover:bg-slate-700 transition"
        >
          <RotateCw size={14} /> Atualizar KM
        </button>
      </header>

      {/* Card Principal de Info */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Bike size={80} />
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold mb-1">Sua Moto</p>
            <h2 className="text-2xl font-black">{motoData.model}</h2>
            <p className="text-sm text-slate-400">Edição {motoData.year}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end text-slate-400 mb-1">
              <Gauge size={14} />
              <span className="text-[10px] font-bold uppercase">Odômetro</span>
            </div>
            <p className="text-3xl font-mono font-black text-white">
                {currentKm.toLocaleString('pt-BR')} <span className="text-sm font-sans text-slate-500">km</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Manutenções */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold flex items-center gap-2 text-slate-400 uppercase tracking-widest px-1">
          <Wrench size={16} className="text-orange-500" /> Plano de Manutenção
        </h3>
        <div>
          {motoData.maintenance.map((m) => (
            <MaintenanceCard key={m.id} {...m} currentKm={currentKm} />
          ))}
        </div>
      </div>

      {/* Chat de IA */}
      <div className="mt-8 bg-orange-500/5 border border-orange-500/20 p-5 rounded-3xl relative">
        <div className="flex items-center gap-2 mb-3 text-orange-500">
          <MessageSquare size={20} fill="currentColor" className="opacity-20" />
          <span className="font-black text-xs uppercase tracking-wider">Dica da IA Motocheck</span>
        </div>
        <p className="text-sm text-slate-300 italic leading-relaxed">
          "Sua próxima revisão de óleo está chegando em {motoData.maintenance[0].nextKm - currentKm} km. Deseja ver os preços de filtros compatíveis?"
        </p>
      </div>

      {/* Botão Flutuante (FAB) */}
      <button className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-2xl shadow-xl shadow-orange-900/40 hover:scale-105 active:scale-95 transition-all">
        <Plus size={28} />
      </button>

      {/* Modal de KM */}
      {showKmModal && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="bg-slate-900 p-8 rounded-[2rem] w-full max-w-sm border border-slate-800 shadow-2xl">
            <h3 className="text-xl font-black mb-2 text-center text-white">Atualizar KM</h3>
            <p className="text-slate-500 text-xs text-center mb-6 px-4">Insira a quilometragem atual do painel da sua moto.</p>
            <input 
              type="number" 
              className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl mb-6 text-center text-3xl font-mono font-black text-orange-500 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder={currentKm.toString()}
              onChange={(e) => setCurrentKm(Number(e.target.value))}
            />
            <button 
              onClick={() => setShowKmModal(false)}
              className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-orange-500 transition-colors"
            >
              SALVAR AGORA
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
