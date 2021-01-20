import "./home.css";
import logo from "../images/logo.png";

import { Button } from "antd";
import { useRef } from "react";

import React, { useEffect, useState } from "react";
import { Input, message, Tag } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";


import {
  RESTAURANT_QUERY,
  CREATE_RESTAURANT_MUTATION,
  RESTAURANTS_SUBSCRIPTION,
} from "../graphql";

const Home = function () {
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantStyle, setRestaurantStyle] = useState("");
  const [restaurantRegion, setRestaurantRegion] = useState("");
  const [restaurantScore, setRestaurantScore] = useState("");
  const [region, setRegion] = useState("ALL");
  const [sendSwitch, setSendSwitch] = useState(true);

  const inputStyleRef = useRef(null);
  const inputRegionRef = useRef(null);
  const inputScoreRef = useRef(null);

  const { subscribeToMore, ...result } = useQuery(RESTAURANT_QUERY, {
    variables: { region: region },
  });

  const [addRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION);

  useEffect(() => {
    subscribeToMore({
      document: RESTAURANTS_SUBSCRIPTION,
      variables: { region: region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newRestaurant = subscriptionData.data.restaurant.data;
        return { restaurants: [...prev.restaurants, newRestaurant] };
      },
    });
  }, [subscribeToMore]);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };

      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "danger":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    displayStatus(status);
    setIsAddingItem(false);
    setRestaurantName("");
    setRestaurantStyle("");
    setRestaurantRegion("");
    setRestaurantScore("");
  }, [status, sendSwitch]);

  //--************************************************** Handle Function **************************************************--//

  const handleRestaurantSend = (msg) => {
    if (
      !msg ||
      restaurantName === "" ||
      restaurantStyle === "" ||
      restaurantRegion === "" ||
      restaurantScore === ""
    ) {
      displayStatus({
        type: "error",
        msg: "Please enter a valid restaurant information.",
      });
      return;
    }

    const newRestaurant = {
      name: restaurantName,
      style: restaurantStyle,
      region: restaurantRegion,
      score: restaurantScore,
    };

    addRestaurant({ variables: newRestaurant });
    if (sendSwitch === false) {
      setSendSwitch(true);
    } else {
      setSendSwitch(false);
    }

  };

  const handleChangeFilter = (e) => {
    if (e.target.innerText === "ADD") {
      setIsAddingItem(true);
    } else {
      setFilterStatus(e.target.innerText);
      setIsAddingItem(false);
      setRegion(e.target.innerText);
    }
  };

  //--************************************************** Return Frame **************************************************--//
  const Restaurants = (props) => {
    if (props.data) {
      console.log(props.data);
      if (props.data.restaurants.length !== 0) {
        return props.data.restaurants.map(({ name, style, region, score }, i) => {
          return (
              <div className="restaurant-block" key={i}>
                <Tag color="blue">
                  <p>name: {name}</p>
                  <p>style: {style}</p>
                  <p>region: {region}</p>
                  <p>score: {score}</p>
                </Tag>
              </div>
          );
        });
      } else {
        return (
          <>
            <div>No restaurant yet...</div>
            <div>Try input one!</div>
          </>
        );
      }
    } else {
      return <div>Loading...</div>;
    }
  };
  
  return (
    <>
      <div className="top-box">
        <div className="container">
          <h1>
            <img src={logo} alt="" />
          </h1>
        </div>
      </div>
      <div className="restaurant-box">
        <div className="container">
          <div className="row">
            <h2 className="restaurant-header">RESTAURANT</h2>
            <p>Find a restaurant you like!</p>
          </div>
          <div className="row">
            <div className="filter-button-group">
              <Button onClick={handleChangeFilter}>ALL</Button>
              <Button onClick={handleChangeFilter}>Gongguan</Button>
              <Button onClick={handleChangeFilter}>Wenzhou</Button>
              <Button onClick={handleChangeFilter}>118</Button>
              <Button onClick={handleChangeFilter}>Others</Button>
              <Button onClick={handleChangeFilter}>ADD</Button>
            </div>
          </div>
          <div className="row">
            {isAddingItem ? (
              <>
                <p>Here you can add a new Restaurant!</p>
                <Input
                  placeholder="Restaurant name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  style={{ marginBottom: 10 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      inputStyleRef.current.focus();
                    }
                  }}
                ></Input>
                <Input
                  placeholder="Restaurant style (ex: sushi/japanese、Korean cuisine...)"
                  value={restaurantStyle}
                  ref={inputStyleRef}
                  onChange={(e) => setRestaurantStyle(e.target.value)}
                  style={{ marginBottom: 10 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      inputRegionRef.current.focus();
                    }
                  }}
                ></Input>
                <Input
                  placeholder="Restaurant region (You can type: 'Gongguan', 'Wenzhou', '118', or 'others')"
                  value={restaurantRegion}
                  ref={inputRegionRef}
                  onChange={(e) => setRestaurantRegion(e.target.value)}
                  style={{ marginBottom: 10 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      inputScoreRef.current.focus();
                    }
                  }}
                ></Input>
                <Input.Search
                  rows={4}
                  value={restaurantScore}
                  ref={inputScoreRef}
                  enterButton="Send"
                  onChange={(e) => setRestaurantScore(e.target.value)}
                  placeholder="Restaurant score"
                  onSearch={handleRestaurantSend}
                ></Input.Search>
              </>
            ) : (
              <div className="restaurant-list">
                <Restaurants filter={filterStatus} data={result.data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};



export default Home;
