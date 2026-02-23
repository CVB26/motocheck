import { useState } from 'react';
import { Bike, Gauge, Plus, RotateCw } from 'lucide-react';
import { useMotoData } from '@/hooks/useMotoData';
import type { HistoryEntry } from '@/lib/motoData';
import MaintenanceCard from '@/components/MaintenanceCard';
import HistoryList from '@/components/HistoryList';
import AiChat from '@/components/AiChat';
import UpdateKmModal from '@/components/UpdateKmModal';
import RegisterMaintenanceModal from '@/components/RegisterMaintenanceModal';
import WhatsAppSummary from '@/components/WhatsAppSummary';

const Index = () => {
  const [data, setData] = useMotoData();
  const [showKmModal, setShowKmModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const handleUpdateKm = (km: number) => {
    setData((prev) => ({
      ...prev,
      currentKm: km,
      maintenance: prev.maintenance.map((m) => ({ ...m, currentKm: km })),
    }));
  };

  const handleRegisterMaintenance = (entry: HistoryEntry) => {
    setData((prev) => ({
      ...prev,
      history: [entry, ...prev.history],
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/15 rounded-xl">
              <Bike size={22} className="text-primary" />
            </div>
            <h1 className="text-xl font-extrabold text-gradient-orange">MotoCheck</h1>
          </div>
          <button
            onClick={() => setShowKmModal(true)}
            className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-muted transition-colors"
          >
            <RotateCw size={14} />
            Atualizar KM
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 space-y-6">
        {/* Moto Info */}
        <div className="glass-card p-5 flex items-center justify-between orange-glow rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Bike size={28} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Sua moto</p>
              <h2 className="text-lg font-extrabold text-foreground leading-tight">{data.model}</h2>
              <p className="text-xs text-muted-foreground">{data.year}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <Gauge size={16} className="text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">km</span>
            </div>
            <p className="text-2xl font-mono font-extrabold text-foreground leading-tight">
              {data.currentKm.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Maintenance Cards */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Bike size={20} className="text-primary" />
            Manutenções
          </h2>
          {data.maintenance.map((item) => (
            <MaintenanceCard key={item.id} {...item} />
          ))}
        </div>

        {/* AI Chat */}
        <AiChat />

        {/* WhatsApp Summary */}
        <WhatsAppSummary data={data} />

        {/* History */}
        <HistoryList entries={data.history} />
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowMaintenanceModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg animate-pulse-orange hover:scale-105 transition-transform"
        aria-label="Registrar manutenção"
      >
        <Plus size={24} />
      </button>

      {/* Modals */}
      {showKmModal && (
        <UpdateKmModal
          currentKm={data.currentKm}
          onUpdate={handleUpdateKm}
          onClose={() => setShowKmModal(false)}
        />
      )}
      {showMaintenanceModal && (
        <RegisterMaintenanceModal
          currentKm={data.currentKm}
          onRegister={handleRegisterMaintenance}
          onClose={() => setShowMaintenanceModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
