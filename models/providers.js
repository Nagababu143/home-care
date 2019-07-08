const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    providerName:{type:String,required:true}
});
mongoose.model('providers',providerSchema)