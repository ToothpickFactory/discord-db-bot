const dbsync = require('../util/dbsync');

let showCollections = (db, paths, args) => {
  return Object.keys(db);
}

module.exports = showCollections;
