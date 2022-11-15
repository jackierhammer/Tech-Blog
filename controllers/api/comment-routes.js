// this is where comment routes will go

// imports router
const router = require('express').Router();
// imports comment model
const { Comment } = require('../../models');
// imports withAuth helper function
const withAuth = require('../../utils/auth');

// in this file, we only need functionality for posting new comments
// since comments are associated with posts, deleting a post is enough

router.post('/', withAuth, (req, res) => {
    // sample request
    // {
    //     "content": "This is my comment content."
    // }
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
    })
        // saves data
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            res.status(500).json(err);
        })
});

// exports updated router
module.exports = router;