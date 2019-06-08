process.env.NODE_ENV = "test"

const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const should = chai.should()
const mongoose = require("mongoose")
require("../models/product")
const Product = mongoose.model("Product")

chai.use(chaiHttp)

describe("Products", () => {
  beforeEach(done => {
    const newProduct = new Product({
      id: 13860428,
      current_price: {
        value: 13.49,
        currency_code: "USD"
      }
    })

    newProduct.save((err, doc) => {
      done()
    })
  })

  afterEach(done => {
    Product.collection.drop()
    done()
  })

  it("should list ALL blobs on /test GET", done => {
    chai
      .request(server)
      .get("/test")
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a("object")
        done()
      })
  })

  it("should return product response on /product/:id GET", done => {
    const expectedResp = {
      id: 13860428,
      current_price: {
        value: 13.49,
        currency_code: "USD"
      },
      name: "The Big Lebowski (Blu-ray)"
    }

    chai
      .request(server)
      .get("/product/13860428")
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.eql(expectedResp)
        done()
      })
  })

  it("should return error response on /product/:id GET", done => {
    chai
      .request(server)
      .get("/product/someInvalidProductCode")
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.have.property("error")
        res.body.error.should.eql("Product pricing read error.")
        done()
      })
  })

  // PUT
  it("should update and return product response on /product/:id PUT", done => {
    const expectedResp = {
      id: 13860428,
      current_price: {
        value: 10.99,
        currency_code: "USD"
      }
    }

    const payload = {
      value: 10.99
    }

    chai
      .request(server)
      .put("/product/13860428")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.eql(expectedResp)
        done()
      })
  })

  it("should return error response on /product/:id PUT", done => {
    const expectedResp = ":id parameter must be an int"
    const payload = {
      value: 10.99
    }

    chai
      .request(server)
      .put("/product/13860428f")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.eql(expectedResp)
        done()
      })
  })

  it("should return error response on /product/:id PUT", done => {
    const expectedResp = "price field must be a float"
    const payload = {
      value: "10.99"
    }

    chai
      .request(server)
      .put("/product/13860428f")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.eql(expectedResp)
        done()
      })
  })
})
