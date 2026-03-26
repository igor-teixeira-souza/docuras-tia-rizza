import React from "react";
import Button from "../../../components/ui/Button";

const CheckoutForm = ({
  formData,
  phoneValue,
  errors,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Dados para entrega</h2>
        <p className="text-sm text-gray-500 mt-1">
          Preencha seus dados para finalizar o pedido
        </p>
      </div>

      <div className="space-y-4">
        {/* Nome completo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all ${
              errors.customerName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Seu nome completo"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={phoneValue}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Endereço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            placeholder="Rua, número, bairro"
          />
        </div>

        {/* Complemento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complemento{" "}
            <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="text"
            name="complement"
            value={formData.complement}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            placeholder="Apartamento, bloco, ponto de referência"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processando..." : "Finalizar Pedido"}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
