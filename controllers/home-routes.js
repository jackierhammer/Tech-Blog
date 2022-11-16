// this is where home routes will go

// imports router
const router = require("express").Router();

// imports models
const { Post, Comment, User } = require("../models");

// route for finding all posts for homepage
router.get("/", (req, res) => {
    // finds all posts and their associated users
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            // will uncomment when handlebars is created for this
            res.render("all-posts", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// route for finding a single post
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            // includes user who posted and comments and users who posted those
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                // will uncomment when handlebars is created for this
                res.render("single-post", { post });
            } else {
                // not found error
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// login route
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // will uncomment...handlebars...
    res.render("login");
});

// signup route
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // will uncomment...handlebars...
    res.render("signup");
});

// exports updated router
module.exports = router;