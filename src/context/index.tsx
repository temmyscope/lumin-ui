import React, { useState } from 'react';
import { AppState } from '../types';


const AppContext = React.createContext<[
    AppState, React.Dispatch<React.SetStateAction<AppState>>
]>([ 
  {} as AppState, () => {} 
]);

const AppContextProvider = ({ children }: { children: any }) => {

  const [appStates, setAppStates] = useState<AppState>({ 
    cartItems: {}, localeCurrency: 'NGN', loading: true, 
    products: [], currencies: ["NGN"], cartState: 'closed'
  });

  return (
    <AppContext.Provider value={[ appStates, setAppStates ]} >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };