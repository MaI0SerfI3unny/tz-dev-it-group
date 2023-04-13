const router = require('express-promise-router')()
const { loginUser } = require("../controller/UserController")

router.post("/user/login", loginUser)

module.exports = router