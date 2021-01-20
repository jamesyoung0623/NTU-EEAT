import React from "react";

const Restaurants = (props) => {
  if (props.data) {
    let returnRestaurantList;
    console.log(props.data.restaurants);
    switch (props.filter) {
      case "ALL":
        returnRestaurantList = props.data.restaurants;
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
  } else {
    return (
      <>
        <div>No restaurant yet...</div>
        <div>Try input one!</div>
      </>
    );
  }
};

export default Restaurants;
