const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');

const router = express.Router();


// Registration Route
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Hash the user's password
    bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
            console.error("Error hasing password:", error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }

        // Create a new user with the hashed password
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        });

        // Save the user to the database
        newUser
            .save()
            .then(savedUser => {
                console.log('User saved:', savedUser);
                res.status(201).json(savedUser);
            })
            .catch(error => {
                console.error('Error saving user: ', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    });
});

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error authenticating user:', err);
            return res.status(500).json({ error: 'Internal Server Error' })
        }

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        // If auth is successful, log the user in
        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error('Error loggin in user: ', loginErr);
                return res.status(500).json({ error: 'Internal Server Error' })
            }

            return res.status(200).json({ message: 'Login successful', user: user });
        });
    })(req, res, next);

    })

// Logout Route
router.get('/logout', (req, res) => {
    req.logOut();
    res.status(200).json({ message: 'Logout Successful' })
});


module.exports = router;
