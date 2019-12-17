const jwt = require('jsonwebtoken')
const redis = require('redis')

const client  = redis.createClient()

const auth = async function(req,res,next) {
    return new Promise(function(resolve, reject) {
        try {
            const token = req.header('Authorization').replace('Bearer ','')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const key = decoded._email
    
            client.hgetall(key, function(err, data){
                if(data.token !== token){
                    res.status(401).send({ error : 'Please authenticate.'})
                }else{
                    //res.send({ data , token })
                    resolve(data)
                }
            })
        } catch (e) {
            res.status(401).send({ error : 'Please authenticate.'})
        }
    })
}

module.exports = {
    auth
}
