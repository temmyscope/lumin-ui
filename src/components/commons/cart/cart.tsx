import React, { useContext, useEffect, useState } from "react";
import './style.css';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCart } from "../../../hooks/useCart";
import { CartCardComponentType } from "../../../types";

const CartCard: CartCardComponentType = (cart) => {

  const { 
    RemoveFromCart, ItemQty,
    DecrementProductInCart, IncrementProductInCart 
  } = useCart();

  return (
  <div dir="ltr" className="cart-item">

    <button type="button" className="remove-cart-item">
      <CloseOutlined onClick={() => RemoveFromCart(0)} />
    </button>
    
    <div className="cart-item-content">
      
      <div className="cart-content-text">

        <p className="cart-product-name">Anti-Fatigue Essentials Bundle</p>
        
        <div className="cart-item-base">
          
          <div className="cart-item-qty-section">
            <MinusOutlined className="cart-qty-action-icon" onClick={() => DecrementProductInCart(0)} />
            <p className="cart-item-qty">1{/*ItemQty('')*/}</p>
            <PlusOutlined className="cart-qty-action-icon" onClick={() => IncrementProductInCart(0)}/>
          </div>

          <div className="cart-item-price">NGN&nbsp;27,900.00</div>
          
        </div>
      </div>

      <div className="cart-content-img">
        <img src="https://cdn.shopify.com/s/files/1/2960/5204/products/FT_AntiFatigue1_1024x1024.png?v=1618588492" alt="Anti-Fatigue Essentials Bundle" className="css-1gq47mq" />
      </div>

    </div>

  </div>
  );
}

export { CartCard }