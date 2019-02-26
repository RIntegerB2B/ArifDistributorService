var config = require('../config/config');

module.exports = {
   url: `mongodb://${config.host}:${config.mongoPort}/${config.dbName}`
}