const mongoose = require("mongoose")
require("../models/product")
const Product = mongoose.model("Product")
const fetch = require("node-fetch")

const getProduct = (req, res) => {
  const productId = Number(req.params.id)

  const productPricingPromise = Product.findOne({ id: productId })
    .select("-_id -__v")
    .then(doc => doc._doc)
    .catch(err => {
      throw "Product pricing read error."
    })

  const externalNameGetRequestUrl = `http://redsky.target.com/v2/pdp/tcin/${productId}`
  const externalRequestPromise = fetch(externalNameGetRequestUrl)
    .then(resp => resp.json())
    .then(json => {
      return json.product.item.product_description.title
    })
    .catch(err => {
      throw "Unable to find product name from redsky call"
    })

  Promise.all([productPricingPromise, externalRequestPromise])
    .then(responses => {
      const productPricingRes = responses[0]
      const productName = responses[1]

      const finalResp = {
        ...productPricingRes,
        name: productName
      }

      res.json(finalResp)
    })
    .catch(err => res.json({ error: err }))
}

const updateProduct = (req, res) => {
  const newPrice = req.body.value
  if (typeof newPrice !== "number")
    return res.json(`price field must be a float`)

  const productId = Number(req.params.id)
  if (isNaN(productId)) return res.json(`:id parameter must be an int`)

  const query = { id: productId }
  const update = { $set: { "current_price.value": newPrice } }

  Product.findOneAndUpdate(query, update, { new: true })
    .select("-_id -__v")
    .then(doc => {
      if (doc === null) throw `Cannot find a product with id ${productId}`
      else res.json(doc)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = {
  getProduct,
  updateProduct
}
