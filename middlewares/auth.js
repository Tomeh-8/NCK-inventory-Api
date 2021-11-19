const jwt = require('jsonwebtoken');

//Authenticate user
const verifyToken = (req, res, next) => {
    const tokenField = req.headers.token;

   if (tokenField) {
       //extract token
       const token = tokenField.split(' ')[1]
        
       //validate token
       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        err && res.status(403).json({message:'Invalid token'});
        req.user = user;
        next();
       });
   } else {
       return res.status(401).json({message: 'You are not authenticated!'});
   }
};

   //Authorize user
const verifyUser = (req, res, next) => {
   verifyToken(req, res , () => {
    if (req.user.id === req.params.id || req.user.isAdmin) { 
        next();
   } else {
       return res.status(403).json({message: 'You are not allowed to do this!'});
   }
   });
};


//Authorize Admin
const verifyAdmin = (req, res, next) => {

    verifyToken(req, res , () => { 
     if (req.user.isAdmin) { 
         next();
    } else {
        return res.status(403).json({message: 'Only Admins are allowed to do this!'});
    }
    });
 };


module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
};