import './index.css';
import { ProductSection as ProductSectionType } from "../../../types";
import { ProductCard } from "../../commons/product";
import { useProducts } from "../../../hooks/useProducts";

const ProductSection: ProductSectionType = () => {
  const { products, loading } = useProducts();
  
  
  if (loading === true) {
    return (
      <div>loading</div>
    );
  }

  return (
    <div className="product-page">
      
      <section className="w-navWidth mx-auto mt-5 py-10 bg-bestBg">
        <div className="w-1/2 text-center py-3 mx-auto h-40">
          <h2>Best Sellers</h2>
          <p>
            Our iconic skincare products are changing the game for mens skin. Cleanse, hydrate, and feel renewed with our best-selling must-haves.
          </p>
          <a href="/">Shop all Best Sellers products (6)</a>
        </div>

        <div className="md:grid xl:grid-cols-3 md:grid-cols-2 md:gap-x-10 xl:w-bestWidth lg:w-9/12 mx-auto md:gap-y-20 overflow-x-scroll w-full justify-start flex-nowrap flex px-10 lg:px-0">
          {products.map((product, index: number) => (
            <div className='flex min-w-full' key={index}>
              <ProductCard
                id={product.id} image_url={product.image_url}
                  price={product.price} title={product.title} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )

}

export { ProductSection }