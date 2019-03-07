const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "" :fbConfig().ACCESS_AUTHORITY;
var errorMsg = 'Please enter add a reactionID (ex. /groupSeen/< PostID >)';

function getSeen(fbReactionId, cbResponse) {

  if(!fbReactionId){
    return cbResponse.send(errorMsg);
  }

  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    fbReactionId +
    '/seen' +
    accessAuthority,
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
  app.get('/groupSeen', (req, res) => {
    res.send(errorMsg);
  });

  app.get('/groupSeen/:postId', (req, res) => {
    getSeen(req.params.postId, res);

  });
}
