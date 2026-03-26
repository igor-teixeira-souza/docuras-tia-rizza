import React from "react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { CheckCircle } from "lucide-react";

const CheckoutSuccessModal = ({ isOpen, onClose, orderNumber }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pedido Confirmado!">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-black" />
        </div>
        <p className="text-lg mb-2">Seu pedido foi realizado com sucesso!</p>
        <p className="text-gray-600">
          Número do pedido: <span className="font-bold">#{orderNumber}</span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Em breve você receberá a confirmação por WhatsApp.
        </p>
        <div className="mt-6">
          <Button onClick={onClose}>Continuar comprando</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutSuccessModal;
