const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}
})



adminSchema.statics.findByCredentials = async (email,password)=>{
    const admin1 = await adminlogin.findOne({email})
    console.log(admin1)
    console.log(email)
    if(!admin1){
        throw new error('Unable to login')
    }
    const  hashedpassword= await bcryptjs.hash(admin1.password,8)
    console.log(hashedpassword)
    console.log(admin1.password)
    const isMatch = await bcrypt.compare(admin1.password,hashedpassword)
    console.log(isMatch)
    if(!isMatch){
        throw new error('unable to login')
    }
    console.log(admin1)
    return admin1
   
 
}
adminSchema.pre('save', async  function(next){
    const admin = this
    console.log(admin)
  const  hashedpassword= await bcryptjs.hash(admin.password,8)

  admin.password = hashedpassword;
        next()  
})


const admin = mongoose.model('admin',adminSchema)
module.exports = admin