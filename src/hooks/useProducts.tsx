import { useContext } from "react";
import { AppContext } from "../context";

const useProducts = () => {

  const [ appStates ] = useContext(AppContext);

  return {
    loading: appStates.loading,
    products: appStates.products
  };
}

export { useProducts }