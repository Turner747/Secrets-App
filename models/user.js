const connection = require("../mongoose");
const Secret = require("./secret");
const passport = require("passport");
const LocalStrategy = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new connection.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    secrets: [Secret.schema],
    googleId: String,
    facebookId: String,
    profilePicture: String
});

userSchema.plugin(LocalStrategy);
userSchema.plugin(findOrCreate);

const User = connection.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},(accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({ username: profile.emails[0].value }, function (err, user) {
        if(!user.name) {
            user.name = profile.displayName;
        }
        user.googleId = profile.id;

        if(!user.profilePicture) {
            user.profilePicture = profile.photos[0].value;
        }

        user.save((err, user) => {
            return cb(err, user);
        });
    });

}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'photos']
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.emails[0].value }, function (err, user) {
        if(!user.name) {
            user.name = profile.displayName;
        }
        user.facebookId = profile.id;

        if(!user.profilePicture) {
            user.profilePicture = profile.photos[0].value;
        }

        user.save((err, user) => {
            return cb(err, user);
        });
    });
}
));

module.exports = User;