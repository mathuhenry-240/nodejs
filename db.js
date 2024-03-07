const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
    .then(()=>console.log('db connected'))
    .catch(e=>console.log(`failed to connect /n/n ${e.toString()}`))