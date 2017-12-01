var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    console.log(req.headers['authorization'])
  var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, "234sdfsdfAw@#234", function(err, decoded) {
            if (err) { //failed verification.
                return res.send({"auth": false});
                         
                      
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        
        return res.status(403).send({
            "error": true
        });
    }
}