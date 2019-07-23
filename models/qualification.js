const mongoose = require('mongoose')

const qualificationSchema = mongoose.Schema({
    providerId:{type:mongoose.Schema.ObjectId,ref:'providers',required:true},
    qualification:{type:String},
    status:{type:String,default:"active"}
})
mongoose.model('qualification',qualificationSchema)