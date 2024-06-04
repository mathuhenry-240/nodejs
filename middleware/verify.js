const jwt = require('jsonwebtoken')
const ru = require('../models/realuser/')


const realUserAuth = async (req,res,next) =>{
    try{
        const token = req.header('auth-token')
        if (!token) return res.satus(400).send('Access denied. No token provided')

        const decoded = jwt.verify(token,process.env.SECRET)

        const realuser = await ru.findOne({_id:decoded._id,'tokens.token':token})
        if(realuser < 1) return res.status(400).send('user not found')
        
        req.user = decoded;
        return next()

    }catch(ex){
        res.status(401).send('invalid token')
    }
}

module.export = realUserAuth