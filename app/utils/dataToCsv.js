const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
var path = require('path');


function writeCSV(csv){
  var timeStamp = Date.now();

  var dir = './app/csv_files/';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile(dir + timeStamp + 'hack.csv', csv, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
  });
}

var dataToCsv = {
  downLoadWorkPlaceGroupCsv:function(result) {
    var data = JSON.parse(result);
    if(data.data == undefined || data.data.length === 0){
      return 'No data found';
    }else {
      const fields = ['id','name','privacy'];
      const json2csvParser = new Json2csvParser({ fields, unwind:['data']});
      const csv = json2csvParser.parse(data);
      //console.log(csv);
      return csv;
    }
  },
  downLoadGroupFeedCvs:function (result) {
    var jsonData = JSON.parse(result);
    //console.log(jsonData.data)
    if(jsonData.data.length === 0){
      return 'No data found';
    }else {
      const fields = ['data.id',
        'data.permalink_url','' +
        'data.from.name',
        'data.message',
        'data.type',
        'data.created_time',
        'data.updated_time',
        'data.reactions.summary.total_count',
        'data.seen.summary.total_count',
        'data.comments.summary.total_count'
      ];
      const json2csvParser = new Json2csvParser({ fields, unwind:['data','reactions.data', 'to.data', 'comments.data']});
      const csv = json2csvParser.parse(jsonData);
      //console.log(csv);
      return csv;
    }
  },

  downLoadGroupReactionCsv: function(result){
    var data = JSON.parse(result);
    //console.log(data.data)
    if(data.data.length === 0){
      return 'No data found';
    }else {
      const fields = ['id','name','type'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(data.data);
      //console.log(csv);
      return csv;
    }
  },

  downLoadGroupCommentsCsv: function(result){
    var data = JSON.parse(result);
    //console.log(data.data)
    if(data.data.length === 0){
      return 'No data found';
    }else {
      const fields = ['created_time','from.name','from.id','message','id'];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(data.data);
      //console.log(csv);
      return csv;
    }
  },

  downLoadGroupLegalHacktoberCSV:function(jsonCsv) {
    console.log(jsonCsv)
    if (jsonCsv.length === 0) {
      return 'No data found';
    } else {
      const fields = [
        {label:'PostID', value:'id'},
        {label:'GroupName', value:'to.data.name'},
        {label:'GroupID', value:'to.data.id'},
        {label:'permalink_url', value:'permalink_url'},
        {label:'story', value:'story'},
        {label:'type',value:'type'},
        {label:'message',value:'message'},
        {label:'create_time', value:'created_time'},
        {label:'update_time', value:'updated_time'},
        {label:'member_id', value:'from.id'},
        {label:'name', value:'from.name'},
        {label:'member_id',value:'reaction.id'},
        {label:'picture', value:'picture'},
        {label:'story',value:'story'},
        {label:'likes',value:'likes.summary.total_count'},
        {label:'shares',value:'link'},
        {label:'seen',value:'seen.summary.total_count'},
        {label:'comments',value:'comments.summary.total_count'},
        {label:'commentMemberID',value:'comments.data.from.id'},
        {label:'commentMemberName',value:'comments.data.from.name'},
        {label:'reactionType',value:'reactions.data.type'},
        {label:'reactionMemberID',value:'reactions.data.id'},
        {label:'reactionMemberName',value:'reactions.data.name'}
      ];
      const json2csvParser = new Json2csvParser({fields, unwind:['data','reactions.data', 'to.data', 'comments.data']});
      const csv = json2csvParser.parse(jsonCsv);
      writeCSV(csv);
      //console.log(csv);
      return csv;
    }

  },
   getFileWithPostIds :function(fileName) {
    return new Promise(function(resolve){
        var postFile = path.join(__dirname, '..', 'load', fileName);
        fs.readFile(postFile , 'utf8', (err, data)=>{
            if(err) throw err;
              resolve(data);
        });
      });
   }
}

module.exports = dataToCsv;