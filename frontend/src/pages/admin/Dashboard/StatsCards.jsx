import React from 'react';
import { Package, DollarSign, Clock, TrendingUp } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cards = [
    { label: 'Total de Pedidos', value: stats.totalOrders, icon: Package, bg: 'bg-secondary' },
    { label: 'Faturamento Total', value: `R$ ${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, bg: 'bg-secondary' },
    { label: 'Pedidos Pendentes', value: stats.pendingOrders, icon: Clock, bg: 'bg-secondary' },
    { label: 'Ticket Médio', value: `R$ ${(stats.totalRevenue / stats.totalOrders || 0).toFixed(2)}`, icon: TrendingUp, bg: 'bg-secondary' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
            <div className={`w-12 h-12 ${card.bg} rounded-full flex items-center justify-center`}>
              <card.icon className="text-black" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;