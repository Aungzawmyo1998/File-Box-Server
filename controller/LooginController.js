const bcrypt = require("bcryptjs"); //to hash password
const jwt = require("jsonwebtoken"); // jsonwebtoken

const userDB = require("../models").User;
const { generateAccessToken, generateRefreshToken } = require("../utils/token_generator");
const { where } = require("sequelize");

const Login = async (req, res) => {
    // res.json("Login");
    const {email, password} = req.body;
    await userDB.findOne({where: {email: email}})
                .then((user)=>{

                    //user is null
                    if( !user ) {
                        return res.status(401).json({ message: "User Not Found "});
                    }

                    // compare password 
                    const validPassword = bcrypt.compareSync(password, user.password );

                    // user password is not valid
                    if( !validPassword ) {
                        return res.status(401).json({ message: "Invalid Password "});
                    }
                    
                    // create tokens 
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);

                    // update tokens in tokenFields
                    userDB.update(
                        {
                            accesstoken: accessToken,
                            refreshtoken: refreshToken,
                        },
                        {where: {email: email }}
                    );

                    return res.json(
                        {
                            "accessToken": accessToken,
                            "refreshToken": refreshToken,
                            "role": user.role
                        }
                    )


                })
}

const Register = async (req, res) => {
    
    await userDB.findOne({where: { email: req.body.email }})
                .then( (users) => {
                    if( users != null ) {
                        return res.status(400).json({ message: "User is already existing "});
                    }
                    userDB.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        role: req.body.role,
                        status: "active",
                        accesstoken: "",
                        refreshtoken: ""
                    });
                    return res.status(201).json({ message: "User Create Successful "});

                }).catch( error => {
                    res.status(500).json(error);
                })
}


module.exports = {
    Login,
    Register
}