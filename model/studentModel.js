var _start = require('../config/database')._start;
var _reply = require('../config/database')._reply;

module.exports.ListStudents = function(reply){
    var userconnection = _start();
    userconnection.beginTransaction(function(err) {
        console.log('in mopdel file');
      if(err){
          reply( {"status":0,"message":"Error connection"});
      }
      else{
          userconnection.query("SELECT * FROM `student` ORDER BY `id` ASC limit 0,25 ",function(err,row,fields){
              if(err) reply(err);
              else{_reply(userconnection); reply.view('listall/listall', {title:'Users',data:row});}
          });
      }
    });
};