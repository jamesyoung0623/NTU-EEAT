import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { Input, message, Tag } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  MESSAGE_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGES_SUBSCRIPTION
} from './graphql'

function App() {

  const [status, setStatus] = useState('')
  const [username, setUsername] = useState('')
  const [usernamedecided, setUsernamedecided] = useState(false)
  const [targetname, setTargetname] = useState('')
  const [body, setBody] = useState('')

  const bodyRef = useRef(null)

  const { subscribeToMore, ...result } = useQuery(
    MESSAGE_QUERY,
    { variables: { receiver: username } }
  )
  
  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { receiver: username },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.message.data
        return { messages: [...prev.messages, newMessage] }
      }
    })
  }, [subscribeToMore])

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  const handleMessageSend = (msg) => {
    if (!msg || !targetname) {
      displayStatus({
        type: 'error',
        msg: 'Please enter a targetname and a message body.'
      })
      return
    }
    setBody('')
    const newMessage = { sender: username, body: msg, receiver: targetname }
    addMessage({ variables: newMessage })
  }

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
      </div>
      <div className="App-username">
        {usernamedecided? (
          <h1>{username}</h1>
        ) : (
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: 10 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setUsernamedecided(true)
                subscribeToMore({
                  document: MESSAGES_SUBSCRIPTION,
                  variables: { receiver: username },
                  updateQuery: (prev, { subscriptionData }) => {
                    console.log(subscriptionData)
                    if (!subscriptionData.data) return prev
                    const newMessage = subscriptionData.data.message.data
                    console.log(newMessage)
                    return {
                      messages: [...prev.messages, newMessage]
                    }
                  }
                })
              }
            }}
          ></Input>
        )}
      </div>
      <div className="App-messages">
        {usernamedecided ? (
          result.data.messages.map(({ sender, body, receiver }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{sender}</Tag> {body}
            </p>
          ))
        ) : (
          <p style={{ color: '#ccc' }}>
            Please enter username first
          </p>
        )}
      </div>
      <Input
        placeholder="Who do you want to talk to?"
        value={targetname}
        onChange={(e) => setTargetname(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message here..."
        onSearch={handleMessageSend}
      ></Input.Search>
    </div>
  )
}

export default App
