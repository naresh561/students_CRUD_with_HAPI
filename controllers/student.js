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
exports.del = {
    handler: function(request, reply) {
              const i =  encodeURIComponent(request.params.id);
		try {            
            StudentModel.DeleteStudent(reply , i);
		} catch(e){
			console.log(e);
		}
	    
    }
};