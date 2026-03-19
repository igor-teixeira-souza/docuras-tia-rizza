import React, { useState, useEffect } from "react";
import { ordersAPI } from "../../../api/api";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import OrderStatusBadge from "./OrderStatusBadge";
import { toast } from "react-hot-toast";
import { Eye } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error("Erro ao carregar pedidos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    // Verifica se o ID é válido
    if (!orderId) {
      toast.error("ID do pedido inválido");
      return;
    }
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      toast.success("Status atualizado");
      fetchOrders(); // recarrega a lista
    } catch (error) {
      toast.error("Erro ao atualizar status");
      console.error(error);
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Pedidos</h1>

      {/* Filtros */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === "all" ? "primary" : "secondary"}
          onClick={() => setStatusFilter("all")}
          size="sm"
        >
          Todos
        </Button>
        {[
          "pending",
          "preparing",
          "ready",
          "delivering",
          "completed",
          "cancelled",
        ].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "primary" : "secondary"}
            onClick={() => setStatusFilter(status)}
            size="sm"
          >
            <OrderStatusBadge status={status} />
          </Button>
        ))}
      </div>

      {/* Tabela de pedidos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{order._id.slice(-6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customer || order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  R$ {order.total?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pendente</option>
                    <option value="preparing">Preparando</option>
                    <option value="ready">Pronto</option>
                    <option value="delivering">Saiu para entrega</option>
                    <option value="completed">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                  >
                    <Eye size={16} className="mr-1" /> Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalhes */}
      {showDetails && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowDetails(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Orders;
