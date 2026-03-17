import React from 'react';
import Button from '../../../components/ui/Button';

const CheckoutForm = ({ formData, errors, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Dados para Entrega</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Seu nome"
          />
          {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Endereço (opcional)</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Rua, número, bairro"
          />
        </div>
      </div>
      <div className="mt-8">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Processando...' : 'Confirmar Pedido'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;