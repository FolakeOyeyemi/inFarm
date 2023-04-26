const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
          pool.query('INSERT INTO users (googleId, username, photo, email) VALUES (?, ?, ?, ?)', [profile.id, profile.displayName, profile._json.picture, profile.email], async (err, results) => {
            if (err) throw err;
            const user = {
              id: results.insertId,
              googleId: profile.id,
              username: profile.displayName,
              photo: profile._json.picture,
              email: profile.email
            };
            console.log(`new user created ${user}`);
            done(null, user);
          });
        }
      });
    }
  )
);
