import React from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { useUiUpdate } from "../../../hooks/useUiUpdate";

const StickyNav: React.FC = () => {
  const { SetSortBy } = useUiUpdate();
  
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
          <Link to="#">Hair &amp; Body</Link>
        </li>
        <li className='px-5'>
          <Link to="#">Bundles</Link>
        </li>
        <li className='px-5'>
          <Link to="#">Accessories</Link>
        </li>
      </ul>

      <div className='flex gap-4'>

        <div className='flex w-full justify-between h-full items-center border-gray-500 border rounded p-2 cursor-pointer sort-by-wrapper'>
          <label className='px-4 cursor-pointer'>
            Sort by:
          </label>
          {/*
          <select className='select cursor-pointer' defaultValue={1}>
            <option className="option-sort-by">
            </option>
          </select>
          */}
          <div className="select-order" tabIndex={1}>
            <input 
              className="selectopt" name="test" type="radio" 
              id="opt1" defaultChecked onChange={() => SetSortBy('default')}
            />
            <label htmlFor="opt1" className="option">Default</label>

            <input 
              className="selectopt" name="test" type="radio" 
              id="opt1" onChange={() => SetSortBy('lowest')}
            />
            <label htmlFor="opt1" className="option">Lowest Price</label>

            <input 
              className="selectopt" name="test" type="radio" 
              id="opt2"  onChange={() => SetSortBy('highest')}
            />
            <label htmlFor="opt2" className="option">Highest Price</label>
          </div>
        </div>

        {/** 
        <div>
          <div className='flex w-60 justify-between h-full items-center border-gray-500 border rounded p-2 cursor-pointer'>
            <p>Sort by: </p>
            <DownOutlined className='' />
          </div>
        </div>
        **/}
      </div>
    </div>
  </aside>
  );
}

export { StickyNav }