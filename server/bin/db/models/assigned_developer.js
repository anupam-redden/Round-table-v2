"use strict";
module.exports=(sequelize,DataTypes)=>{

    return sequelize.define("assigned_developer",{

        id:{
               type:DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
           },
        user_id: DataTypes.INTEGER,   
        start_date:DataTypes.DATE,
        project_id:DataTypes.INTEGER
        


    })


}