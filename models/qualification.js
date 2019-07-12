const mongoose = require('mongoose')

const qualificationSchema = mongoose.Schema({
    providerId:{type:mongoose.Schema.ObjectId,ref:'providers',required:true},
    qualification:{type:String}
})
mongoose.model('qualification',qualificationSchema)