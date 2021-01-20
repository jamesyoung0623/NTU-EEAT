import "./home.css";
import logo from "../images/logo.png";

import Select from "react-select";
import { Button } from "antd";
import { useRef } from "react";

import React, { useEffect, useState } from "react";
import { Input, message, Tag } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Restaurants from "./Restaurants.js";

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

  const inputStyleRef = useRef(null);
  const inputRegionRef = useRef(null);
  const inputScoreRef = useRef(null);

  const styleOptions = [
    { value: "", label: "選擇您想吃的餐點類型" },
    { value: "壽司/日式", label: "壽司/日式" },
    { value: "韓式料理", label: "韓式料理" },
    { value: "特別料理", label: "特別料理" },
    { value: "東南亞料理", label: "東南亞料理" },
  ];

  const regionOptions = [
    { value: "", label: "選擇您傾向的用餐區域" },
    { value: "公館", label: "公館" },
    { value: "溫州", label: "溫州" },
    { value: "118", label: "118" },
    { value: "其他", label: "其他" },
  ];

  const { subscribeToMore, ...result } = useQuery(RESTAURANT_QUERY, {
    variables: { style: restaurantStyle, region: restaurantRegion },
  });

  const [addRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION);

  useEffect(() => {
    subscribeToMore({
      document: RESTAURANTS_SUBSCRIPTION,
      variables: { style: restaurantStyle, region: restaurantRegion },
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
  }, [status]);

  //--************************************************** Handle Function **************************************************--//

  const handleRestaurantSend = (msg) => {
    if (!msg) {
      displayStatus({
        type: "error",
        msg: "Please enter a targetname and a message body.",
      });
      return;
    }
    console.log("msg is : " + msg);
    const newRestaurant = {name: restaurantName, style: restaurantStyle, region: restaurantRegion, score: restaurantScore };
    console.log("newRestaurant " + newRestaurant.name);
    addRestaurant({ variables: newRestaurant });
  };

  const handleChangeFilter = (e) => {
    if (e.target.innerText === "ADD") {
      console.log("Now we set isAddingItem be true");
      setIsAddingItem(true);
    } else {
      setFilterStatus(e.target.innerText);
      setIsAddingItem(false);
    }
    console.log("Now the filter status is: " + filterStatus + "   -----By WengCF");
    console.log("Now the isAddingItem status is: " + isAddingItem + "   -----By WengCF");
  };

  //--************************************************** Return Frame **************************************************--//
  return (
    <>
      <div className="top-box">
        <div className="container">
          <h1>
            <img src={logo} alt="" />
          </h1>

          <div className="choosing-bars">
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
              <Button onClick={handleChangeFilter}>公館</Button>
              <Button onClick={handleChangeFilter}>溫州</Button>
              <Button onClick={handleChangeFilter}>118</Button>
              <Button onClick={handleChangeFilter}>其他</Button>
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
                  placeholder="Restaurant style (ex: 壽司/日式、韓式料理...)"
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
                  placeholder="Restaurant region (ex: 公館、溫州...)"
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
              <Restaurants filter={filterStatus} data={result.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
