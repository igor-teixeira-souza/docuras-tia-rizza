import React, { useState, useEffect } from "react";
import { ShoppingBag, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { ordersAPI } from "../../../api/api";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import StatsCards from "./StatsCards";
import TopProducts from "./TopProducts";
import RecentOrdersTable from "./RecentOrdersTable";
import ProductsOverview from "./ProductsOverview";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await ordersAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      // Dados mockados para demonstração
      setStats({
        totalOrders: 156,
        totalRevenue: 4580.5,
        pendingOrders: 23,
        topProducts: [
          { name: "Bolo de Chocolate", quantity: 45 },
          { name: "Brigadeiro", quantity: 38 },
          { name: "Cupcake", quantity: 32 },
        ],
        recentOrders: [
          {
            id: 1,
            customer: "Ana Silva",
            status: "pending",
            total: 45.9,
            date: "2024-03-10",
          },
          {
            id: 2,
            customer: "João Santos",
            status: "preparing",
            total: 78.5,
            date: "2024-03-10",
          },
          {
            id: 3,
            customer: "Maria Oliveira",
            status: "ready",
            total: 32.0,
            date: "2024-03-09",
          },
          {
            id: 4,
            customer: "Pedro Costa",
            status: "delivering",
            total: 120.0,
            date: "2024-03-09",
          },
          {
            id: 5,
            customer: "Carla Souza",
            status: "completed",
            total: 65.8,
            date: "2024-03-08",
          },
        ],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          <span>Atualizar</span>
        </Button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <TopProducts products={stats?.topProducts || []} />
        </div>
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={stats.recentOrders} />
        </div>
      </div>

      {/* Seção de produtos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Visão Geral de Produtos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductsOverview />
          {/* Espaço para outros cards (ex: estoque baixo) */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
