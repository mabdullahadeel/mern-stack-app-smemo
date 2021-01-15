import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// Session Authentication
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportlocal from 'passport-local';
import postRoutes from './routes/post.js';
import userRouter from './routes/userAuth.js';
import passport from 'passport';
import mongo_connect from 'connect-mongo';
import is_authenticated from './auth/passportConfig.js';

// Getting environment variables
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

//  Initializing the express app
const app = express();

// Setting up the body-parser to send and receive data from frontend
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Local Passport Strategy init
passportlocal.Strategy;

// Setting up the cors to send and receive data from frontend
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Setting Up the table for session storage in DB
const MongoStore = mongo_connect(session);

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.createConnection(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

// Setting up the session
app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    // }
}));

// Setting up the cookie parser
app.use(cookieParser("secretcode"));
// Session Authentication Using Passport
app.use(passport.initialize());
app.use(passport.session());
is_authenticated(passport);

// ROUTES
// Always Available path for server checking
app.get('/', (req, res) => {
    res.send("Hello from SMEMO API.....Everything Running Smoothly.......")
});

// URLS ROUTING (initialize this after the "cors" to avoid CORS issues while requesting from the frontend)
app.use('/posts', postRoutes)
app.use('/user', userRouter)


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })).catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);