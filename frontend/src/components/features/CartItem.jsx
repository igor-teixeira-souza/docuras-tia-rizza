import React from 'react';
import Button from '../ui/Button';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const productId = item.product.id || item.product._id;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-smooth">
      <img src={item.product.image || '/api/placeholder/80/80'} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h4 className="font-semibold">{item.product.name}</h4>
        <p className="text-sm text-gray-600">R$ {item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onUpdateQuantity(productId, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-smooth">
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(productId, item.quantity + 1)} className="p-1 rounded-full hover:bg-gray-100 transition-smooth">
          <Plus size={16} />
        </button>
      </div>
      <div className="text-right min-w-[100px]">
        <p className="font-semibold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
        <Button variant="danger" size="sm" onClick={() => onRemove(productId)} className="mt-1">
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;