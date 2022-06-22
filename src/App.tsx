import React, { useState } from 'react';
import { GetCurrencies } from './api/gql/query';
import { useQuery } from '@apollo/client';
import './App.css';

const App = () => {
  //GetCurrencies
  const { loading, error, data } = useQuery(GetCurrencies);

  const { loading: ProductsLoading, error: PErr, data: ProductsData } = useQuery(
    GetCurrencies, { variables: { currency: "NGN" } }
  );

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

    </div>
  );
}

export default App;
