var StudentModel = require('../model/studentModel');
exports.liststudents = {
    handler: function(request, reply) {
		try{
            StudentModel.ListStudents(reply);
		}catch(e){
			console.log(e);
		}	     
    }
};
exports.deleteStudent = {
    handler: function(request, reply) {
              const i =  encodeURIComponent(request.params.id);
		try {            
            StudentModel.DeleteStudent(reply , i);
		} catch(e){
			console.log(e);
		}
	    
    }
};

exports.newstudent = {
    handler: function(request, reply) {
		try{
            reply.view('listall/addstudent');
		}catch(e){
			console.log(e)
		}
	    
    }
};

exports.addstudent = {
    handler: function(request, reply) {
		try{
             StudentModel.AddStudents(request,reply);     
		}catch(e){
			console.log(e)
		}
	    
    }
};



exports.editstudent = {
    handler:function(request,reply){
        try{
            var id= request.params.id;
            StudentModel.editstudent(reply,id);
        }catch(e){
             console.log(e);
        }
    }
}
exports.updatestudent = {
    handler:function(request,reply){
        try{
            StudentModel.UpdateStudents(request,reply); 
        }
        catch(e){
            
        }
    }
}