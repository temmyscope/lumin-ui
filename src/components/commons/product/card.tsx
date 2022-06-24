import React, { useContext, useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import { ProductCard as ProductCardComponent } from "../../../types";

const ProductCard: ProductCardComponent = (product) => {

  const { AddToCart, OpenCart } = useCart();

  return (
  <div className="product">
    
  </div>
  );
}

export { ProductCard }