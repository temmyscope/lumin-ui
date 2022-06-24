import React from "react"

export interface AppState {
  currencies: Array<string>
  loading: boolean
  localeCurrency: string
  products: Array<Product>
  cartItems: { [key: number]: number },
  cartState: 'opened'|'closed'
}

export interface CartItem {
  [key: number]: number 
}

export interface Cart {
  qty: number
  productId: number
}

export interface Product {
  id: number
  title: string
  image: string
  price: number
}
export type CartCardComponentType = (Props: Cart) => JSX.Element;

export interface HeaderProp {
  currencies: Array<string> | []
}
export type InCartType = (productId: number) => boolean

export type ProductCard = (Props: Product) => JSX.Element;

export type ProductSection = () => JSX.Element;