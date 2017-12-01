"use strict";
var Sequelize = require("sequelize");
var appObj=require("../app");
var app=appObj.app
var fs = require('fs');
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var dbConfigFile = __dirname + '/db-config.json'

var data=fs.readFileSync(dbConfigFile,'utf8')
var dbConfig=JSON.parse(data)[env]
var password = dbConfig.password ? dbConfig.password : null;
var port=dbConfig.port ? dbConfig.port : 3306;
const mysql=require('mysql');

var connection = new Sequelize(dbConfig.database, dbConfig.user, password,
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
                
                port:port,
                max: 5,
                min: 0,
                idle: 10000
               
    }
    });
connection.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}, function (err) {
    console.log('Unable to connect to the database:', err);
});
module.exports=connection