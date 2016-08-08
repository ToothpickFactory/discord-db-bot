const dbsync = require('../util/dbsync')

let find = (db, paths, options) => {
  let node = paths.length > 1 ? db[paths[0]][paths[1]] : db[paths[0]];
  return node;
}

module.exports = find;
