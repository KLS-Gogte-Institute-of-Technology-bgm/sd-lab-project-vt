const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const middleware = require('./isLoggedIn');
const jwtSecret = "pigoauto";

// @route POST api/user/register
// @desc Add new user
// @access Public

router.post('/register', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).json({msg: 'Please enter all fields'})
    }
    Admin.findOne({username: username})
        .then(user => {
            if(user) res.status(400).json({msg:'User already exists'})
            const newAdmin = new Admin({
                username: username,
                password: password,
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if(err) throw err;
                    newAdmin.password = hash
                    newAdmin.save()
                        .then(async(user) => {
                            jwt.sign(
                                {id: user.id},
                                jwtSecret,
                                {expiresIn: 36000},
                                (err, token) => {
                                    if(err) throw err
                                    res.status(200).json({success: true, msg: 'User created successfully', user: {username: user.username}, token})
                                }
                            )
                        })
                })
            })
        })
        .catch(e => {
            console.log(e)
        })
})

// @route POST api/user/login
// @desc Login user and create token
// @access Public

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(200).json({msg: 'Please enter all fields'})
    }
    Admin.findOne({username: username})
        .then(user => {
            if(user==null) res.status(200).json({msg:'User not found, please sign up'})
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) res.status(200).json({msg: 'Incorrect password!'})
                    jwt.sign(
                        {id: user.id},
                        jwtSecret,
                        {expiresIn: 36000},
                        (err, token) => {
                            if(err) throw err
                            res.status(200).json({msg: 'Logged in successfully!', user: {username: user.username}, token})
                        }
                    )
                })
        })
})

// @route GET api/user
// @desc Get user data
// @access Private
router.get('/', middleware.isLoggedIn, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

module.exports = router