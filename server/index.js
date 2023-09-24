const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserSchema'); // Replace with your User model
require('dotenv').config();

const app = express();

// Configure session Middleware
app.use(session({
    secret: process.env.PASSKEY,
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure the local authentication strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for handling CORS
app.use(cors());

// Middleware for parsing request body
app.use(express.json());

// Importing route handlers
const authRoutes = require('./routes/authRoutes'); // Pass passport here
app.use('/auth', authRoutes);

// Connecting into the DB
mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
