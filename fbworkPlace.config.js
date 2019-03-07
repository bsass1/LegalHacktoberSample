require('dotenv').load();
const sha256 = require('js-sha256');
module.exports = function(){

  //Date formatting
  var someDate = new Date();
  var numberOfDaysToAdd = 6;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  //Parameter building functions
  function buildTokenParams(){
    return "?fields=impersonate_token"
  }

  function addAccessAuthority(){
    var appsecret_proof = sha256.hmac(process.env.APP_SECRET, process.env.ACCESS_TOKEN);
    return  "?access_token=" + process.env.ACCESS_TOKEN + "&appsecret_proof=" +  appsecret_proof
  }

  //params for group feed
  function buildGetParams(){
    return "fields=id," +
    "name,"+
    "picture," +
    "permalink_url," +
    "from," +
    "story," +
    "message," +
    "type," +
    "link," +
    "created_time," +
    "updated_time," +
    "shares," +
    "seen.limit(0).summary(total_count)," +
    "reactions.limit(0).summary(total_count)," +
    "comments.limit(0).summary(total_count)&limit=25"
  }

  function csvParams(){
    return "fields=id," +
    "source," +
    "story," +
    "type," +
    "permalink_url," +
    "message," +
    "created_time," +
    "updated_time," +
    "likes.limit(0).summary(total_count)," +
    "shares.limit(0).summary(total_count)," +
    "name," +
    "comments," +
    "picture,"+
    "seen.limit(0).summary(total_count)," +
    "reactions," +
    "to,"+
    "with_tags," +
    "from";
  }

  function csvCommentParms(){
    return "fields=id," +
      "source," +
      "story," +
      "type," +
      "link," +
      "permalink_url," +
      "message," +
      "created_time," +
      "updated_time," +
      "likes.limit(0).summary(total_count)," +
      "shares.limit(0).summary(total_count)," +
      "name," +
      "comments.limit(0).summary(total_count)," +
      "picture,"+
      "seen.limit(0).summary(total_count)," +
      "reactions," +
      "to,"+
      "with_tags," +
      "from"
  }
  
 //Configuration environmental values
  return {
    'SINCE' : someDate.getDate(),
    'GRAPH_URL_PREFIX' : "https://graph.facebook.com",
    'GROUPS_SUFFIX' : "/groups",
    'DEFAULT_LIMIT' : 100,
    'VERBOSE' : true,
    'BEARER': process.env.PERM_TOKEN,
    'GET_PARAMS': buildGetParams(),
    'ACCESS_AUTHORITY':  addAccessAuthority(),
    'TOKEN_PARAMS': buildTokenParams(),
    'IMPERSONATOR' : process.env.IMPERSONATOR,
    'PERM_TOKEN': process.env.PERM_TOKEN,
    'CSV_PARMS': csvParams(),
    'CSV_COMMENT': csvCommentParms()
  }
}
