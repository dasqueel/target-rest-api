# My approach

- Ask clarifying questino of the problem statement.

  - What is the expected rate of requests at peak hours? Are their dormant hours?
  - Is there a prioity of speed of requests? Consistentcy?
  - Can we give back partial data? What should the error response look like?

- Create an MVC node express app (would do typescript, but I am a beginner with TS)

* Write tests for the get and put requests

* swagger documentation for API

# Installation

```
git clone https://github.com/dasqueel/target-rest-api

cd target-rest-api

npm i
```

# Usage

Run the tests

```
npm test
```

Run the app

```
npm start
```

Make api calls

Working:

```
curl localhost:8080/product/13860428
```

# Working Instance

A working instance is on: <the heroku api url>
