module.exports=function(app,db){

   var usersOP={};
   let jwt    = require('jsonwebtoken');
  
   usersOP.getUser=function(req,res){

         db.user.findAll({ 
                           where:{
                                   user_type:{$ne:1}
                                 }
                        }).then(todo=>{
                      res.send(todo);
         });

   } 

   usersOP.getUserType=function(req,res){
        db.usertype.findAll().then(todo=>{
            res.send(todo);
        });
   } 

    usersOP.saveUser=function(req,res){
    var user_info=JSON.parse(req.body.emp_json)
    
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update(user_info.password);
    user_info.password = shasum.digest('hex');
    var dob=user_info.dob;
    user_info.dob=dob.split('/')[2]+"-"+dob.split('/')[1]+"-"+dob.split('/')[0];
    db.user.create(user_info) 
           .then(function(todos){
                        
                     var user_id=todos.dataValues.id
                     var idata={password:user_info.password,user_id:user_id}
                     db.user_auth.create(idata)
                                 .then(function(response){
                                    res.send(response); 
                                 })
                
                    }) 
} 
   
   usersOP.authenticate=function(req,res){
             
             var email=req.body.email;
             var pass=req.body.password;
             var crypto = require('crypto');
             var shasum = crypto.createHash('sha1');
             shasum.update(pass);
             var password = shasum.digest('hex');
             db.user.findAll({
                 where:{
                     email:email
                 }

             }).then(todo=>{
                
                    db.user_auth.count({
                        where:{
                            password:password,
                            id:todo[0].id
                        }
                    }).then(data=>{
                        if(data==1){
                            let token = jwt.sign({id:todo[0].id}, "234sdfsdfAw@#234", {
                                expiresIn: Math.floor(Date.now() / 1000)  // expires in 24 hour
                            });
                            res.send({user:todo[0],token:token,auth:"1"});
                       }
                       else{
                        res.send({auth:"0"});
                       }
                       
                    })
                
             });

            
            
       } 

   return usersOP;
}