const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  current_price: {
    value: {
      type: Number,
      required: true
    },
    currency_code: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model("Product", ProductSchema)
