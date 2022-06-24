import { useContext } from "react";
import { useQuery } from '@apollo/client';
import { AppContext } from "../context";
import { GetProducts } from '../api/gql/query';

const useProducts = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  
  const FetchAndSaveProducts = async() => {
    const { loading, error, data } = useQuery(
      GetProducts, { variables: { currency: "NGN" } }
    );
    console.log(error)
    if ( loading ) {
      setAppStates({ ...appStates, loading: true });
    }
    if ( data && !loading ) {
      console.log(data)
      setAppStates({ ...appStates, loading: false, products: data });
    }
  }

  return {  
    FetchAndSaveProducts,
    loading: appStates.loading,
    products: appStates.products
  };
}

export { useProducts }