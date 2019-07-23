const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt')

const patientSchema = mongoose.Schema({
    name:{type:String},
    gender:{type:String},
    age:{type:Number},
    phone:{type:Number},
    email:{type:String},
    address:{type:String},
    password:{type:String},
    confirmpassword:{type:String}
})

// patientSchema.pre('save', async  function(next){
//     const patient = this
//     console.log(patient)
//   const  hashedpassword= await bcryptjs.hash(patient.newpassword,8)

//   patient.password = hashedpassword;
//         next()  
// })
// patientSchema.pre("save", function(next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.newpassword,8);
//     next();
// });

// patientSchema.statics.findByCredentials=async (email,password)=>{
    
//     const patient = await patients.find({email:req.body.email})
//     console.log(patient)
//     if(!patient){
//         throw new error('Unable to login')
//     }
//     const  hashedpassword= await bcryptjs.hash(patient.password,8)
//     console.log(patient.password)
//     const isMatch = await bcrypt.compare(patient.password,hashedpassword)
//     if(!isMatch){
//         throw new error('unable to login')
//     }
//     return patient
   
// }

const patient = mongoose.model('patient',patientSchema)
module.exports = patient
