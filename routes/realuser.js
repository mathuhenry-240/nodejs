const express = require('express')
const b = require('bcryptjs')
const jwt = require('jsonwebtoken')
const RealUser = require('../models/realuser.js')
const router = express.Router()


router.post("/reg/user", async(req,res)=>{
    try{
        const rru = await RealUser.findOne({email:req.body.email})
        if(rru) return res.status(401).send('email already exists')

        const pru = await RealUser.findOne({phoneNumber:req.body.phoneNumber})
        if(pru) return res.status(401).send('phonember already exists')

        const hp = await b.hash(req.body.password,10)

        const nru = new RealUser({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            password:hp
        })
        try{
            const r = await nru.save()
            return res.status(200).send(r)
        }catch(err){
            return res.status(400).send(`error \n ${err.toString()}`)
        }
    }catch(err){
        return res.status(400).send(`error \n ${err.toString()}`)
    }
})

router.post("/login/user",async(req,res)=>{
    try{
        const rru = await RealUser.findOne({email:req.body.email})
        if(!rru) return res.status(400).send('invalid email or password')

        const cp = await b.compare(req.body.password, rru.password)
        if(!cp) return res.status(400).send('invalid email or password')

        const token = jwt.sign({
            _id:rru._id,
            email:rru.email
        })
        res.header("auth-token",token)
        return res.status(200).send('logged in successfully')

    }catch(err){

    }
})


module.exports = router;