let config = {}

config.mongoURI = {
  development_local: "mongodb://localhost/target-dev",
  test_local: "mongodb://localhost/target-test",
  development_remote: process.env.REMOTE_DB_PATH,
  development_remote: process.env.REMOTE_DB_PATH_TEST
}

module.exports = config
