const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/errorHandler');

router.post("/signup", async (req, res) => {
    try {

        const candidate = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });

        if (candidate) {
            if (candidate.email === req.body.email) {
                return res.status(409).json({
                    message: 'Email already exist, please signIn'
                })
            } else {
                return res.status(409).json({
                    message: 'This name already exist, please choose another one.'
                })
            }
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            await newUser.save();
            res.status(201).json({
                message: 'You are succsesfully registered!',
                newUser
            });
        }
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});

router.post("/signin", async (req, res) => {
    console.log(req.body.password);

    try {
        const candidate = await User.findOne({ username: req.body.username});
        if (candidate) {
            const isValidPassword = bcrypt.compareSync(req.body.password, candidate.password);
    
            if (isValidPassword) {
                const token = jwt.sign({
                    name: candidate.name,
                    userId: candidate._id,
                }, process.env.JWT_KEY, {expiresIn: 3600 * 24 * 3});
    
                return res.status(200).json({
                    message: 'You are succesfully logged in',
                    token: `Bearer ${token}`,
                    name: candidate.username,
                    id: candidate._id,
                })
    
            } else {
                return res.status(404).json({
                    message: 'Password is incorrect, try again',
                })
            }
        } else {
            return (
                res.status(404).json({
                    message: 'User was not found, please register',
                })
            )
        }

    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});





module.exports = router;