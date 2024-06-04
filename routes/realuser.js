const express = require('express')
const b = require('bcryptjs')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')
const RealUser = require('../models/realuser.js')
const router = express.Router()


var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: 'henrymathu74@gmail.com',
        pass: 'mathu$2000&'
    }
})

var mailOptions = {
    from: 'henrymathu74@gmail.com',
    to :'hgmathu@gmail.com',
    subject:'otp verification',
    html :`<h1>hello, henry</h1> <br> <p>your otp is 123456</P>`

}
transporter.sendMail(mailOptions,async(err,info)=>{
    if (err) console.log(err)
    else {console.log(`email sent ${info.response}`)}
})

// creating a new user into the system
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

// getting a registered user
router.get("/registered_users/",async(req,res)=>{
    try{
        const ru = await RealUser.find()
        if (ru < 0 ) return res.status(400).send('no user is registered')
        res.status(201).send(ru)
        console.log(ru.firstName)
    }catch(e){
        return res.status(400).send(`error \n ${e.toString()}`)
    }
})

// login a user....only a registerd user
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
        return res.status(400).send(`error \n ${err.toString()}`)

    }
})


module.exports = router;