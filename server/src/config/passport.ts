import passport from "passport";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User";

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GITHUB_CALLBACK_URL
) {
  throw new Error(
    "Github client ID, client secret, and callback URL must be provided"
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ githubId: profile.id }, (err, user) => {
        if (err) return cb(err);
        if (user) return cb(null, user);
        const newUser = new User({
          githubId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        newUser.save((err) => {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return cb(err);
        if (user) return cb(null, user);
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        newUser.save((err) => {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      });
    }
  )
);
