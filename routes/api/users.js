const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// %TODO:
// [ ] study async-await


// https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User'); // import model

// @route   POST api/users
// @desc    Register user
// @access   Public
router.post('/', [
    // Set validators
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more chars').isLength({ min: 6})
], 
async (req, res) => {
    //console.log(req.body); 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //bad request
    }

    const { name, email, password } = req.body; //destructure for convenience

    try { 
        // Check if user exists
        //let user = await User.findOne({ email: email }); 
        let user = await User.findOne({ email }); 

        // If exists, return error
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] }); // match array format in 400 above
        }
        // If not, get user's gravatar based on email
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm' // default image
        });

        // Create new user instance (doesn't save)
        user = new User({
            name, 
            email, 
            avatar, 
            password
        });

        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return json web token (to login in user right away on the frontend)
        // see: jwt.io,  https://github.com/auth0/node-jsonwebtoken
        const payload = {
            user: {
                id: user.id // 'id' is a mongoose abstraction
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            }
        );

        //res.send('User registered');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;
