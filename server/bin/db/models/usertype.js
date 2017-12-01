"use strict";
module.exports =function(sequelize, DataTypes) {


    return sequelize.define('usertype', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: DataTypes.STRING,
        
    }, {
        timestamps: false,
        underscored: true
    });
}
