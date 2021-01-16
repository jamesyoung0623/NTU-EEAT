import { gql } from 'apollo-boost'

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant(
    $name: String!
    $style: String!
    $region: String!
    $score: String!
  ) {
    createRestaurant(
      data: {
        name: $name
        style: $style
        region: $region
        score: $score
      }
    ) {
      name
		  style
      region
      score
    }
  }
`
