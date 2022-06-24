import React, { useContext, useEffect, useState } from "react";
import { ProductSection as ProductSectionType } from "../../types";
import { useCart } from '../../hooks/useCart';
import { ProductCard } from "../commons/product";
import { useProducts } from "../../hooks/useProducts";

const ProductSection: ProductSectionType = () => {
  const { products, loading, FetchAndSaveProducts } = useProducts();

  useEffect(() => {

    (async() => {
      await FetchAndSaveProducts();
    })();

  }, []);

  if (loading == true) {
    return (
      <div>loading</div>
    );
  }


  return (
    <div className="product-page">
      
      {products.map((product, index: number) => (
        <ProductCard 
          key={index}
          id={product.id} image={product.image}
          price={product.price} title={product.title} 
        />
      ))}
    </div>
  )

}

export { ProductSection }