var StudentModel = require('../model/studentModel');
exports.liststudents = {
    handler: function(request, reply) {
		try{
            StudentModel.ListStudents(reply);
		}catch(e){
			console.log(e)
		}
	    
    }
};