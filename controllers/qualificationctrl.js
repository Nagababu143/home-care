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
         qualification.find({$and:[{"status":"active"},{"providerId":req.params.id}]},function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    },
    getallqualifications:function(req,res){
        qualification.find({},function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    },
    qualificationUpdate:function(req,res){
        console.log(req.params.id)
        qualification.findById({"_id":req.params.id},function(error,result){
            if(error){
                res.send(error)
                
            }
            else{
                for(prop in req.body){                          
                    result[prop] = req.body[prop]                    
              }
                result.save(function(error,data){
                    if(error){
                        res.send(error)
                        console.log(error)
                    }
                    else{
                        res.json(result)
                    }
                })
            }
        })
  }
}
})();