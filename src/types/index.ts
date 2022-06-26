
export interface AppState {
  currencies: Array<string>
  loading: boolean
  localeCurrency: string
  products: Array<Product>
  cartState: 'opened'|'closed'
  forceUiUpdate: number
  sortBy: 'lowest' | 'highest' | 'default'
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
  image_url: string
  price: number
}
export type CartCardComponentType = (Props: Cart) => JSX.Element;

export interface HeaderProp {
  currencies: Array<string> | []
}
export type InCartType = (productId: number) => boolean

export type ProductCard = (Props: Product) => JSX.Element;

export type ProductSection = () => JSX.Element;

export type SortingFn = (Products: Array<Product>) => Array<Product>