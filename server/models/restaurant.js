const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const RestaurantSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	style: {
		type: String,
		required: [true, 'Style field is required.']
	},
	region: {
		type: String,
		required: [true, 'Region field is required.']
	},
	score: {
		type: String,
		required: [true, 'Score field is required.']
	}
})

// Creating a table within database with the defined schema
const Restaurant = mongoose.model('message', RestaurantSchema)

// Exporting table for querying and mutating
module.exports = Restaurant
