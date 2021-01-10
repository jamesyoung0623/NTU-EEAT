import { gql } from 'apollo-boost'

export const MESSAGES_SUBSCRIPTION = gql`
  subscription message (
    $receiver: String!
  ) {
    message (
      data: {
        receiver: $receiver
      }
    ) {
      mutation
      data {
        sender
        body
        receiver
      }
    }
  }
`
