const bcrypt = require("bcrypt");

const User = require("../models/user");

const jwt = require("jsonwebtoken");


const generateAccessToken = (id) => {
   return jwt.sign({userid : id}, process.env.SECRET_AUTH_KEY)
}

exports.signIn = async (req, res, next) => {
    try {
        const userExists = await User.findOne({where : {email : req.body.email}});
        if(userExists) {
            throw new Error("user already exists")
        }
        const cycles = 10;
        bcrypt.hash(req.body.password, cycles, async (err, hash) => {
            const user = await User.create({
                name: req.body.username,
                phone: req.body.phonenumber,
                email: req.body.email,
                password: hash
            })
            return res.status(201).json({ message: "Signin successful! Please login", user })
        })
    }
    catch (error) {
        return res.status(504).json(error.message)
    }
}


exports.logIn = async (req, res, next) => {
    try {
        const user = await User.findAll({where : {email : req.body.email}})
        if(user.length > 0){
            bcrypt.compare(req.body.password,user[0].password,(err, result) => {
                if(result){
                    return res.status(201).json({message : "user login successful", success : "true", token : generateAccessToken(user[0].id)})
                }
                return res.status(401).json({message : "user is not authorized", success : "false"})
            })
        }
        else{
            return  res.status(404).json({message : "user not found", success : "false"})
        }
    }
    catch(error){
        return res.status(504).json({message : "something went wrong", success : "false"})
    }
}