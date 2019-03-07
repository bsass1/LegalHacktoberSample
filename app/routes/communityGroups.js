const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
var errorMsg = 'Please enter add a community GroupID (ex. communityGroups/< communityGroupsID >)';
var accessAuthority = (process.env.ENVIRONMENT == 'dev') ?  "" :fbConfig().ACCESS_AUTHORITY;

function communityFeed(fbGroupId , cbResponse){

  if(!fbGroupId){
    return cbResponse.send(errorMsg);
  }

  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX +
    '/v2.9/' +
    fbGroupId +
    fbConfig().GROUPS_SUFFIX +
    '?' + accessAuthority + '&limit=100',
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

  app.get('/communityGroups', (req, res) => {
      res.send(errorMsg);
  });

  app.get('/communityGroups/:communityId', (req, res) => {
    communityFeed(req.params.communityId, res);
  });

}
