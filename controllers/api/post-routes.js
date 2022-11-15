// this is where post routes will go

// imports router
const router = require('express').Router();
// imports post model
const { Post } = require('../../models');
// imports withAuth helper
const withAuth = require('../../utils/auth');

// route for creating new posts
router.post('/', withAuth, (req, res) => {
    // sample request
    // title and body are both required
    // {
    //     "title": "Sample Title",
    //     "body": "This is my post body."
    // }
    Post.create({
        title: req.body.title,
        // calling two things body may become a problem
        body: req.body.body,
        user_id: req.session.user_id
    })
        // saves post data
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            res.status(500).json(err);
        });
});

// route for updating posts
router.put('/:id', withAuth, (req, res) => {
    // sample request
    // title and body are both required
    // {
    //     "title": "Sample Title",
    //     "body": "This is my post body."
    // }
    Post.update({
        title: req.body.title,
        content: req.body.content
        // we don't need user_id because post is already connected to user
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        // can't edit a post that doesn't exist
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // saves data
        res.json(dbPostData);
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

// route for deleting posts
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        // can't delete a post that doesn't exist
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // saves data
        res.json(dbPostData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// exports updated router
module.exports = router;