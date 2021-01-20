import { gql } from 'apollo-boost'

export const RESTAURANT_QUERY = gql`
  query restaurants (
    $region: String!
  ) {
    restaurants(
      data: {
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
