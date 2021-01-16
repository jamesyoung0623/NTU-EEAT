import { gql } from 'apollo-boost'

export const RESTAURANTS_SUBSCRIPTION = gql`
  subscription restaurant (
    $style: String!
    $region: String!
  ) {
    restaurant (
      data: {
        style: $style
        region: $region
      }
    ) {
      mutation
      data {
        name
		    style
        region
        score
      }
    }
  }
`
