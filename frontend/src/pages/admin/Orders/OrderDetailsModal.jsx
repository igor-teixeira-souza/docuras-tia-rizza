import React from "react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import OrderStatusBadge from "./OrderStatusBadge";
import { Calendar, MapPin, Phone, User, Package } from "lucide-react";

const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Pedido #${order._id?.slice(-6)}`}
    >
      <div className="space-y-6">
        {/* Informações do cliente */}
        <div className="bg-gradient-to-r from-pink-50 to-white rounded-lg p-4">
          <h3 className="text-lg font-semibold text-pink-600 mb-3 flex items-center gap-2">
            <User size={18} /> Dados do Cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium text-gray-900">
                {order.customer || order.customerName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium text-gray-900 flex items-center gap-1">
                <Phone size={14} /> {order.phone || "-"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium text-gray-900 flex items-center gap-1">
                <MapPin size={14} /> {order.address || "Não informado"}
              </p>
            </div>
          </div>
        </div>

        {/* Itens do pedido */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3 flex items-center gap-2">
            <Package size={18} /> Itens do Pedido
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Produto
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">
                    Qtd
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Preço
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.products?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.productId?.name || `Produto #${item.productId}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-right">
                      R$ {item.price?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      R$ {(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t">
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-3 text-right font-semibold text-gray-900"
                  >
                    Total:
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-pink-600 text-lg">
                    R$ {order.total?.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
              <Calendar size={14} /> Data do pedido
            </p>
            <p className="font-medium text-gray-900">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Status atual</p>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
          <select
            value={order.status}
            onChange={(e) => {
              onStatusChange(order._id, e.target.value);
              onClose();
            }}
            className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500"
          >
            <option value="pending">Pendente</option>
            <option value="preparing">Preparando</option>
            <option value="ready">Pronto</option>
            <option value="delivering">Saiu para entrega</option>
            <option value="completed">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
