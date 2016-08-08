const Discord   = require("discord.js");
const config    = require("../config/config.json");
const methods   = require("./methods");
const helpers   = require("./helpers");
const dbsync    = require("./util/dbsync");

let db    = dbsync.load();
let mybot = new Discord.Client();
mybot.loginWithToken(config.token);

mybot.on("message", function(msg) {
  if(msg.author.id === config.botId) return;

  try{
    let res = '';

    if(msg.content.substring(0,3) === 'db.'){
      res = processCommand(db, msg.content);
    }else if(msg.content.substring(0,3) === 'db '){
      res = processAlias(db, msg.content);
    }

    res = JSON.stringify( res, null, '\t' );
    mybot.reply(msg, res);
  }catch(e){
    mybot.reply(msg, e);
  }
});


function processAlias(db, cmdString){
  let args  = cmdString.split(' ');
  let cmd   = helpers.alias(db, args[1]);
  if(!cmd) return `No alias for "${args[1]}"`;
  return processCommand(db, cmd);
}


function processCommand(db, cmdString){
  if(cmdString[cmdString.length - 1] !== ')') cmdString += '.find()';
  let nodes         = cmdString.match(/(?:[^\."]+|"[^"]*")+/g);
  let rawMethod     = nodes.pop();
  let method        = rawMethod.substr(0, rawMethod.indexOf('('));
  let rawArgs       = rawMethod.match(/\(([^)]+)\)/);
  let args          = rawArgs ? rawArgs[1].split(",").map(JSON.parse) : null;
  let paths         = nodes;
  paths.shift();

  return methods[method](db, paths, args);
}
