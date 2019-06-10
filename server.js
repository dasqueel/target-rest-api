// process.env.NODE_ENV = "development_local"
process.env.NODE_ENV = "development_remote"

require("dotenv").config()
const bodyParser = require("body-parser")
const express = require("express")
const config = require("./config")
const mongoose = require("mongoose")
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}
mongoose.Promise = global.Promise
const cors = require("cors")
const port = process.env.PORT || 8080
const server = express()

// set up server middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

console.log("env: ", process.env)
// mongoose
mongoose.connect(
  config.mongoURI[server.settings.env],
  mongooseOptions,
  (err, res) => {
    if (err) {
      console.log(`Error connecting to the database. ${err}`)
    } else {
      console.log(
        `Connected to Database: ${config.mongoURI[server.settings.env]}`
      )
    }
  }
)

// add the one product object to the nosql DB
require("./models/product")
const Product = mongoose.model("Product")

Product.collection.drop()

const newProduct = new Product({
  id: 13860428,
  current_price: {
    value: 13.49,
    currency_code: "USD"
  }
})

newProduct.save()

// set up routes
const routes = require("./routes/routes")
routes(server)

server.listen(port, () => {
  console.log(`Server up and running on ${port}`)
})

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = server
