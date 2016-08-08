const dbsync = require('../util/dbsync')

let alias = (db, alias) => {
  return db.alias[alias];
}

module.exports = alias;
