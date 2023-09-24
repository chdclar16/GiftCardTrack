const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware for handling CORS
app.use(cors());

// Middleware for parsing request body
app.use(express.json());


// Connecting into the DB
mongoose
    .connect(proccess.env.MONGODBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening in on ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })
