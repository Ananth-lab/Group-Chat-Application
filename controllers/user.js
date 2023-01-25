const bcrypt = require("bcrypt");

const User = require("../models/user");

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
            return res.status(201).json({ message: "user account created", user })
        })
    }
    catch (error) {
        return res.status(504).json(error.message)
    }
}