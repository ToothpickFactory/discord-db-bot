const dbsync = require('../util/dbsync');

let createAlias = (db, paths, args) => {  
  db.alias[args[0]] = args[1];
  dbsync.sync(db);
  return `Alias ${args[0]} added!`;
}

module.exports = createAlias;
