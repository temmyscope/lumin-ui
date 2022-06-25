import { useContext } from "react";
import { AppContext } from "../context";

const useCurrency = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  const SetLocaleCurrency = (currency: string) => {
    setAppStates({ ...appStates, localeCurrency: currency });
  }

  return { 
    currencies: appStates.currencies, 
    localeCurrency: appStates.localeCurrency, SetLocaleCurrency 
  };
}

export { useCurrency }