'use strict';

var pool = {};

function getPoolConnector(db) {
  if (!pool.hasOwnProperty(db)) {
    return null;
  }
  return pool[db];
}
function setPoolConnector(db, con) {
  pool[db] = con;
}

module.exports.get = getPoolConnector;
module.exports.set = setPoolConnector;