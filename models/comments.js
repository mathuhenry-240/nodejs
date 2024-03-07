const mongoose = require('mongoose')

const commentsSchema = new schema({
    commentBy:{
        type: mongoose.Schemas.Types.ObjectId,
        ref: 'RealUser'
    },
    comment:{
        type:String,
        required:true
    },
    postedOn:{
        type: Date,
        default:Date.now
    }
})


const Comment = mongoose.model('Comment',commentsSchema)
module.export = Comment