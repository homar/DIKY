var config = {
  "development": {
    "db": {
      "mongodb": "mongodb://@localhost:27017/diky"
    },

    "logging": {
      "file": "logs/api.log",
      "level": "error"
    }
  },


  "production": {
    "logging": {
      "level": "warn"
    }
  }
};

var env = process.env.DIKY_ENV || "development"
module.exports = config[env]
