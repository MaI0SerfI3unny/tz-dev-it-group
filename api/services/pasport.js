const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.find({ 
            email: payload.email 
        })
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (e) {
        return done(e, false)
      }
    }
  )
)

const withAuth = passport.authenticate('jwt', { session: false })

module.exports = { withAuth, passport }