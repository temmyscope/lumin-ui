import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './index.css';
import { Drawer } from 'antd';
import { ShoppingCartOutlined, RightOutlined } from '@ant-design/icons';
import { UserOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import { useCart } from "../../../hooks/useCart";
import { CartCard } from "../../commons/cart";
import { useCurrency } from "../../../hooks/useCurrency";
import { LightLogo, DarkLogo } from '../../commons/logos';

const Header = ({ title }: {title: string}) => {
  const { cartItems, OpenedCart, OpenCart, CloseCart, TotalSumOfPrice } = useCart();
  const { currencies, localeCurrency } = useCurrency();

  const [ mobileW, setMobileW ] = useState(window.innerWidth) 
  const updateWidth = () => {
    setMobileW(window.innerWidth);
  }

  useEffect(()=> {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  });

  return(
  <>
    <header className="w-full lg:bg-white bg-black lg:text-gray-700 text-white h-20 fixed top-0">
      <nav className="w-navWidth mx-auto h-full flex justify-between items-center">
        <div className='lg:hidden'>
          <MenuOutlined className='cursor-pointer text-2xl' />
          <SearchOutlined className='text-2xl px-3' />
        </div>
        <ul className='lg:flex hidden'>
          <li className='px-1'>
            <Link to="#">Shop</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Reviews</Link>
          </li>
          <li className='px-5'>
            <Link to="#">How To</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Support</Link>
          </li>
        </ul>
        <div className='w-48'>
          <Link to="#">
            { 
              mobileW <= 1024 ? <DarkLogo /> : <LightLogo />
            }
            
          </Link>
        </div>
        <div className='flex h-full items-center'>
          <Link to="#" className='px-4 lg:block hidden order-1'>
          <SearchOutlined className='text-2xl' />
          </Link>
          <Link to="#" className='px-4 order-4 lg:order-2'>
            <ShoppingCartOutlined className='text-2xl' onClick={OpenCart} />
          </Link>
          <Link to="#" className='px-4 lg:block hidden order-3'>
            <UserOutlined className='text-2xl' />
          </Link>
          <div className='order-2 lg:order-4'>
            <label htmlFor="cur" className='px-4'>NGN</label>
            <select name="cur" id="cur" className='select'>
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
        </div>
        {(Object.keys(cartItems).length === 0)? 
        <></> :
        <div className="cart-payment-section">
          <div className="cart-subtotal">
            <p className="cart-subtotal-text">Subtotal</p>

            <div className="cart-subtotal-price">
              <p className="cart-subtotal-price-text">
                {localeCurrency}{Intl.NumberFormat('en-US').format(TotalSumOfPrice())}
              </p>
            </div>
          </div>
          
          <button type="button" className="payment-button">
            <p className="payment-button-text">
              Proceed to checkout
            </p>
          </button>
        </div>
        }
        

      </Drawer>
    </header>

    {/* main banner section */}
    <main className="w-full mt-20">
      <div className='w-navWidth mx-auto'>

        <div className='w-full h-24 flex items-center'>
          <h3>Home</h3>
        </div>

        <div className='banner__section w-full'>
          <div className='overlay'>
          <div className='z-50 flex flex-col items-center justify-center h-80'>
              <h1 className='text-white text-3xl'>New to Skincare?</h1>
              <p className='text-white py-2'>Unlock your personality skincare routine today.</p>
              <button className='bg-white text-gray-700 py-4 px-8 w-52 mt-12'>
                START SHOPPING
              </button>
          </div>
          </div>
        </div>
      </div>
    </main>

    <aside className='w-full sticky top-20 bg-bodybg'>
      <div className='w-navWidth mx-auto flex justify-between h-24 items-center'>
        <ul className='flex'>
          <li>
            <Link to="#">All</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Best Sellers</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Face</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Hair & Body</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Bundles</Link>
          </li>
          <li className='px-5'>
            <Link to="#">Accessories</Link>
          </li>
        </ul>

        <div className='flex gap-4'>
          <div className='flex w-32 justify-between h-full items-center border-gray-500 border rounded p-2 cursor-pointer'>
            <div className='flex h-full items-center'>
              <FilterOutlined className='' />
              <p className='px-2'>Filters</p>
            </div>
            <DownOutlined />
          </div>
          <div>
            <div className='flex w-60 justify-between h-full items-center border-gray-500 border rounded p-2 cursor-pointer'>
              <p>Sort by: </p>
              <DownOutlined className='' />
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
  );


}

export { Header }