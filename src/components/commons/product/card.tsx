import '../../../App.css';
import { useCart } from "../../../hooks/useCart";
import { useCurrency } from '../../../hooks/useCurrency';
import { ProductCard as ProductCardComponent } from "../../../types";

const ProductCard: ProductCardComponent = (item) => {
  const { localeCurrency } = useCurrency();
  const { AddToCart } = useCart();

  return ( 
    <div className="md:w-full w-bestWidth bg-white rounded-xl card py-9">
      <div className='w-cardWidth mx-auto'>
        
        <div className='my-5'>
          <img src={item.image_url} alt="" className='h-40 w-40 mx-auto object-contain' />
        </div>

        <div>
          <p className='text-center text-gray-500 py-3'>
            {localeCurrency}&nbsp;
            {Intl.NumberFormat('en-US').format(item.price)}
          </p>
          <h1 className='text-center capitalize'>{ item.title } </h1>
        </div>

        <div>
          <button className='w-full p-3 bg-btnBg text-white' 
            onClick={() => { AddToCart(item.id); }}>
            Add To Cart
          </button>
        </div>
        
      </div>
    </div>
   );
}

export { ProductCard }
