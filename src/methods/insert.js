const dbsync    = require('../util/dbsync');
const simpleId  = require('node-sid');

let insert = (db, paths, args) => {
  let obj             = args[0];
  obj._id             = simpleId().create();
  db[paths][obj._id]  = obj;
  dbsync.sync(db);
  return db[paths][obj._id];
}

module.exports = insert;
