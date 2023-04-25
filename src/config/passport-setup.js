const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    done(null, results[0]);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(
        { googleid: profile.id },
        { profileName: profile.displayName },
        { picture: profile._json.picture },
        { email: profile.emails[0].value }
      );

      pool.query('SELECT * FROM users WHERE googleId = ?', [profile.id], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          console.log("Current user is ", results[0]);
          done(null, results[0]);
        } else {
          pool.query('INSERT INTO users (googleId, username, photo) VALUES (?, ?, ?)', [profile.id, profile.displayName, profile._json.picture], async (err, results) => {
            if (err) throw err;
            const user = {
              id: results.insertId,
              googleId: profile.id,
              username: profile.displayName,
              photo: profile._json.picture,
            };
            console.log(`new user created ${user}`);
            done(null, user);
          });
        }
      });
    }
  )
);
