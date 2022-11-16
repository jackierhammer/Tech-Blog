// this is where dashboard routes will go

// imports router
const router = require("express").Router();
// imports post model
// we don't use the other models, so no need to import
const { Post } = require("../models");
// imports withAuth helper function
const withAuth = require("../utils/auth");

// route for a user seeing all of their own posts (admin)
router.get("/", withAuth, (req, res) => {
    // console.log("dashboard");
    Post.findAll({
        // this is how we find only the user's posts
        where: {
            userId: req.session.userId
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            // commented out because no handlebars yet
            res.render("all-posts-admin", {
                layout: "dashboard",
                posts
            });
        })
        .catch((err) => {
            // redirects the user to login page 
            // handlebars blah blah blah
            res.redirect("login");
        });
});

// route for new post form
router.get("/new", withAuth, (req, res) => {
    // renders the new post template
    res.render("new-post", {
        layout: "dashboard"
    });
});

// route for edit post form
router.get("/edit/:id", withAuth, (req, res) => {
    // find by primary key
    Post.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                // something something handlebars
                res.render("edit-post", {
                    layout: "dashboard",
                    post
                });
            } else {
                // post not found error
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// exports updated router
module.exports = router;