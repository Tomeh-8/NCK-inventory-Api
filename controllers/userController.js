const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const joi = require('joi');
const authSchema = require('../validation/auth');

const userController = {
    register: async (req , res) => {
       const {firstName, lastName, email, password} = req.body;
      
       try {
          //validate user email and password
             const validate = await authSchema.validateAsync({email, password});
             validate.error  && res.status(422).json({success: 0 , msg: validate.error.details[0].message});

           //Check for existing user
           const user = await User.findOne({email});      
           user && res.status(400).json(`User with this email already exist!`);
           
           //Hash password
           const salt = await bcrypt.genSalt(12);
           const hashPassword = await bcrypt.hash(password , salt);

           //Create user
           const newUser = await User.create({firstName, lastName, email, password: hashPassword});
           res.status(201).json(newUser);

       } catch (err) {
          res.status(500).json({err, message: 'Something went wrong!'});
          console.log(err);
       }
     
    },

    login: async (req , res) => {
        const {email , password} = req.body;

        try {

            //Check for existing user
            const user = await User.findOne({email});
            !user && res.status(400).json({message: 'User not found!'});  
             
            //Validate password
            const isValidPassword =  await bcrypt.compare(password , user.password);
            !isValidPassword  && res.status(401).json({message: 'wrong credentials!'});

            //Generate accessToken
            const accessToken = jwt.sign({id: user._id , isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '2h' });
            res.status(200).json({user , accessToken});

        } catch (err) {
           res.status(500).json({err, message: 'Something went wrong!'});  
        }
    },

    admin: async (req , res) => {
        const {email , password} = req.body;

        try {
             
            //Check for existing user
            const user = await User.findOne({email});
            !user && res.status(400).json({message: 'User not found!'});
             
            //Admin password Validation
            isAdminPassword = password === process.env.ADMIN_SECRET;
            !isAdminPassword  && res.status(401).json({message: 'wrong admin credentials!'});
            
            //Update a user an admin
            user.isAdmin = true;
            const newAdmin = await user.save();
            res.status(200).json({newAdmin});

        } catch (err) {
           res.status(500).json({err, message: 'Something went wrong!'});  
        }
    }
}

module.exports = userController;