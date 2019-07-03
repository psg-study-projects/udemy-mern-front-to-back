const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @acess   Private
router.get('/me', auth, async (req, res) => {
    try {
        // key 'user' corresponds to FK in Profile Schema
        // 'populate' with name & avatar of user from User model
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']); 

        if ( !profile ) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        } 

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
