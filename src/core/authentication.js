const jwt = require('jsonwebtoken');

function getToken(_id, role) {
    return jwt.sign({
        _id: _id,
        role: role
    }, process.env.secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
}

 function verifyUser (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
        const token = req.headers.authorization.split(' ')[1] 
        jwt.verify(token, process.env.secret, function (err, decoded) {
            if (err) return res.status(401).json({error:'Failed to authenticate token.'});
            req.decoded = decoded;
            next();
        });
    }
    else return res.status(401).json({error:'No token provided.'}); 
}




module.exports = {getToken, verifyUser}