import React from "react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-secondary",
  trend,
}) => {
  // Verificação para evitar erro se Icon não for passado
  if (!Icon) {
    console.warn('StatsCard: a propriedade "icon" é obrigatória');
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-smooth">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% em relação ao mês
              passado
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 ${color} rounded-full flex items-center justify-center`}
        >
          <Icon className="text-current" size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
