const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "" :fbConfig().ACCESS_AUTHORITY;
var errorMsg = 'Please enter a PostID (ex. groupComments/< postID >)';

function getPost(fbPostId, cbResponse){

  if(!fbPostId){
    return cbResponse.send(errorMsg);
  }

  var options= {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    fbPostId +
    '/comments' +
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

  app.get('/groupComments', (req, res) => {
    res.send(errorMsg);
  });

  app.get('/groupComments/:postId', (req, res) => {
     getPost(req.params.postId, res);
  });
}