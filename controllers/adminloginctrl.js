const mongoose = require('mongoose')
const adminlogin = mongoose.model('admin')
const bcryptjs = require('bcryptjs')
module.exports = (function(){
    return{
        adminloginsave:function(req,res){
            const adminloginn = new adminlogin(req.body);
            console.log(req.body)
            adminloginn.save(function(error,result){
                if(error){
                    res.send(error)
                    console.log(error)
                }else{
                    res.json(result)
                }
            })
        },
    //     admin:function(req,res){
    //         const email = req.body.email;
    //         console.log(req.body)
    //      adminloginn.find({email})
    //         if(adminloginn ===null){
    //             res.end("Login invalid")
    //          }else if (adminlogin.email === req.body.email && adminlogin.password === req.body.password){
    //          res.send()
    //     }else{
    //         res.send('invalid login')
    //     }
    // }
    // findByCredentials :function(req,res){
    //         const admin =  adminlogin.findOne({email})
    //         console.log(req.body.email)
    //         if(!admin){
    //             throw new error('Unable to login')
    //         }
    //         const  hashedpassword=  bcryptjs.hash(admin.password,8)
    //         console.log(admin.password)
    //         const isMatch =  bcrypt.compare(admin.password,hashedpassword)
    //         if(!isMatch){
    //             throw new error('unable to login')
    //         }
    //         return admin
           
    //     }
    
    
    }
})();