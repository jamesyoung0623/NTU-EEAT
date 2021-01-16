import './App.css'
import React, { useEffect, useState } from 'react'
import { Input, message, Tag } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Select from 'react-select'
import {
  RESTAURANT_QUERY,
  CREATE_RESTAURANT_MUTATION,
  RESTAURANTS_SUBSCRIPTION
} from './graphql'

function App() {

  const [status, setStatus] = useState('')
  const [style, setStyle] = useState('')
  const [region, setRegion] = useState('')

  const styleOptions = [
    { value: '', label: '選擇您想吃的餐點類型' },
    { value: '壽司/日式', label: '壽司/日式' },
    { value: '韓式料理', label: '韓式料理' },
    { value: '特別料理', label: '特別料理' },
    { value: '東南亞料理', label: '東南亞料理' }
  ]

  const regionOptions = [
    { value: '', label: '選擇您傾向的用餐區域' },
    { value: '公館', label: '公館' },
    { value: '溫州', label: '溫州' },
    { value: '118', label: '118' },
    { value: '其他', label: '其他' },
  ]

  const { subscribeToMore, ...result } = useQuery(
    RESTAURANT_QUERY,
    { variables: { style: style, region: region } }
  )
  
  const [addRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION)

  useEffect(() => {
    subscribeToMore({
      document: RESTAURANTS_SUBSCRIPTION,
      variables: { style: style, region: region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newRestaurant = subscriptionData.data.restaurant.data
        return { restaurants: [...prev.restaurants, newRestaurant] }
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

  const handleRestaurantSend = (msg) => {
    if (!msg) {
      displayStatus({
        type: 'error',
        msg: 'Please enter a targetname and a message body.'
      })
      return
    }
    const newRestaurant = { style: style, region: region }
    addRestaurant({ variables: newRestaurant })
  }

  return (
    <div className="App">
      <div className="App-title">
        <h1>NTU-EEAT</h1>
      </div>
      <div className="App-querybars">
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={styleOptions[0]}
          name="style"
          options={styleOptions}
        />
      </div>
      <div className="App-querybars">
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={regionOptions[0]}
          name="region"
          options={regionOptions}
        />
      </div>
    </div>
  )
}

export default App
