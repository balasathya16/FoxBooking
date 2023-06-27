const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// Configure Google strategy
// Configure Google strategy
passport.use(
    new GoogleStrategy(
      {
        clientID: '160214083248-lh01pgd4bct49jpp9kpklfdi9a7cvgdj.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Handle Google sign-up logic
        // Call done() with user data or error
      }
    )
  );
  

// Configure Facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle Facebook sign-up logic
      // Call done() with user data or error
    }
  )
);

// Configure local strategy for email sign-up
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      // Handle email sign-up logic
      // Call done() with user data or error
    }
  )
);
