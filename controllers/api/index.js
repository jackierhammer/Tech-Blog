// this is where user, post, and comment routes will be added to the router

// the router
const router = require('express').Router();

// model routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// connects each set of routes to its api path
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// exports updated router
module.exports = router;