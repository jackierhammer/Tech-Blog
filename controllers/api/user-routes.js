// this is where user routes will go

// imports router
const router = require("express").Router();
// imports User model
const { User } = require("../../models");

// route for creating new users
router.post("/", (req, res) => {
    // example request
    // {
    //     "username": "samplename",
    //     "email": "sample@email.com",
    //     "password": "password"
    // }
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                // saves the data
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for logging in 
router.post("/login", (req, res) => {
    // finds user by their username
    // sample request
    // note that email isn't needed to login
    // {
    //     "username": "samplename",
    //     "password": "password"
    // }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        // if the usename doesn't match existing data, login cannot occur
        if (!dbUserData) {
            res.status(400).json({ message: 'No user was found with these credentials' });
            return;
        }
        // checks if the password matches the data on file
        const correctPw = dbUserData.checkPassword(req.body.password);
        // if the password is wrong, login will not occur
        // for security, the user is only told that their credentials are wrong, not which credentials
        if (!correctPw) {
            res.status(400).json({ message: 'No user was found with these credentials' });
            return;
        }
        // saves login status/data
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            // saves data
            res.json({ user: dbUserData, message: 'You are now logged in' });
        });
    });
});

// route for logging out
router.post('/logout', (req, res) => {
    // makes sure user is logged in in the first place
    if (req.session.loggedIn) {
        // ends session
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// exports updated router
module.exports = router;