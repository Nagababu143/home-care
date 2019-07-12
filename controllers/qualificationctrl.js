const mongoose = require('mongoose')
const qualification = mongoose.model('qualification')
module.exports = (function(){
    return{
    addQualification:function(req,res){
       const qualifications = new qualification(req.body);
       qualifications.save(function(err,result){
           if(err){
               res.send(err)
           }else{
               res.json(result)
           }
       })
    },
    getQualification:function(req,res){
         qualification.find({"providerId":req.params.id},function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    }
}
})();