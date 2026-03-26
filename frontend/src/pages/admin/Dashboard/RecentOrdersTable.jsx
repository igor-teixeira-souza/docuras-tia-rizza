import React from "react";
import OrderStatusBadge from "./../Orders/OrderStatusBadge";

const RecentOrdersTable = ({ orders = [] }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pedidos Recentes
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum pedido recente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Pedidos Recentes
        </h2>
      </div>

      {/* Container com scroll horizontal para telas pequenas */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px] md:min-w-full">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b border-gray-200">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-sm font-medium text-gray-900 break-words max-w-[150px] sm:max-w-none">
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      R$ {order.total?.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
