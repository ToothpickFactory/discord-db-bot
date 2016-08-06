const Discord   = require("discord.js");
const config    = require("../config/config.json");
const jsonfile  = require('jsonfile');
const simpleId  = require('node-sid');
const _         = require('lodash');

let DBPath = '../config/db.json';
let db = jsonfile.readFileSync(DBPath);
var mybot = new Discord.Client();


mybot.on("message", function(msg) {

  if(msg.content.substring(0,3) === 'db.' && msg.author.id !== '211139208994095106'){
    try{
      let res = processCommand(msg.content);
      res = JSON.stringify( res, null, '\t' );
      mybot.reply(msg, res);
    } catch(e){
      mybot.reply(msg, e);
    }
  }

});

mybot.loginWithToken(config.token);


function processCommand(cmdString){
  if(cmdString[cmdString.length - 1] !== ')') cmdString += '.find()';
  let nodes         = cmdString.split('.');
  let rawMethod     = nodes.pop();
  let method        = rawMethod.substr(0, rawMethod.indexOf('('));
  let rawArgs       = rawMethod.match(/\(([^)]+)\)/);
  let args          = rawArgs ? rawArgs[1] : null;
  let paths         = nodes;
  paths.shift();

  return methods[method](paths, args);
}

let create = (paths, nodeName) => {
  nodeName      = JSON.parse(nodeName);
  db[nodeName]  = {};
  jsonfile.writeFile(DBPath, db);
  return `Collection ${nodeName} created!`;
}

let insert = (paths, args) => {
  let obj   = JSON.parse(args);
  obj._id   = simpleId().create();
  db[paths][obj._id] = obj;
  jsonfile.writeFile(DBPath, db);
  return db[paths][obj._id];
}

let find = (paths, options) => {
  let node = paths.length > 1 ? db[paths[0]][paths[1]] : db[paths[0]];
  return node;
}

let remove = (paths, options) => {
  if( !paths[1] ) return 'Can not use "Remove" on a collection';
  delete db[paths[0]][paths[1]];
  jsonfile.writeFile(DBPath, db);
  return `Removed ${paths[1]} From ${paths[0]}`;
}

let update = (paths, args) => {
  let obj       = JSON.parse(args);
  let mergedObj = Object.assign(db[paths[0]][paths[1]], obj);
  db[paths[0]][paths[1]] = mergedObj;
  jsonfile.writeFile(DBPath, db);
  return db[paths[0]][paths[1]];
}

const methods = {
  create,
  insert,
  find,
  remove,
  update
}
