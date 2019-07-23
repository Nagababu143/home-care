const mongoose = require('mongoose')
const slot = mongoose.model('slotmaster')
module.exports = (function(){
return{
    slotMaster:function(req,res){
        const slotmaster = new slot(req.body);
        slotmaster.save(function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    },
    slotGet:function(req,res){
        slot.find({"status":"active"},function(err,result){
           if(err){
               res.send(err)
           }else{
               res.send(result)
           }
        })
    },
    slotgetAll:function(req,res){
        slot.find({},function(err,result){
           if(err){
               res.send(err)
           }else{
               res.send(result)
           }
        })
    },
    slotmasterUpdate:function(req,res){
        slot.findById({"_id":req.params.id},function(error,result){
            if(error){
                res.send(error)
                console.log(result)
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