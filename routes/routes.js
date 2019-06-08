const productController = require("../controllers/product")

// const apiPrefix = "/api/v1"

module.exports = app => {
  // app.route(`${apiPrefix}/register`).post(userController.createUser)

  // app
  //   .route(`${apiPrefix}/signin`)
  //   .post(authController.requireSignIn, authController.signIn)

  app
    // .route(`${apiPrefix}/product/:id`)
    .route(`/product/:id`)
    // .get(authController.requireAuth, productController.getProduct)
    .get(productController.getProduct)
    // .put(authController.requireAuth, productController.updateProduct)
    .put(productController.updateProduct)

  app.route(`/test`).get((req, res) => {
    return res.json({ a: "test" })
  })
}
