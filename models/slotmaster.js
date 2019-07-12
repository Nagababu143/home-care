const mongoose = require('mongoose')
const slotSchema = mongoose.Schema({
    fromtime:{type:String},
    totime:{type:String}
})
mongoose.model('slotmaster',slotSchema)