var user_operation=require("./operation/user_operation");
var project_operation=require('./operation/project_operation');
module.exports=function(appObj,db){
	const router=appObj.app
	var userOP=user_operation(router,db);
	var projectOP=project_operation(router,db);
	const express =appObj.express;
	let verifyToken=require('./middleware/verify_token');
    var cors = require('cors')
  //const router = express.Router();
  
	/* GET api listing. */
	router.use(function(req, res, next) {
		//cors();
		res.header('Access-Control-Allow-Origin', '*');
		      
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization,X-Custom-Header,x-access-token');
		res.header('Access-Control-Allow-Credentials', true);
		
		next();
	});

	router.get('/api/*',verifyToken);
	router.post('/api/*',verifyToken);
	
	router.get("/api/users",userOP.getUser);
	
	router.post("/authenticate",userOP.authenticate);
	router.get("/usersType",userOP.getUserType);
	router.post("/api/saveUser",userOP.saveUser);
	router.post("/api/updateUser",userOP.updateUser);
	router.get("/getUserByEmail/:email",userOP.getUserByEmail);
	router.get("/api/delete-user/:id",userOP.deleteUser);
	router.get("/api/get-user-by-type/:userType",userOP.getUserByType);
	router.post("/api/get-free-worker",userOP.getFreeWorker);

	router.get("/api/projects",projectOP.getAllProject);
	router.post("/api/saveprojects",projectOP.saveProject);
	router.post("/api/updateprojects",projectOP.updateProject);
	router.get("/api/delete-project/:id",projectOP.deleteProject);
	router.get("/api/get-developer/:project_id",projectOP.getDevelopers);
	router.post("/api/assign-to-project",projectOP.assignToProject);
	router.get("/api/remove-from-project/:user_id/:project_id",projectOP.deleteProjectWorker);
	
	
	
	
	
	

	
}