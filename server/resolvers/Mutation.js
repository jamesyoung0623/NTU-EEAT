const Mutation = {
  createRestaurant(parent, args, { Restaurant, pubsub }, info) {
    const restaurant = {
      ...args.data
    }

    Restaurant.create(restaurant, function (err) {
      if (err) return handleError(err);
    });

    pubsub.publish('restaurant', {
      restaurant: {
        mutation: 'CREATED',
        data: restaurant
      }
    })
    
    const restaurants = Restaurant.find();
    return restaurants
  },
  deleteRestaurant(parent, args, { Restaurant, pubsub }, info) {
    const restaurant = {
      ...args.data
    }
    
    Restaurant.deleteMany(restaurant, function (err) {
      if (err) return handleError(err);
    });

    pubsub.publish('restaurant', {
      restaurant: {
        mutation: 'DELETED',
        data: restaurant
      }
    })
    
    const restaurants = Restaurant.find();
    return restaurants
  }
}

export { Mutation as default }
