const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "" :fbConfig().ACCESS_AUTHORITY;
var errorMsg = 'Please enter add a PostID (ex. /groupReactions/< postID >)';

function getReactions(fbReactionId, cbResponse) {

  if(!fbReactionId){
    return cbResponse.send(errorMsg);
  }

  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    fbReactionId +
    '/reactions' +
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
  app.get('/groupReactions', (req, res) => {
    res.send(errorMsg);
  });

  app.get('/groupReactions/:postId', (req, res) => {
    getReactions(req.params.postId, res);

  });
}