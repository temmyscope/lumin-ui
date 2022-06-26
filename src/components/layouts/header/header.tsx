import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { Drawer, Badge } from 'antd';
import { ShoppingCartOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import { UserOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import { useCart } from "../../../hooks/useCart";
import { CartCard } from "../../commons/cart";
import { useCurrency } from "../../../hooks/useCurrency";
import { LightLogo, DarkLogo } from '../../commons/logos';
import { Cart } from "../../../types";
import { useUiUpdate } from "../../../hooks/useUiUpdate";

const Header: React.FC<{nav: boolean, setNav: (val: boolean) => any}> = ({ nav, setNav }) => {
  const { 
    cartItems, OpenedCart, OpenCart, CloseCart,  TotalSumOfPrice 
  } = useCart();
  const { currencies, localeCurrency, SetLocaleCurrency } = useCurrency();
  const [ mobileW, setMobileW ] = useState(window.innerWidth) 
  const updateWidth = () => {
    setMobileW(window.innerWidth);
  }
  const { forceUiUpdate } = useUiUpdate();
  /*
  const forceUpdate = React.useCallback(
    (random: number) => ForceUiUpdate(random), []
  );
  */

  useEffect(()=> {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener("resize", updateWidth);

  }, [forceUiUpdate]);

  return(
  <>
    <header className="w-full lg:bg-white bg-black lg:text-gray-700 text-white h-28 fixed top-0">
      
      <nav className="w-navWidth mx-auto h-full flex justify-between items-center">
        
        <div className='lg:hidden'>
          <MenuOutlined className='cursor-pointer text-3xl' onClick={() => setNav(true)} />
          <SearchOutlined className='text-3xl px-3' />
        </div>

        <ul className='lg:flex hidden font-normal'>
          <li className='px-1 text-xl'>
            <Link to="#">Shop</Link>
          </li>
          <li className='px-5 text-xl'>
            <Link to="#">Reviews</Link>
          </li>
          <li className='px-5 text-xl'>
            <Link to="#">How To</Link>
          </li>
          <li className='px-5 text-xl'>
            <Link to="#">Support</Link>
          </li>
        </ul>
        <div className='w-48 text-xl'>
          <Link to="#">
          {mobileW <= 1024 ? <DarkLogo /> : <LightLogo />}
          </Link>
        </div>
        <div className='flex h-full items-center'>
          <Link to="#" className='px-4 lg:block hidden order-1'>
          <SearchOutlined className='text-3xl' />
          </Link>
          <div className='px-4 order-4 lg:order-2 cursor-pointer' onClick={OpenCart}>
            <Badge count={cartItems.length}
              size={'small'} color={'#000'} offset={[5, 4]}
            ><ShoppingCartOutlined className='text-2xl' />
            </Badge>
          </div>

          <Link to="#" className='px-4 lg:block hidden order-3'>
            <UserOutlined className='text-2xl' />
          </Link>

          <div className='order-2 lg:order-4 cursor-pointer'>
            <label htmlFor="cur" className='px-4 cursor-pointer'>
            {localeCurrency}
            </label>
            <select 
              name="cur" className='select cursor-pointer' defaultValue={localeCurrency}
              id="cur" onChange={(e) => SetLocaleCurrency(e.target.value)}
            >
              {currencies.map((eachCurrency, index) => (
                <option value={eachCurrency} key={index}>
                  {eachCurrency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

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
              <RightOutlined className="close-cart-icon" onClick={CloseCart}  />
            </div>
          </button>

          
          <div className="currency-div">
            <select 
              aria-label="Choose a currency." className="currency-select"
              onChange={(e) => SetLocaleCurrency(e.target.value)} defaultValue={localeCurrency}
            >
              {currencies.map((eachCurrency, index) => (
                <option value={eachCurrency} key={index}>{eachCurrency}</option>
              ))}
            </select>

            <div className="currency-selector">
              <DownOutlined className="currency-select-icon" />
            </div>

          </div>

        </div>
        

        <div className="cart-group -z-10 overflow-y-scroll" style={{height:'400px' }}
        >
          {cartItems.map((cart: Cart, index: number) => (
            <CartCard productId={cart.productId} qty={cart.qty} key={index} />
          ))}
        </div>

        {(cartItems.length !== 0 && OpenedCart)? 
        <div className="cart-payment-section">
          <div className="cart-subtotal">
            <p className="cart-subtotal-text">Subtotal</p>

            <div className="cart-subtotal-price">
              <p className="cart-subtotal-price-text">
                {localeCurrency}&nbsp;
                {Intl.NumberFormat('en-US').format( TotalSumOfPrice() )}
              </p>
            </div>
          </div>
          
          <button type="button" className="payment-button">
            <p className="payment-button-text">
              Proceed to checkout
            </p>
          </button>
        </div>:
        <></>
        }
        

      </Drawer>
    </header>
  </>
  );


}

export { Header }