import '../../../App.css';
import { useCart } from "../../../hooks/useCart";
import { ProductCard as ProductCardComponent } from "../../../types";

const ProductCard: ProductCardComponent = (item) => {

  const { AddToCart, OpenCart } = useCart();

  return ( 
    <div className="w-full bg-white rounded-xl card py-9">
      <div className='w-cardWidth mx-auto'>
        <div className='my-5'>
          <img src={item.image_url} alt="" className='h-auto w-32 mx-auto' />
        </div>
        <div>
          <p className='text-center text-gray-500 py-3'>{ item.price }</p>
          <h1 className='text-center capitalize'>{ item.title } </h1>
        </div>
        <div>
          <button className='w-full p-3 bg-btnBg text-white' 
            onClick={() => AddToCart(item.id) && OpenCart()}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
   );
}

export { ProductCard }
