const jwt = require('jsonwebtoken')

const signToken = (user) => {
  return jwt.sign(
    {
      email: user,
      start: new Date().getTime()
    },
    process.env.JWT_SECRET
  )
}
module.exports = signToken