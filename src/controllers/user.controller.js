const redis = require('redis')
const bcrypt = require('bcryptjs')
const { ObjectID }= require('mongodb')
const UserService = require('../services/user.service')
const auth = require('../middleware/auth')

const client  = redis.createClient()

const createUser = async function(req, res, next){
    const user = req.body
    const userID = new ObjectID().toString()
    
    const token = await UserService.generateAuthToken(user.email)
    user.token = token

    const hashPassword = await UserService.getHashPassword(user.password)
    user.password = hashPassword

    await client.hgetall(user.email, function(err, data) {
        if(!data) {
            client.hmset(user.email, [
                        'id', userID,
                        'name', user.name,
                        'email', user.email,
                        'password', user.password,
                        'token', user.token
                    ], function(err, reply){
                        if(err){
                        console.log(err);
                        }
                        res.status(201).send({ user, token })
                        console.log(reply);
                    });
        } else {
            res.status(400).send({
                error : 'Unable to create, email exists!'
            })
            console.log('Unable to create, email exists!')
        }
    })
}

const loginUser = async function(req, res, next){
    const email = req.body.email
    const password = req.body.password

    await client.hgetall(email, async function(err, data) {
        if(!data) {
           res.status(400).send({
               error : 'Unable to login!'
           })
        } else {
            const isMatch = await bcrypt.compare(password, data.password)

            if(isMatch){
                const token = await UserService.generateAuthToken(email)
                data.token = token

                client.hmset(email, data);

                res.send({ data , token })
            }else{
                res.status(400).send({
                    error : 'Password not matched!'
                })
            }

        }
    })

}

const logout = async function(req, res, next){
    const user = await auth.auth(req, res)

    if(user){
        user.token = ''
        client.hmset(user.email, user);
        res.send()
    }
}

const getUser = async function(req, res, next){
    const user = await auth.auth(req, res)
    const token = user.token

    if(user){
        res.send({ user , token })
    }
}


module.exports = {
    createUser,
    loginUser,
    logout,
    getUser
}