import { useContext, useEffect, useState } from 'react';
import { StickyNav, Header, MobileHeader } from '../components/layouts/header';
import { ProductSection } from '../components/layouts/product/product';
import { Banner } from '../components/layouts/banner';
import { AppContext } from '../context';
import { GraphqlFetch } from '../api';


const ProductPage = () => {
  const [appStates, setAppStates] = useContext(AppContext);
  const [nav, setNav] = useState(false)

  useEffect(() => {

    (async() => {
      const json = await GraphqlFetch(appStates.localeCurrency);
      setAppStates({ 
        ...appStates, loading: false,
        products: json["data"]["products"] ?? [], 
        currencies: json["data"]["currency"] ?? []
      });
    })();

  }, [ appStates.localeCurrency ]);

  return (
  <div className="App">
    <Header nav={nav} setNav={setNav} />
    <Banner />
    <MobileHeader nav={nav} setNav={() => setNav(false)} />
    <StickyNav />
    <ProductSection />
  </div>
  );
}

export default ProductPage;
