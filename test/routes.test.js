process.env.NODE_ENV = 'test';
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var request = require('request');
const fs = require('fs');
var path = require('path');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('App route testing', function(){

  it('Should return Face Book Group Comments', function(done){
    var postId = '465235423971266_465235540637921';
    request('http://localhost:8080/groupComments/' + postId, function(err, res, body){
      //(process.env.ACCESS_AUTHORITY === 'test') ? console.log()
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Please enter a PostID (ex. groupComments/< postID >)');
      done();
    })
  });

  it('Should return Face Book Group Reactions', function(done){
    var postID = '465235423971266_465239270637548';
    request.get('http://localhost:8080/groupReactions/'+ postID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Please enter add a postID (ex. /groupReactions/< postID >)');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Group Seen', function(done){
    var postID = '465235423971266_465239270637548';
    request('http://localhost:8080/groupSeen/'+ postID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Please enter add a postID (ex. /groupSeen/< postID >)');
      //console.log(body);
      done();
    })
  });
  it('Should return Face Book Group Feed', function(done){
    var groupFeedID = '465235423971266';
    request('http://localhost:8080/groupFeed/' + groupFeedID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Please enter a GroupID (ex. /groupFeed/< groupFeedID >)');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Community Group', function(done){
    var communityID = '157293114728702';
    request('http://localhost:8080/communityGroups/' + communityID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Please enter add a community GroupID (ex. communityGroups/< communityGroupsID >)');
      //console.log(body);
      done();
    })
  });

  it('Should return API token', function(done){
    request('http://localhost:8080/apiAuth', function(err, res, body){
      var regex = /{"error"/;
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to retrieved Auth Token');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Group Feed CSV', function(done){
    var groupFeedID = '465235423971266';
    request('http://localhost:8080/workGroupCSV/gf/' + groupFeedID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to create csv');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Group Reactions CSV', function(done){
    var postID = '465235423971266_465239270637548';
    request('http://localhost:8080/workGroupCSV/gr/'+ postID, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to create csv');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Community Group CSV', function(done){
    var communityID = '157293114728702';
    request('http://localhost:8080/workGroupCSV/cg/'+ communityID , function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to create csv');
      //console.log(body);
      done();
    })
  });

  it('Should return Face Book Group Comments CSV', function(done){
    var postId = '465235423971266_465235540637921';
    request('http://localhost:8080/workGroupCSV/gc/' + postId, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to create csv');
      //console.log(body);
      done();
    })
  });

  it('Should return LegalHacktober CSV', function(done){
    var postIds = 'postId=1839136679499463_1888315407914923,' +
    '1839136679499463_1888247677921696,' +
    '465235423971266_465239270637548,' +
    '465235423971266_465235540637921,' +
    '465235423971266_489937928167682';
    request('http://localhost:8080/legalHacktober?' + postIds, function(err, res, body){
      var regex = /{"error"/;
      var doctype = /<!DOCTYPE html>/
      expect(body).to.not.match(doctype);
      expect(body).to.not.match(regex);
      expect(body).to.not.eq('Failed to create csv');
      //console.log(body);
      done();
    })
  });

  it('Should return LegalHacktober CSV from file', function(done){
    var file = 'post.txt';
    var fileCreated = createTestLegalHactoberFile(file);
      fileCreated.then((d)=> {
      request('http://localhost:8080/legalHacktober/posts/' + file, function (err, res, body) {
        var regex = /{"error"/;
        var doctype = /<!DOCTYPE html>/
        expect(body).to.not.match(doctype);
        expect(body).to.not.match(regex);
        expect(body).to.not.eq('Failed to create csv');
        done();
      })
    })
    .then(()=>done())
    .catch((e)=>{
        throw e;
    });
  });
});

function createTestLegalHactoberFile(file){
  var dir = './app/load/' + file;
  var postIds = '1839136679499463_1888315407914923\r\n' +
    '1839136679499463_1888247677921696\r\n' +
    '465235423971266_465239270637548\r\n' +
    '465235423971266_465235540637921\r\n' +
    '465235423971266_489937928167682\r\n';
  return new Promise((resolve, reject)=>{
    fs.writeFile(dir , postIds, (err) => {
      // throws an error, you could also catch it here
      if (err) {
        reslove(false)
        throw err;
      }else {
        resolve(true);
      }
    });
  })
}
