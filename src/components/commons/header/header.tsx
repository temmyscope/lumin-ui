import React, { useContext, useEffect, useState } from "react";
import './style.css';
import { Drawer } from 'antd';
import { ShoppingCartOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
import { useCart } from "../../../hooks/useCart";
import { ProductCard } from "../product";
import { CartCard } from "../cart";
import { useCurrency } from "../../../hooks/useCurrency";

const Header = ({ title }: {title: string}) => {
  const { cartItems, OpenedCart, OpenCart, CloseCart, TotalSumOfPrice } = useCart();
  const { currencies } = useCurrency();
  console.log(cartItems)

  return(
  <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
  
    <li className="md:ml-4">
      <a className="border-t block no-underline hover:underline py-2 text-grey-darkest text-black md:border-none md:p-0" href="#">
        <ShoppingCartOutlined onClick={OpenCart} />
      </a>
    </li>

    <Drawer
      headerStyle={{backgroundColor: '#e1e1e1', border: 'none'}}
      className="drawer" visible={OpenedCart} zIndex={9999}
      onClose={CloseCart} title={<div className="drawer-header">
        <h2 className="drawer-header-text">My Shopping Cart</h2>
      </div>} closable={false} drawerStyle={{backgroundColor: '#e1e1e1'}}
    >
      <div className="cart-row2">
        
        <button type="button" className="close-cart">
          <div className="close-cart-div">
            <RightOutlined className="close-cart-icon" />
          </div>
        </button>
        
        <div className="currency-div">
          <select aria-label="Choose a currency." className="currency-select">
            <option value="AED">AED</option>
          </select>

          <div className="currency-selector">
            <DownOutlined className="currency-select-icon" />
          </div>

        </div>

      </div>

      <div className="cart-group overscroll-none">
        {Object.keys(cartItems).map((productId, index: number) => (
          <CartCard
            productId={(productId as unknown) as number} 
            qty={cartItems[(productId as unknown) as number]} key={index}
          />
        ))}
        {[0,1,2].map((value, index) => (
          <CartCard 
            qty={value} productId={value} key={index} 
          />
        ))}
      </div>

      <div className="cart-payment-section">
        <div className="cart-subtotal">
          <p className="cart-subtotal-text">Subtotal</p>

          <div className="cart-subtotal-price">
            <p className="cart-subtotal-price-text">
              NGN&nbsp;52,900.00 
              {/**Intl.NumberFormat('en-US').format(TotalSumOfPrice()) */}
            </p>
          </div>
        </div>
        
        <button type="button" className="payment-button">
          <p className="payment-button-text">
            Proceed to checkout
          </p>
        </button>
      </div>

    </Drawer>

  </header>
  );


}

export { Header }