const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "?" : fbConfig().ACCESS_AUTHORITY + "&";
var errorMsg = 'Please enter a GroupID (ex. /groupFeed/< groupFeedID >)';

function getGroupFeed(groupId, cbResponse ){
  if(!groupId){
    return cbResponse.send(errorMsg);
  }
  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    groupId + '/' +
    'feed'+
    accessAuthority +
    fbConfig().GET_PARAMS,
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  rp(options)
    .then(function(result){
      //console.log(result)
      cbResponse.send(result);
    })
    .catch(function(err) {
      console.log(err.response.req.path) //Check auth pattern in log
      cbResponse.send(err.response.body);
    });
}

module.exports = function(app, {}) {

  app.get('/groupFeed', (req, res) => {
    res.send(errorMsg);
  });

  app.get('/groupFeed/:groupId', (req, res) => {
      getGroupFeed(req.params.groupId, res);
  });
}