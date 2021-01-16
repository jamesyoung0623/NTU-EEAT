const Query = {
  restaurants(parent, args, { Restaurant }, info) {
    const restaurant = {
      ...args.data
    }

    const restaurants = Restaurant.find(restaurant);
    return restaurants
  }
}

export { Query as default }
