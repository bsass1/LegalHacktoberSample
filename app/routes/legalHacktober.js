const rp = require('request-promise');
const request = require('request');
const fbConfig = require('../../fbworkPlace.config');
const groupFeed2Csv = require('../utils/dataToCsv');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const accessAuthority = (process.env.ENVIRONMENT === 'dev') ?  "?" :fbConfig().ACCESS_AUTHORITY + "&";
var _ = require('lodash');
var status= {};
var errorMsg = 'Failed to create csv';


function getPost(postId){
  if(!postId){
    return errorMsg + " Post --> " + postId;
  }
  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    postId + accessAuthority +
    fbConfig().CSV_PARMS,
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if(err){
        console.log('failed')
        reject('failed post.txt' + err);
      }
      resolve(body);
    });
  })
}

function getComments(postId){
  if(!postId){
    return errorMsg + " Comments --> " + postId;
  }
  var options = {
    uri: fbConfig().GRAPH_URL_PREFIX + '/' +
    postId  + accessAuthority +
    fbConfig().CSV_COMMENT,
    auth:{
      'bearer':fbConfig().BEARER
    }
  };
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if(err){
        console.log('failed post.txt')
        reject('failed post.txt' + err);
      }
      resolve(body);
    });
  })
}

function getLegalHacktober(data, cbResponse ) {
  var promises = [];
  var csvReady = [];
  for(var i=0; i < data.length; i++){
    promises.push(getPost(data[i]));
    promises.push(getComments(data[i]));
  }
  Promise.all(promises).then((values)=>{
    values.forEach((post)=>{

      //console.log(post)
    csvReady.push(JSON.parse(post));

    });
    var csv = groupFeed2Csv.downLoadGroupLegalHacktoberCSV(csvReady);
    //console.log(csv)
    cbResponse.send(csv);
  })
}

function makePromise(options){
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if(err){
        reject('failed Feed' + err);
      }
      console.log("BodyError" + body.error)
      resolve(body);
    });
  }).catch((err)=>{
    //console.log(err.response.req.path) //Check auth pattern in log
    cbResponse.send(err.response.body);
  });
}

module.exports = function(app, {}) {
  app.get('/legalHacktober/posts/:fileName', (req, res) => {

    var postIds  =  groupFeed2Csv.getFileWithPostIds(req.params.fileName);
    postIds.then((data)=>{
      if(data.length != 0){
        var postArr =  data.split('\r\n');
        var cleanedPost = postArr.filter((x)=> x != '');
        getLegalHacktober(cleanedPost , res);
      }else{
        res.status(500).send({ error: "No Data in file" });
      }
    });
    postIds.catch((err)=> {
      res.status(500).send({error: "File not found", path: err.path});
    });
  });

  app.get('/legalHacktober', (req, res) => {

    if(req.query.postId === undefined){
      res.status(500).send('Please include query parameters');
      return;
    }
    if(/^\d+_\d+|,?/.test(req.query.postId)){
      var data = req.query.postId.split(',');
      getLegalHacktober(data, res);
    } else {
      res.status(500).send( 'Invalid format query parameters ');
    }
  });
}



