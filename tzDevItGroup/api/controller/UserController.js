const Users = require("../models/User")
const signToken = require('../helper/signToken')
const bcrypt = require('bcryptjs')

const loginUser = async(req,res) => {
    const { email, password } = req.body
    if(!email || !password)
    {
        return res
            .status(401)
            .json({ status: 401, message: "No required params" })   
    }
    const findUser = await Users.findOne({ email })
    if (!findUser) {
        return res
            .status(404)
            .json({ status: 404, message: 'User not exist' })
    }
    const isMatch = await bcrypt.compare(password, findUser.password)
    if (!isMatch) {
        return res
            .status(404)
            .json({ status: 404, message: 'User not exist' })
    }

    const token = signToken(email)
    res.status(200).json({
        status: 200,
        message: 'Login was successfully',
        data: token,
      })
}

module.exports = { 
    loginUser
}