import React from "react";

const Restaurants = (props) => {
  let returnRestaurantList;
  switch (props.filter) {
    case "ALL":
      returnRestaurantList = props.data;
      console.log("filter is ALL now!");
      break;
    case "公館":
      console.log("filter is 公館 now!");
      break;
    case "溫州":
      console.log("filter is 溫州 now!");
      break;
    case "118":
      console.log("filter is 118 now!");
      break;
    case "其他":
      console.log("filter is 其他 now!");
      break;
    default:
      break;
  }
  return <div>{returnRestaurantList}</div>;
};

export default Restaurants;
