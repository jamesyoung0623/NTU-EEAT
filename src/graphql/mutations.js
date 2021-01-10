import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $body: String!
    $receiver: String!
  ) {
    createMessage(
      data: {
        sender: $sender
        body: $body
        receiver: $receiver
      }
    ) {
      sender
      body
      receiver
    }
  }
`
