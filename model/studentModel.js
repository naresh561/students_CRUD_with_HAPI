var _start = require('../config/database')._start;
var _reply = require('../config/database')._reply;

module.exports.ListStudents = function(reply){
    var userconnection = _start();
    userconnection.beginTransaction(function(err) {
       
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

module.exports.DeleteStudent = function ( reply ,id  ){
    var userconnection = _start();
    userconnection.query("DELETE FROM student WHERE id = ? ",[id] ,function(err,row){
        console.log('deleted ' + row.affectedRows + ' rows');
        if(err) reply(err);
        else{_reply(userconnection); reply({data:"deleted successfully"});}
    });
};

module.exports.AddStudents = function(request,reply){
    var userconnection = _start();
    var Data =[request.payload.rollno,request.payload.fstnme,request.payload.lstnme,request.payload.mail, request.payload.gender,request.payload.marks];
         userconnection.query("INSERT INTO `student`( `rollnumber`, `first_name`, `last_name`, `email`, `gender`, `marks`) VALUES (?,?,?,?,?,?)",Data,function(err,row){
              if(err) reply(err);
              else{_reply(userconnection); reply.view('listall/addstudent' , {title:'Users',data:"Student added Successfully"});}
      });
};