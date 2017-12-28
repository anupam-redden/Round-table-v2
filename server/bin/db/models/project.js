"use strict";
module.exports=(sequelize,DataTypes)=>{

    return sequelize.define("project",{

        id:{
               type:DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
           },
        name: DataTypes.STRING,   
        description:DataTypes.TEXT,
        url: DataTypes.STRING,
        status:{type:DataTypes.INTEGER,defaultValue:1,comment:"1 for active, 2 for closed, 3 for deleted"},
        bdm_id:DataTypes.INTEGER
    
    })


}