const mongoose = require('mongoose')

const addactorSchema = new mongoose.Schema({
    providerId:{type:mongoose.Schema.ObjectId,ref:'providers',required:true},
    name:{type:String,required:true},
    photo:{type:String},
    qualification:{type:String},
    speciality:{type:String},
    experience:{type:Number},
    language:{type:String},
    slots:{type:Array},
    address:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    email:{type:String},
    phone:{type:Number},
    gender:{type:String}
});
mongoose.model('addactor',addactorSchema)