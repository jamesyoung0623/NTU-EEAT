import React from "react";
import { Tag } from "antd";
import "./Restaurant.css";

const Restaurants = (props) => {
  if (props.data) {
    console.log(props.data);
    if (props.data.restaurants.length !== 0) {
    //   let returnRestaurantList = props.data.restaurants.map(
    //     ({ name, style, region, score }, i) => {
    //       return (
    //         <div>
    //           <p className="restaurant-block" key={i}>
    //             <Tag color="blue">name: {name}</Tag>
    //             <Tag color="blue">style: {style}</Tag>
    //             <Tag color="blue">region: {region}</Tag>
    //             <Tag color="blue">score: {score}</Tag>
    //           </p>
    //           <p>hi</p>
    //         </div>
    //       );
    //     }
    //   );
    //   switch (props.filter) {
    //     case "ALL":
    //       returnRestaurantList = props.data.restaurants;
    //       console.log("filter is ALL now!");
    //       break;
    //     case "Gongguan":
    //       console.log("filter is Gongguan now!");
    //       break;
    //     case "Wenzhou":
    //       console.log("filter is Wenzhou now!");
    //       break;
    //     case "118":
    //       console.log("filter is 118 now!");
    //       break;
    //     case "Others":
    //       console.log("filter is Others now!");
    //       break;
    //     default:
    //       break;
    //   }
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

export default Restaurants;
