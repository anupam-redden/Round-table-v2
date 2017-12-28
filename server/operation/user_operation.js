module.exports=function(app,db){

   var usersOP={};
   const Op = db.Op;
   let jwt    = require('jsonwebtoken');
  
   usersOP.getUser=function(req,res){

         db.user.findAll({ 
                           where:{
                                   user_type:{$ne:1},
                                   user_status:{$ne:2}
                                 }
                        }).then(todo=>{
                      res.send(todo);
         });

   } 

   usersOP.getUserByEmail=function(req,res){
             var email=req.params.email 
             db.user.findAll({ 
                               where:{
                                       email:email
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

   usersOP.getUserByType=function(req,res){
    userType=req.params.userType
    db.user.findAll({
        where:{
            user_type:userType
        }
    }).then(todo=>{
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
                                    res.send(todos); 
                                 })
                
                    }) 
    }
    
    usersOP.deleteUser=function(req,res){
        id=req.params.id
        
        db.user.update(
                        {user_status:2},
                        {where:{id:id}}
                      ).then(todo=>{
                          res.send("1");   
                      })
    }

    usersOP.updateUser=function(req,res){
        var user_info=JSON.parse(req.body.emp_json)
       
        db.user.update(
                        {
                            fname:user_info.fname,
                            lname:user_info.lname,
                            email:user_info.email,
                            dob:user_info.dob,
                            address:user_info.address,
                            sex:user_info.sex,
                            phone_no:user_info.phone_no,
                            user_type:user_info.user_type
                        },
                        {where:{id:user_info.id}}
                      ).then(todo=>{
                          res.send("1");   
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
                  if(todo.length>0){
                      if(todo[0].user_status==1){
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
                       }
                       else if(todo[0].user_status==0){
                        res.send({auth:"0"}); 
                       }
                }
                else{
                    res.send({auth:"0"}); 
                }
                
             });

            
            
       } 


       usersOP.getFreeWorker=function(req,res){
                ids=req.body.ids
                ids=ids.split(",")
                db.user.findAll({ 
                                where:{
                                        user_type:{$ne:1},
                                        user_status:{$ne:2},
                                        id:{$notIn:ids}
                                        }
                            }).then(todo=>{
                            res.send(todo);
                });

       }   

   return usersOP;
}