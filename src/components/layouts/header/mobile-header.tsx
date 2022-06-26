import React from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { RightOutlined, CloseOutlined } from '@ant-design/icons';

const MobileHeader: React.FC<{nav: boolean, setNav: (val: boolean) => any}> = ({ nav, setNav }) => {
  
  if ( nav ) {
    return(
      <nav className="modal fixed left-0 top-0 right-0 bottom-0 h-screen z-50" onClick={()=> setNav(true)}>
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
    );
  }
  return(<></>);
}

export { MobileHeader }