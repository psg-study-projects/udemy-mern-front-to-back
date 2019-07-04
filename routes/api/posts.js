const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

// models
const Post    = require('../../models/Post');
const Profile = require('../../models/Profile');
const User    = require('../../models/User');


// @route   POST api/posts
// @desc    Create (Add) a post
// @access   Private
router.post('/', [ 
    auth, [ 
        check('text', 'Text is required').not().isEmpty()
    ] 
], 
async (req, res) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id // %can we take this from user?
        });
        const post = await newPost.save();
        res.json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {

    try {
        const posts = await Post.find().sort({ date: -1 }); // -1 is more recent first
        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        //const post = await Post.findOne({ _id: req.params.id });
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch(err) {
        console.error(err.message);
        if ( err.kind === 'ObjectId' ) {
            // Deal with id that isn't a valid object id
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        //await Post.findOneAndRemove({ _id: req.params.id });
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Ensure user owns the post
        // NOTE: req.user.id is a string %TODO %STUDYME
        if ( post.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post deleted' });

    } catch(err) {
        console.error(err.message);
        if ( err.kind === 'ObjectId' ) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if post has already been liked by this user %TODO %STUDYME
        if ( post.likes.filter( like => like.user.toString() === req.user.id ).length > 0 ) {
            return res.status(400).json({ msg: 'Post already liked by user' });
        }
        post.likes.unshift({ user: req.user.id }); // add logged-in user's id (from middleware)
        await post.save();

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if post has already been liked by this user %TODO %STUDYME
        if ( post.likes.filter( like => like.user.toString() === req.user.id ).length === 0 ) {
            return res.status(400).json({ msg: 'Post has not yet been liked liked by user' });
        }

        // Get index for the like to remove %TODO %STUDYME
        const removeIndex = post.likes.map( like => {
            return like.user.toString();
        }).indexOf(req.user.id);
        if (removeIndex >= 0) {
            post.likes.splice(removeIndex,1);
            await post.save();
        } else {
            console.error('Illegal index '+removeIndex);
        }

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/posts/:id/comments
// @desc     Comment on a post
// @access   Private
router.post('/:id/comment', [ 
    auth, [ 
        check('text', 'Text is required').not().isEmpty()
    ] 
], 
async (req, res) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id); // post id from URL
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/posts/:id/comments/:comment_id
// @desc     Delete comment on a post
// @access   Private
router.delete('/:id/comment/:comment_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id); // post id from URL

        // Pull out comment %TODO %STUDYME
        const comment = post.comments.find( comment => comment.id===req.params.comment_id ); // returns the comment, or false if not found
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        // Check ownership
        if ( comment.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Get index to remove...
        const removeIndex = post.comments.map( comment => {
            return comment.id.toString();
        }).indexOf(req.params.comment_id);
        if (removeIndex >= 0) {
            post.comments.splice(removeIndex, 1);
            await post.save();
        } else {
            console.error('Illegal index '+removeIndex);
        }

        res.json(post.comments);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
