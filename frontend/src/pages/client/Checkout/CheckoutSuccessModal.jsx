import React from 'react';
import Modal from '../../../components/ui/Modal';

const CheckoutSuccessModal = ({ isOpen, onClose, orderNumber }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pedido Confirmado!">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg mb-2">Seu pedido foi realizado com sucesso!</p>
        <p className="text-gray-600">
          Número do pedido: <span className="font-bold">#{orderNumber}</span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Em breve você receberá a confirmação por WhatsApp.
        </p>
      </div>
    </Modal>
  );
};

export default CheckoutSuccessModal;