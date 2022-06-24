import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/commons/header';
import { AppContext, AppContextProvider } from './context';

const App = () => {
  const [appStates, setAppStates] = useContext(AppContext);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      this.localStorage.setItem(
        "user_cart", JSON.stringify(appStates.cartItems)
      );
    });

    window.addEventListener("load", function (e) {
      const userCart = localStorage.getItem("user_cart");
      if ( typeof userCart === 'object' ) {
        setAppStates({ ...appStates, cartItems: JSON.parse(userCart ?? "") });
      }
      setAppStates({ ...appStates, cartItems: {} });
    });

    return () => {
      window.removeEventListener('beforeunload', () => {})
    }

  })

  return (
  <AppContextProvider>
    <div className="App">
      <Header title="product-page" />


    </div>
  </AppContextProvider>
  );
}

export default App;
