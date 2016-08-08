const dbsync = require('../util/dbsync');

let update = (db, paths, args) => {
  let obj       = args[0];
  let mergedObj = Object.assign(db[paths[0]][paths[1]], obj);
  db[paths[0]][paths[1]] = mergedObj;
  dbsync.sync(db);
  return db[paths[0]][paths[1]];
}

module.exports = update;
