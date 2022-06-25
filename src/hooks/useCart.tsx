import { useContext } from "react";
import { AppContext } from "../context";
import { InCartType } from "../types";

const useCart = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  const OpenCart = () => setAppStates({ ...appStates, cartState: 'opened' });

  const CloseCart = () => setAppStates({ ...appStates, cartState: 'closed' });

  const ProductIsInCart: InCartType = (productId) => {
    let key = appStates.cartItems[productId] ?? undefined;
    if ( key !== undefined ) {
      return true;
    }
    return false
  }

  const IncrementProductInCart = (productId: number) => {
    const cartItems = appStates.cartItems;
    cartItems[productId] = cartItems[productId] + 1;
    setAppStates({ ...appStates, cartItems: cartItems });
  }

  const RemoveFromCart = (productId: number) => {
    const cartItems = appStates.cartItems;
    delete cartItems[`${productId}`];

    setAppStates({ ...appStates, cartItems: { ...cartItems } });
    return true
  }

  const DecrementProductInCart = (productId: number) => {
    const cartItems = appStates.cartItems;
    if ( cartItems[`${productId}`] < 2 ) {
      RemoveFromCart(productId);
    }else{
      cartItems[productId] = cartItems[productId] - 1;
      setAppStates({ ...appStates, cartItems: cartItems });
    }
  }


  const FetchProductPrice = (productId: number) => {
    let len = appStates.products.length;
    for (let index = 0; index < len; index++) {
      const element = appStates.products[index];
      if (element.id === productId) {
        return element.price;
      }
    }
    //product no longer exists
    RemoveFromCart(productId);
    return 0;
  }

  const TotalSumOfPrice = () => {
    let total = 0;
    for (let key in appStates.cartItems) {
      let qty = appStates.cartItems[key];
      total += FetchProductPrice(Number(key).valueOf()) * qty;
    }
    return total;
  }

  const ItemQty = (productId: number) => {
    const cartItems = appStates.cartItems;
    return cartItems[productId];
  }

  const AddToCart = (productId: number) => {

    if ( ProductIsInCart(productId) ) {
      IncrementProductInCart(productId);
    }else{
      setAppStates({ 
        ...appStates, cartItems: { ...appStates.cartItems, [productId]: 1 }
      });
    }
    return true
  }

  return {
    AddToCart, RemoveFromCart, ItemQty,
    loading: appStates.loading, OpenCart,
    cartItems: appStates.cartItems, CloseCart,
    OpenedCart: appStates.cartState === 'opened',
    IncrementProductInCart, DecrementProductInCart, TotalSumOfPrice
  };

}

export { useCart }