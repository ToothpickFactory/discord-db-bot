const dbsync = require('../util/dbsync');

let create = (db, paths, args) => {
  nodeName      = args[0];
  db[nodeName]  = {};
  dbsync.sync(db);
  return `Collection ${nodeName} created!`;
}

module.exports = create;
