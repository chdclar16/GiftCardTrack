const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

// Middleware for handling CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Middleware for parsing request body
app.use(express.json());

// Middleware for cokkie parser
app.use(cookieParser());
app.use(express.urlencoded(({extended: false})))

// Importing route handlers
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const cardRoutes = require('./routes/cardRoutes');
app.use('/card', cardRoutes)


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
