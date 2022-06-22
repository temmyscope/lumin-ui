import { gql } from '@apollo/client';

const GetCurrencies = gql`
  query GetCurrencies {
    currency
  }
`;

const GetProducts = gql`
  query GetProducts ($currency: String!) {
    products (currency: $currency) {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;


export { GetCurrencies, GetProducts }