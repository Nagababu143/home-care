const mongoose = require('mongoose');
const validator = require('validator');


const addactorSchema = new mongoose.Schema({
    providerId:{type:mongoose.Schema.ObjectId,ref:'providers',required:true},
    name:{type:String},
    photo:{type:String},
    qualification:{type:String},
    speciality:{type:String},
    experience:{type:Number},
    language:{type:Array},
    slots:{type:Array},
    address:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    email:{type:String,validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false
      }},
    phone:{type:Number},
    gender:{type:String},
    status:{type:String,default:"inactive"}
});
mongoose.model('addactor',addactorSchema)