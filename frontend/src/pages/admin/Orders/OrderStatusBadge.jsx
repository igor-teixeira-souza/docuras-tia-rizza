import React from "react";

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800",
    icon: "⏳",
  },
  preparing: {
    label: "Preparando",
    color: "bg-blue-100 text-blue-800",
    icon: "👨‍🍳",
  },
  ready: { label: "Pronto", color: "bg-green-100 text-green-800", icon: "✅" },
  delivering: {
    label: "Saiu para entrega",
    color: "bg-purple-100 text-purple-800",
    icon: "🚚",
  },
  completed: {
    label: "Entregue",
    color: "bg-gray-100 text-gray-800",
    icon: "🏠",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800",
    icon: "❌",
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
    icon: "📦",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default OrderStatusBadge;
