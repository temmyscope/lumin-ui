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

const Header = ({ title }: {title: string}) => {
  const { 
    cartItems, OpenedCart, OpenCart, CloseCart,  TotalSumOfPrice 
  } = useCart();
  const [nav, setNav] = useState(false)
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
          <MenuOutlined className='cursor-pointer text-3xl' />
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

    {/* main banner section */}
    <main className="w-full mt-20">
      <div className='w-navWidth mx-auto'>
        <div className='w-full h-24 flex items-center'>
          <h3>Home</h3>
        </div>

        {/* main banner section */}
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
    { nav &&  (
    <nav className="modal fixed left-0 top-0 right-0 bottom-0 h-screen z-50" onClick={()=> setNav(false)}>
      <aside className="modal__content h-full bg-white z-50" onClick={e => e.stopPropagation()}>
       <div className="w-full border-b border-gray-200">
          <div className="w-navWidth mx-auto flex h-20 items-center">
              <div className="block w-40">
                <CloseOutlined className="text-xl" onClick={()=> setNav(false)} />
              </div>
              <div className="lg:w-48 w-40">
                <img src="https://www.luminskin.com/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimg%2Flogo.20c2cb1d9d2bb6d2139d0e5cec3103bd.png&w=384&q=75" alt="" className="" />
              </div>
          </div>
       </div>

       {/* links */}
       <div className="w-navWidth mx-auto">
        <ul className="text-gray-500">
          <li className="py-5 w-full flex justify-between border-b border-gray-200">
            <Link to='/'>SHOP</Link>
            <div className="">
              <RightOutlined />
            </div>
          </li>
          <li className="w-full py-5 border-b border-gray-200">
            <Link to='/'>REVIEWS</Link>
          </li>
          <li className="py-5 w-full flex justify-between border-b border-gray-200">
            <Link to='/'>ABOUT</Link>
            <div className="">
              <RightOutlined />
            </div>
          </li>
          <li className="py-5 w-full flex justify-between border-b border-gray-200">
            <Link to='/'>SUPPORT</Link>
            <div className="">
              <RightOutlined />
            </div>
          </li>
          <li className="w-full py-5 border-b border-gray-200">
            <Link to='/'>BLOG</Link>
          </li>
          <li className="w-full py-5 border-b border-gray-200">
            <Link to='/'>MY ACCOUNT</Link>
          </li>
        </ul>
       </div>
      </aside>
    </nav>
    )}

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