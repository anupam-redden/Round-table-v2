module.exports=function(app,db){

    var projectOP={};

    projectOP.getAllProject=function(req,res){
        db.project.findAll({
               where:{
                        status:1
                    }
        }).then(todo=>{
            res.send(todo)
        })
    }


    projectOP.saveProject=function(req,res){
       
        var proj_info=req.body.project_json
        db.project.create(proj_info)
                  .then(todo=>{
                       res.send(todo)
                  })
    }

    projectOP.updateProject=function(req,res){
       
        var proj_info=req.body.project_json
        db.project.update(proj_info,{where:{id:proj_info.id}})
                  .then(todo=>{
                       res.send(todo)
                  })
    }

    projectOP.deleteProject=function(req,res){
        var id=req.params.id;
        db.project.update({status:3},{where:{id:id}}).then(todo=>{res.send(todo)})
    }

    projectOP.getDevelopers=function(req,res){
        var project_id=req.params.project_id
        db.assigned_developer.findAll(
                                        {
                                            include:{
                                                model:db.user,
                                                include:{
                                                    model:db.usertype
                                                }
                                            }
                                        
                                        },
                                          {where:{project_id:project_id}}
                                     )
                             .then(todo=>{
                                 
                                 res.send(todo)
                             })
    }

    projectOP.assignToProject=function(req,res){
        var assign_info=req.body.assign_info
        
        db.assigned_developer.create(assign_info)
                             .then(todo=>{
                                  res.send(todo)
                              })

    }

    projectOP.deleteProjectWorker=function(req,res){
        var user_id=req.params.user_id;
        var project_id=req.params.project_id;

        db.assigned_developer.destroy({where:{user_id:user_id,project_id:project_id}})
        .then(todo=>{
            res.send('1')
         })
    }

    
    return projectOP;
}