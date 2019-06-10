const productController = require("../controllers/product")

module.exports = app => {
  app
    .route(`/product/:id`)
    .get(productController.getProduct)
    .put(productController.updateProduct)

  app.route(`/test`).get((req, res) => {
    return res.json({ a: "test" })
  })
}
