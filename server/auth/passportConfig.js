import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import localStrategy from 'passport-local';

const LStrategy = localStrategy.Strategy;

export default function (passport) {
    passport.use(
        new LStrategy((username, password, done) => {
            User.findOne({ username: username })
                .then((err, user) => {
                    if (err) return done(err);
                    if (user) return done(null, false);

                    // if there is a User
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) done(err);
                        if (result === true) {
                            return done(null, user)
                        } else {
                            return done(null, false);
                        };
                    })
                }).catch((err) => {
                    done(err)
                })
        }));

    // Passport need serialized or deserialized data to compare
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username,
            };

            cb(err, userInformation);
        });
    });
}