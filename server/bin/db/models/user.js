"use strict";
module.exports =function(sequelize, DataTypes) {


    return sequelize.define('user', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
		email:DataTypes.STRING,
        phone_no:DataTypes.STRING,
        user_type:DataTypes.INTEGER,
		online:{type:DataTypes.BOOLEAN,defaultValue:false},
		last_login:{ type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		last_logout: DataTypes.DATE,
		profile_pic: DataTypes.STRING,
        sex: DataTypes.STRING,
        dob:DataTypes.DATE,
        address:DataTypes.STRING(500)
    }, {
        timestamps: false,
        underscored: true
    });
}


