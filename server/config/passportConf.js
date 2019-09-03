const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const auth = require('./auth');
const { User } = require('../database/index');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: auth.googleAuth.clientID,
      clientSecret: auth.googleAuth.clientSecret,
      callbackURL: auth.googleAuth.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      User.findOne({
        where: {
          email,
        },
      }).then(user => {
        // eslint-disable-line
        if (user) {
          done(null, user);
        } else {
          return User.create({
            email,
          }).then(newUser => {
            done(null, newUser);
          });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: auth.fbAuth.clientID,
      clientSecret: auth.fbAuth.clientSecret,
      callbackURL: auth.fbAuth.callbackURL,
      profileFields: ['emails'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Profile', profile);
      console.log('AccessToken', accessToken);
      done(null);
    }
  )
);
