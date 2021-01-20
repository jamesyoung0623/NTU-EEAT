import { gql } from 'apollo-boost'

export const RESTAURANTS_SUBSCRIPTION = gql`
  subscription restaurant (
    $region: String!
  ) {
    restaurant (
      data: {
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
