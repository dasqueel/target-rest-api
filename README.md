# My approach

- Ask clarifying questino of the problem statement.

  - What is the expected rate of requests at peak hours? Are their dormant hours?
  - Is there a prioity of speed of requests? Consistentcy?
  - Can we give back partial data? What should the error response look like?

- Create an MVC node express app (would do typescript, but I am a beginner with TS)

* Write tests for the get and put requests

* swagger documentation for API (didnt have enough time to finish this part, but documentation is vital!)

# Installation

```
git clone https://github.com/dasqueel/target-rest-api

cd target-rest-api

npm i
```

# Usage

If want to run the local instance, thre are a few steps before.

- Comment out line 2 and Uncomment line 1 in both `server.js` AND `test/api.test.js`, to run local envs
- Uncomment lines 41-54 in server.js to write a document to the local mongo db
- Have a local instance of mongodb service running on port 27017 (default port).

Run the tests

```
npm test
```

Run the app

```
npm start
```

### Make api calls

Get Happy Path:

```
curl localhost:8080/product/13860428
```

Get Error 1

```
curl localhost:8080/product/someInvalidProductId
```

Put Happy Path

```
curl -X PUT -H "Content-Type: application/json" -d '{"value":10.99}' http://localhost:8080/product/13860428
```

Put Error 1

```
curl -X PUT -H "Content-Type: application/json" -d '{"value":10.99}' http://localhost:8080/product/someInvalidProductId
```

Put Error 2

```
curl -X PUT -H "Content-Type: application/json" -d '{"value":"10.99"}' http://localhost:8080/product/13860428
```

# Working Instance

A working instance is on: https://target-neil.herokuapp.com

So all the curl commands should work on https://target-neil.herokuapp.com as well.

For example `curl https://target-neil.herokuapp.com/product/13860428`
