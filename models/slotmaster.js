const mongoose = require('mongoose')
const slotSchema = mongoose.Schema({
    fromtime:{type:String},
    totime:{type:String},
    status:{type:String,default:"active"}
})
mongoose.model('slotmaster',slotSchema)