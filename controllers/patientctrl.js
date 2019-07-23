const mongoose = require('mongoose')
const savepatient = mongoose.model('patient');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt')
module.exports = (function(){
    return{
        getpatient:function(req,res){
            savepatient.findOne({"_id":req.params.id},function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        changepassword: function(req,res){
            savepatient.findOne({"_id": req.params.id},(error,result)=>{
                if(error){
                    res.send(error)
                    console.log(error)
                }
                else{
                    if(result==null){
                        res.send({'status': 'Invalid Loginid'});
                    }
                    else if(bcrypt.compareSync(req.body.password,result.password)){
                        const hashedpassword = bcryptjs.hashSync(req.body.newpassword,8)
                        savepatient.findByIdAndUpdate({"_id": req.params.id},{$set: {"password": hashedpassword}}, {safe: true, new: true}, function(err,result){
                            if(err){
                                res.send(err);
                                console.log(err);
                            }
                            else{
                                res.json(result);
                            }
                        });
                    }
                    else{
                        res.send({'status': 'Password  mismatch'});
                    }
                }
            })
        }
    }
})();