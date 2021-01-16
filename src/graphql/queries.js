import { gql } from 'apollo-boost'

export const RESTAURANT_QUERY = gql`
  query restaurants (
    $style: String!
    $region: String!
  ) {
    restaurants(
      data: {
        style: $style
        region: $region
      }
    ) {
      name
		  style
      region
      score
    }
  }
`
