import { useContext } from "react";
import { useQuery } from '@apollo/client';
import { AppContext } from "../context";
import { GetCurrencies } from '../api/gql/query';

const useCurrency = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  
  const FetchAndSaveCurrencies = async() => {
    const { loading, error, data } = useQuery(GetCurrencies);

    console.log(error)

    if ( data && !loading ) {
      console.log(data)
      setAppStates({ ...appStates, loading: false, currencies: data });
    }
  }

  const SetLocaleCurrency = (currency: string) => {
    setAppStates({ ...appStates, localeCurrency: currency });
  }

  return { 
    currencies: appStates.currencies, 
    localeCurrency: appStates.localeCurrency,
    FetchAndSaveCurrencies, SetLocaleCurrency 
  };
}

export { useCurrency }