import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../../api/api";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import { toast } from "react-hot-toast";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await ordersAPI.getAll();
      const ordersData = response.data?.orders || response.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      toast.error("Erro ao carregar pedidos");
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId) {
      toast.error("ID do pedido inválido");
      return;
    }
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      toast.success("Status atualizado com sucesso!");
      fetchOrders();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error(error.response?.data?.error || "Erro ao atualizar status");
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const getStatusCount = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      preparing: "bg-blue-100 text-blue-800 border-blue-200",
      ready: "bg-green-100 text-green-800 border-green-200",
      delivering: "bg-purple-100 text-purple-800 border-purple-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pendente",
      preparing: "Preparando",
      ready: "Pronto",
      delivering: "Saiu para entrega",
      completed: "Entregue",
      cancelled: "Cancelado",
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Gerenciar Pedidos
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total de {orders.length} pedido(s)
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          <span>Atualizar</span>
        </Button>
      </div>

      {/* Filtros por status */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "primary" : "secondary"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          Todos ({orders.length})
        </Button>
        {[
          { status: "pending", label: "Pendente" },
          { status: "preparing", label: "Preparando" },
          { status: "ready", label: "Pronto" },
          { status: "delivering", label: "Saiu para entrega" },
          { status: "completed", label: "Entregue" },
          { status: "cancelled", label: "Cancelado" },
        ].map(({ status, label }) => (
          <Button
            key={status}
            variant={statusFilter === status ? "primary" : "secondary"}
            onClick={() => setStatusFilter(status)}
            size="sm"
          >
            {label} ({getStatusCount(status)})
          </Button>
        ))}
      </div>

      {/* Conteúdo - Desktop: Tabela, Mobile: Cards */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-200">
          <p className="text-gray-500">
            Nenhum pedido encontrado com o filtro selecionado.
          </p>
        </div>
      ) : (
        <>
          {/* Versão Desktop - Tabela */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] lg:min-w-full">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr className="border-b border-gray-700">
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Telefone
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-mono font-medium text-gray-900">
                            #{order._id.slice(-6)}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm font-medium text-gray-900 break-words max-w-[200px]">
                            {order.customer || order.customerName}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {order.phone || "-"}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-black">
                            R$ {order.total?.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className={`border rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-black focus:border-black bg-white ${getStatusColor(order.status)}`}
                          >
                            <option value="pending">Pendente</option>
                            <option value="preparing">Preparando</option>
                            <option value="ready">Pronto</option>
                            <option value="delivering">
                              Saiu para entrega
                            </option>
                            <option value="completed">Entregue</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetails(true);
                            }}
                          >
                            Ver Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Versão Mobile - Cards */}
          <div className="block md:hidden space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Pedido</div>
                      <div className="text-sm font-mono font-bold text-gray-900">
                        #{order._id.slice(-6)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Total</div>
                      <div className="text-base font-bold text-black">
                        R$ {order.total?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Cliente</span>
                    <span className="text-sm font-medium text-gray-900 text-right">
                      {order.customer || order.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Telefone</span>
                    <span className="text-sm text-gray-600">
                      {order.phone || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Status</span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`text-xs rounded-lg px-2 py-1 border focus:ring-2 focus:ring-black ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pendente</option>
                      <option value="preparing">Preparando</option>
                      <option value="ready">Pronto</option>
                      <option value="delivering">Saiu para entrega</option>
                      <option value="completed">Entregue</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Data</span>
                    <span className="text-xs text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal de detalhes */}
      {showDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowDetails(false);
            setSelectedOrder(null);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Orders;
