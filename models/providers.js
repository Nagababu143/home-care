const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    providerName:{type:String,required:true},
    status:{type:String,default:"active"}
});
mongoose.model('providers',providerSchema)