const config    = require("../../config/config.json");
const jsonfile  = require('jsonfile');

let load = () => jsonfile.readFileSync(config.DBPath);

let sync = (db) => jsonfile.writeFile(config.DBPath, db);

module.exports = {load, sync}
