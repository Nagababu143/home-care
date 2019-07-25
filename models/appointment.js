const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    pickedslots:{type:Array},
    doctorname:{type:String},
    patientname:{type:String},
    address:{type:String},
    doctorId:{type:String},
    patientId:{type:String}
});
mongoose.model('appointment',appointmentSchema) 