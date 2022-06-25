import { useContext } from "react";
import { AppContext } from "../context";
import { Cart, InCartType, Product } from "../types";

const useCart = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  const OpenCart = () => setAppStates({ ...appStates, cartState: "opened" });

  const CloseCart = () => setAppStates({ ...appStates, cartState: "closed" });

  const ProductIsInCart: InCartType = (productId) => {
    let data = FetchProductFromCart(productId);
    if ( data.productId && data.productId > 0 ) {
      return true;
    }
    return false
  }

  const IncrementProductInCart = (productId: number) => {
    let cartItems = FetchDataFromStorage();
    for (let index = 0; index < cartItems.length; index++) {
      const element = cartItems[index];
      if (element.productId === productId) {
        cartItems[index] = { productId, qty: element.qty+1 }
        SaveDataFromStorage(cartItems);
        break;
      }
    }
  }

  const RemoveFromCart = (productId: number) => {
    let cartItems = FetchDataFromStorage()
    for (let index = 0; index < cartItems.length; index++) {
      const element = cartItems[index];
      if (element.productId === productId) {
        cartItems.splice(index, 1);
        SaveDataFromStorage(cartItems)
        break;
      }
    }
    //CloseCart();
  }

  const DecrementProductInCart = (productId: number) => {
    const cartItem = FetchProductFromCart(productId);
    if ( cartItem.qty < 2 ) {
      RemoveFromCart(productId);
    }else{
      let cartItems = FetchDataFromStorage();
      for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];
        if (element.productId === productId) {
          cartItems[index] = { productId, qty: element.qty-1 }
          SaveDataFromStorage(cartItems);
        }
      }
      //CloseCart();
    }
  }

  const FetchProduct = (productId: number) => {
    let len = appStates.products.length;
    for (let index = 0; index < len; index++) {
      const element = appStates.products[index];
      if (element.id === productId) {
        return element;
      }
    }
    //product no longer exists
    RemoveFromCart(productId);
    return {} as Product;
  }

  const TotalSumOfPrice = () => {
    let total = 0;
    let cartItems = FetchDataFromStorage();
    let len = cartItems.length;
    for (let index = 0; index < len; index++) {
      let eachItem = cartItems[index];
      let product = FetchProduct(eachItem.productId);
      if ( product.price && product.price > 0 ) {
        total += product.price * eachItem.qty;
      }
    }
    return total;
  }

  const FetchDataFromStorage = () => {
    let user_cart = localStorage.getItem('user_cart');
    let userCartArray = JSON.parse(user_cart ?? "[]");
    return userCartArray;
  }

  const FetchProductFromCart = (productId: number) => {
    let userCartArray = FetchDataFromStorage();
    let len = userCartArray.length;
    for (let index = 0; index < len; index++) {
      const element = userCartArray[index];
      if (element.productId === productId) {
        return element;
      }
    }
    return { } as Cart;
  }

  const ItemQty = (productId: number) => {
    return FetchProductFromCart(productId).qty;
  }

  const SaveDataFromStorage = (userCartArray: any) => {
    localStorage.setItem( 'user_cart', JSON.stringify(userCartArray) );
  }

  const AddToCart = (productId: number) => {
    if ( ProductIsInCart(productId) ) {
      IncrementProductInCart(productId);
    }else{
      let userCartArray = FetchDataFromStorage();
      userCartArray.push({ qty: 1, productId: productId });
      SaveDataFromStorage(userCartArray);
    }
    OpenCart();
  }

  return {
    AddToCart, RemoveFromCart, ItemQty,
    loading: appStates.loading, OpenCart,
    cartItems: FetchDataFromStorage(), CloseCart, FetchDataFromStorage,
    OpenedCart: appStates.cartState === 'opened', FetchProduct,
    IncrementProductInCart, DecrementProductInCart, TotalSumOfPrice
  };

}

export { useCart }