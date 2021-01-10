import { gql } from 'apollo-boost'

export const MESSAGE_QUERY = gql`
  query messages (
    $receiver: String!
  ) {
    messages(
      data: {
        receiver: $receiver
      }
    ) {
      sender
      body
      receiver
    }
  }
`
