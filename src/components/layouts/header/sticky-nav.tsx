import React from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { DownOutlined } from '@ant-design/icons';

const StickyNav: React.FC = () => {
  
  return(
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
        
        <div>
          <div className='flex w-60 justify-between h-full items-center border-gray-500 border rounded p-2 cursor-pointer'>
            <p>Sort by: </p>
            <DownOutlined className='' />
          </div>
        </div>
      </div>
    </div>
  </aside>
  );
}

export { StickyNav }