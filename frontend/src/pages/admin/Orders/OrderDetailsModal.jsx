import React from 'react';
import Modal from '../../../components/ui/Modal';
import OrderStatusBadge from './OrderStatusBadge';

const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  return (
    <Modal isOpen={true} onClose={onClose} title={`Pedido #${order.id}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Cliente</p>
            <p className="font-medium">{order.customer || order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Telefone</p>
            <p className="font-medium">{order.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Endereço</p>
            <p className="font-medium">{order.address || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-bold text-lg">R$ {order.total?.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Itens do pedido</p>
          <div className="border rounded-lg divide-y">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between p-3">
                <div>
                  <p className="font-medium">{item.product?.name || `Produto #${item.productId}`}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity}x R$ {item.price?.toFixed(2)}
                  </p>
                </div>
                <p className="font-medium">R$ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <select
            value={order.status}
            onChange={(e) => {
              onStatusChange(order.id, e.target.value);
              onClose();
            }}
            className="border rounded px-3 py-2 mr-2"
          >
            <option value="pending">Pendente</option>
            <option value="preparing">Preparando</option>
            <option value="ready">Pronto</option>
            <option value="delivering">Saiu para entrega</option>
            <option value="completed">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;