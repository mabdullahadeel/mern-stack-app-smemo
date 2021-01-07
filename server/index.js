import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';
//  Initializing the express app
const app = express();

// Setting up the body-parser to send and receive data from frontend
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Setting up the cors to send and receive data from frontend
app.use(cors())

// URLS ROUTING (initialize this after the "cors" to avoid CORS issues while requesting from the frontend)
app.use('/posts', postRoutes)

// Getting environment variables
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

// Always Available path for server checking
app.get('/', (req, res) => {
    res.send("Hello from SMEMO API.....Everything Running Smoothly.......")
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })).catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);