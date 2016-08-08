const dbsync = require('../util/dbsync');

let remove = (db, paths, options) => {
  if( !paths[1] ) return 'Can not use "Remove" on a collection';
  delete db[paths[0]][paths[1]];
  dbsync.sync(db);
  return `Removed ${paths[1]} From ${paths[0]}`;
}

module.exports = remove;
