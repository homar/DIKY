module.exports = {
  "development": {
    "db": {
      "mongodb": "mongodb://@localhost:27017/diky"
    },

    "logging": {
      "file": "logs/api.log"
      "level": "error"
    }
  },


  "production": {
    "logging": {
      "level": "warn"
    }
  }
};
