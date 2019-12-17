const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateAuthToken = async function(userEmail){
    const token = await jwt.sign({ _email: userEmail } , process.env.JWT_SECRET)

    return token
}

const getHashPassword = async function(password){
    password = await bcrypt.hash(password, 8)

    return password
}


module.exports = {
    generateAuthToken,
    getHashPassword
}