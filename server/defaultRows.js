"use strict";
module.exports=function(db) {


    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update('12345678');
	var password = shasum.digest('hex');
	
	
    db.usertype.bulkCreate([
    	 	{type:'Admin'},
    	 	{type:'Developer'},
			{type:'BDM'},
			{type:'Project Manager'},
			{type:'HTML Coder'},
			{type:'Layout Designer'},
			{type:'Client'}
    	
    ]).then(function (data) {
    	
    	    db.user_status.bulkCreate([
    	                               {userstatus:'Active'},
    	                               {userstatus:'Pending'},
    	                               {userstatus:'Blocked'},
    	                               {userstatus:'Deleted'}])
    	                  .then(function(todo){
    	    	
						    	    	 db.user.create({

											        fname: 'Admin',
											        lname: 'admin',
											        email: 'admin@g.com',
											        
											        phone_no: '12345678952',
											        user_status_id:1,
											        user_type_id: '1'

									    }).then(function (data) {
                                           db.user_auth.create({
											   password: password,
											   user_id:1	
										   })
											
									    }, function (data) {
									        console.log(data)
									    })
    	    })
    	   
    	   
    	   	
    	   	
    	      
    	      
    	
    	
    })
    
}