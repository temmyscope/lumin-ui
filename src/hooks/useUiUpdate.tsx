import { useContext } from "react";
import { AppContext } from "../context";
import { Product, SortingFn } from "../types";

const useUiUpdate = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  const ForceUiUpdate = (value: number) => {
    setAppStates({ ...appStates, forceUiUpdate: value });
  }

  const SortProductBy: SortingFn = (ProductsData) => {
    if ( appStates.sortBy === 'default' ) {
      return appStates.products;
    }else{
      if ( appStates.sortBy === 'lowest' ) {
        return SortByLowestFirst(appStates.products);
      }else{
        return SortByHighestFirst(appStates.products);
      }
    }
  }

  const SortByLowestFirst: SortingFn = (ProductsData) => {
    if(ProductsData.length < 2){
      return ProductsData;
    }
    let pivot = ProductsData[0];
    let leftList = [];
    let rightList = [];
    for(let i = 1; i < ProductsData.length; i++ ){
      if( ProductsData[i].price < pivot.price ){
        rightList.push(ProductsData[i]);
      }else{
        leftList.push(ProductsData[i]);
      }
    }
    return [ ...SortByLowestFirst(leftList), pivot, ...SortByLowestFirst(rightList) ];
  }

  const SortByHighestFirst: SortingFn = (ProductsData) => {
    if(ProductsData.length < 2){
      return ProductsData;
    }
    let pivot = ProductsData[0];
    let leftList = [];
    let rightList = [];
    for(let i = 1; i < ProductsData.length; i++ ){
      if( ProductsData[i].price > pivot.price ){
        leftList.push(ProductsData[i]);
      }else{
        rightList.push(ProductsData[i]);
      }
    }
    return [ ...SortByHighestFirst(leftList), pivot, ...SortByHighestFirst(rightList) ];
  }

  const SetSortBy = (sortArg: 'lowest'|'default'|'highest') => {
    setAppStates({ ...appStates, sortBy: sortArg });
  }

  return { 
    forceUiUpdate: appStates.forceUiUpdate, 
    ForceUiUpdate, SetSortBy, SortProductBy
  };
}

export { useUiUpdate }