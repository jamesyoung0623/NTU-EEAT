const Query = {
  restaurants(parent, args, { Restaurant }, info) {
    const restaurant = {
      ...args.data,
    };
    let restaurants;
    if (restaurant.region === "ALL") {
      restaurants = Restaurant.find();
    } else {
      restaurants = Restaurant.find(restaurant);
    }

    return restaurants;
  },
};

export { Query as default };
