"use strict";
var db=require('../connection.js')
var DataTypes = require("sequelize");

// load models
var models = [
     'user','usertype','user_auth','user_status','project','assigned_developer'
];


models.forEach(function(model) {

    module.exports[model] = db.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    
	
    m.user.belongsTo(m.usertype,{foreignKey:'user_type'}),
    m.user_auth.belongsTo(m.user,{foreignKey:'user_id'});
    m.project.belongsTo(m.user,{foreignKey:'bdm_id'}),
    m.assigned_developer.belongsTo(m.project,{foreignKey:'project_id'}),
    m.project.hasMany(m.assigned_developer,{foreignKey:'project_id'}),
    m.assigned_developer.belongsTo(m.user,{foreignKey:'user_id'})
 
	
})(module.exports);






// export connection
module.exports.db = db;