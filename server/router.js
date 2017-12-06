var user_operation=require("./operation/user_operation");
module.exports=function(appObj,db){
	const router=appObj.app
	var userOP=user_operation(router,db);
	const express =appObj.express;
	let verifyToken=require('./middleware/verify_token');
    var cors = require('cors')
  //const router = express.Router();
  
	/* GET api listing. */
	router.use(function(req, res, next) {
		//cors();
		res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
		      
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

	
}