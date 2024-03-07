const jwt = require('jsonwebtoken')
const ru = require('../models/realuser/')


const realUserAuth = async (req,res,next) =>{
    try{
        const token = req.header('auth-token').replace('bearer','')
        const decoded = jwt.verify(token,process.env.SECRET)
        const realuser = await ru.findOne({_id:decoded._id,'tokens.token':token})
        if(!realuser){
            throw new error()
        }
        req.user = realuser;
        req.token = token;
        next()

    }catch(error){
        res.status(401).json({error : 'unauthorized'})
    }
}

module.export = realUserAuth