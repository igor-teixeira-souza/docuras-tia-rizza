import React from 'react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  delivering: 'bg-purple-100 text-purple-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Pendente',
  preparing: 'Preparando',
  ready: 'Pronto',
  delivering: 'Saiu para entrega',
  completed: 'Entregue',
  cancelled: 'Cancelado',
};

const OrderStatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100'}`}>
    {statusLabels[status] || status}
  </span>
);

export default OrderStatusBadge;