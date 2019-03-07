const rp = require('request-promise');
const fbConfig = require('../../fbworkPlace.config');
const groupFeed2Csv = require('../utils/dataToCsv');
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "?" :fbConfig().ACCESS_AUTHORITY;
var errorMsg = 'Failed to create csv';

function getGroupFeedCSV(groupId , cbResponse){
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
  _requestCSV(options, groupFeed2Csv.downLoadGroupFeedCvs, cbResponse);
}

function getReactionsCSV(fbPostId, cbResponse) {
  if(!fbPostId){
    return cbResponse.send(errorMsg);
  }

  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    fbPostId +
    '/reactions'+
    accessAuthority,
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  _requestCSV(options, groupFeed2Csv.downLoadGroupReactionCsv, cbResponse);
}

function communityGroupsCSV(fbGroupId , cbResponse){
  if(!fbGroupId){
    return cbResponse.send(errorMsg);
  }
  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX +
    '/v2.9/' +
    fbGroupId +
    fbConfig().GROUPS_SUFFIX +
    accessAuthority + '&limit=100',
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  _requestCSV(options, groupFeed2Csv.downLoadWorkPlaceGroupCsv, cbResponse);
}

function sharedPostCSV(fbPostId, cbResponse){

  if(!fbPostId){
    return cbResponse.send(errorMsg);
  }

  var options= {
    uri: fbConfig().GRAPH_URL_PREFIX + '/v2.8/' +
    fbPostId +
    accessAuthority +
    '?sharedposts' ,
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  _requestCSV(options, groupFeed2Csv.downLoadGroupCommentsCsv, cbResponse);
}


function getCommentsCSV(fbPostId, cbResponse){
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
  _requestCSV(options, groupFeed2Csv.downLoadGroupCommentsCsv, cbResponse);
}

function _requestCSV(options, csvFunc, cbResponse){
  rp(options)
    .then(function(result){
      //console.log(result)
      var status = csvFunc(result);
      cbResponse.send(status);
    })
    .catch(function(err) {
      console.log(err.response.req.path) //Check auth pattern in log
      cbResponse.send(err.response.body);
    });
}

module.exports = function(app, {}) {

  app.get('/workGroupCSV', (req, res) => {
    res.send('Please add action parameters');
  });

  app.get('/workGroupCSV/gf/:groupId', (req, res) => {
    console.log(req.params.groupId);
    getGroupFeedCSV(req.params.groupId, res);
  });

  app.get('/workGroupCSV/gr/:postId', (req, res) => {
    getReactionsCSV(req.params.postId, res);
  });

  app.get('/workGroupCSV/sp/:postId', (req, res) => {
    sharedPostCSV(req.params.postId, res);
  });

  app.get('/workGroupCSV/cg/:groupId', (req, res) => {
    communityGroupsCSV(req.params.groupId, res);
  });

  app.get('/workGroupCSV/gc/:postId', (req, res) => {
    getCommentsCSV(req.params.postId, res);
  });

}


