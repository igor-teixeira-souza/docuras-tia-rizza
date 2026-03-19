import React from "react";
import OrderStatusBadge from "./../Orders/OrderStatusBadge";

const RecentOrdersTable = ({ orders = [] }) => {
  // ✅ valor padrão
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
        <p className="text-gray-500 text-center py-4">Nenhum pedido recente</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Cliente</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition-smooth"
              >
                <td className="py-3">{order.customer}</td>
                <td>
                  <OrderStatusBadge status={order.status} />
                </td>
                <td>R$ {order.total?.toFixed(2)}</td>
                <td>{new Date(order.date).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
