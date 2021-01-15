import User from '../models/users.js';
import passport from 'passport';
import bcryptjs from 'bcryptjs';


export const login = (req, res, next) => {
    console.log("Login");
    // Session Authentication
    passport.authenticate("local", (user, err, info) => {
        if (err) console.log(err);
        if (!user) {
            console.log("No User")
            return res.send("No User Existed")
        }
        else {
            req.logIn(user, (err) => {
                if (err) console.log("error", err);
                res.status(200).json({ username: user.username })
            })
        }
    })(req, res, next)
};

export const register = async (req, res) => {
    console.log("register");
    try {
        await User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) {
                console.log("Username already exist");
                res.status(208).json({ message: "username already taken." })
                return
            }

            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(200).json({ message: "User Created" })
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = (req, res) => {
    console.log("getUser");
    if (req.isAuthenticated()) {
        res.send(req.user)
    } else {
        res.status(401).json({ message: "Not Loggen In" })
    }
};
