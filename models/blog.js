const mongoose = require('mongoose')


const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
        lowercase: true,
        default: null
    },
    postedBy:{
        type: mongoose.Schemas.Types.ObjectId,
        ref: 'RealUser'
    }
    
})


const Blog = mongoose.models('Blog',blogSchema)
module.exports = Blog