import './style.css';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCart } from "../../../hooks/useCart";
import { CartCardComponentType } from "../../../types";
import { useCurrency } from '../../../hooks/useCurrency';
import React from 'react';
import { useUiUpdate } from '../../../hooks/useUiUpdate';

const CartCard: CartCardComponentType = (cart) => {

  const { 
    RemoveFromCart, ItemQty, FetchProduct,
    DecrementProductInCart, IncrementProductInCart, 
  } = useCart();
  const { ForceUiUpdate } = useUiUpdate();
  //const [_, updateState] = React.useState(0);
  const forceUpdate = React.useCallback(
    (random: number) => ForceUiUpdate(random), []
  );
  const { localeCurrency } = useCurrency();

  const { title, image_url, price } = FetchProduct( cart.productId );

  return (
  <div dir="ltr" className="cart-item">

    <button type="button" className="remove-cart-item">
      <CloseOutlined onClick={() =>{ 
        RemoveFromCart(cart.productId)
        forceUpdate(Math.random()*2000);
      }} />
    </button>
    
    <div className="cart-item-content">
      
      <div className="cart-content-text">

        <p className="cart-product-name">
          {title}
        </p>
        
        <div className="cart-item-base">
          
          <div className="cart-item-qty-section">
            <MinusOutlined 
              className="cart-qty-action-icon" onClick={() =>{ 
                DecrementProductInCart(cart.productId)
                forceUpdate(Math.random()*2102);
              }} 
            />
            <p className="cart-item-qty">{ItemQty(cart.productId)}</p>
            <PlusOutlined 
              className="cart-qty-action-icon" onClick={() =>{ 
                IncrementProductInCart(cart.productId)
                forceUpdate(Math.random()*(-3009));
              }}
            />
          </div>

          <div className="cart-item-price">
            {localeCurrency}&nbsp;{Intl.NumberFormat('en-US').format(price)}
          </div>
          
        </div>
      </div>

      <div className="cart-content-img">
        <img src={image_url} alt="Anti-Fatigue Essentials Bundle" className=" w-16 h-7" />
      </div>

    </div>

  </div>
  );
}

export { CartCard }