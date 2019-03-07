//const json2csv = require('json2csv');
const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
var accessAuthority = (process.env.ENVIRONMENT == 'dev') ?  "" :fbConfig().ACCESS_AUTHORITY
var errorMsg = 'Failed to retrieved Auth Token)';

function getApiToken(cbResponse){

  if(!cbResponse){
    return cbResponse.send(errorMsg);
  }

  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    fbConfig().IMPERSONATOR +
    fbConfig().TOKEN_PARAMS +
    accessAuthority,
    auth:{
      'bearer':fbConfig().BEARER
    }
  }
  rp(options)
    .then(function(result){
      //console.log(result)
      cbResponse.send(result);
    })
    .catch(function(err) {
      cbResponse.send(err.response.body);
    });
}

module.exports = function(app, {}) {
  app.get('/apiAuth', (req, res) => {
    var token = getApiToken(res);
  });

}