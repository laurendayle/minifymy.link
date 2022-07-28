const JWT = require('passport-jwt');
const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;
const Session = require('../models/Session');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  },
  (jwtPayload, callback) => {

  }))