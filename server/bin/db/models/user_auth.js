"use strict";
module.exports=(sequelize,DataTypes)=>{

    return sequelize.define("user_auth",{

        id:{
               type:DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
           },
        password: DataTypes.STRING,   
        user_id:DataTypes.INTEGER


    })


}