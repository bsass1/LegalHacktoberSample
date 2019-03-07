const communityGroups = require('./communityGroups');
const groupFeed = require('./groupFeed');
const groupComments = require('./groupComments');
const sharedpost = require('./groupSharedpost');
const groupReactions = require('./groupReactions');
const groupSeen = require('./groupSeen');
const workGroupCSV = require('./workGroupCSV');
const apiAuth = require('./apiAuth');
const legalHacktober = require('./legalHacktober');

module.exports = function(app,{}) {
  communityGroups(app,{});
  groupFeed(app,{});
  groupComments(app,{});
  sharedpost(app,{});
  groupReactions(app,{});
  groupSeen(app,{});
  workGroupCSV(app,{});
  apiAuth(app,{});
  legalHacktober(app,{});
}
