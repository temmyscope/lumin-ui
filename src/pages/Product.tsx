import { useContext, useEffect } from 'react';
import { Header } from '../components/layouts/header/header';
import { ProductSection } from '../components/layouts/product/product';
import { AppContext } from '../context';


const ProductPage = () => {
  const [appStates, setAppStates] = useContext(AppContext);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}`, {
      method: 'POST', headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `query ($currency: Currency) {
          products {
            id
            title
            image_url
            price(currency: $currency)
          }
          currency
        }`, 
        variables: { currency: appStates.localeCurrency ?? 'NGN' }
      })
    }).then(res => res.json())
    .then(json => {
      setAppStates({ 
        ...appStates, loading: false,
        products: json["data"]["products"] ?? [], 
        currencies: json["data"]["currency"] ?? []
      });
    }).catch(err => console.log(`Error: ${err}`));

  }, [ appStates.localeCurrency ]);

  return (
  <div className="App">
    <Header />
    <ProductSection />
  </div>
  );
}

export default ProductPage;
