const GraphqlFetch: any = (currency: string) => {

  return fetch(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}`, {
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
      }`, variables: { currency: currency }
    })
  }).then(res => res.json())
  .then(json => json)
  .catch(err => console.log(`Error: ${err}`));
}

export { GraphqlFetch }