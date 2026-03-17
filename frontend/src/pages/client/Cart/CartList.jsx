import React from 'react';
import CartItem from '../../../components/features/CartItem';

const CartList = ({ items, onUpdateQuantity, onRemove }) => {
  return (
    <div className='space-y-4'>
      {items.map((item) => (
        <CartItem
          key={item.product.id || item.product._id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
