const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.authenticate = (req,res, next) => {
    try {
        const token = req.header("Authorization");
        const user = jwt.verify(token, process.env.SECRET_AUTH_KEY);
        User.findOne({where : {id : user.userid}})
        .then(user => {
            req.user = user;
            next()
        })
        .catch(err => {
            throw new Error(err)
        })
    }
    catch(error){
        return res.status(401).json({message : "User is not authorized", success : false})
    }
}