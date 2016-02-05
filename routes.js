var Student = require('./controllers/student');

exports.endpoints = [
   //	{ method: 'GET',   path: '/{params*}',  config: Student.liststudents },
	{ method: 'POST',  path: '/liststudents',  config: Student.liststudents },
    { method: 'POST',   path: '/delete/{id}' , config: Student.del },
];